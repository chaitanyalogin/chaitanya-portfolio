import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// A small DOM fixture exercises the real entry point and controller, without a GPU.
class Element {
  constructor(tagName = 'DIV') {
    this.tagName = tagName;
    this.attributes = new Map();
    this.listeners = new Map();
    this.children = [];
    this.style = {};
    this.dataset = {};
    this.firstChild = { textContent: '' };
    this.value = '';
    this.classes = new Set();
    this.classList = {
      toggle: (name, force) => {
        const add = force ?? !this.classes.has(name);
        if (add) this.classes.add(name); else this.classes.delete(name);
        return add;
      },
      add: name => this.classes.add(name),
      remove: name => this.classes.delete(name),
      contains: name => this.classes.has(name),
    };
  }
  addEventListener(name, handler) {
    const handlers = this.listeners.get(name) || [];
    handlers.push(handler);
    this.listeners.set(name, handlers);
  }
  emit(name, event = {}) {
    event.currentTarget = this;
    event.preventDefault ||= () => { event.prevented = true; };
    for (const handler of this.listeners.get(name) || []) handler(event);
    return event;
  }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  querySelector() { return this.label ||= new Element('SPAN'); }
  getBoundingClientRect() { return { top: 0, left: 0, width: 500, height: 400 }; }
  replaceChildren(...children) { this.children = children; }
  append(child) { this.children.push(child); }
  getContext() { return null; }
  showModal() { this.open = true; }
  close() { this.open = false; this.emit('close'); }
  focus() { this.focused = true; }
  setCustomValidity(message) { this.validationMessage = message; }
  reportValidity() { return !this.validationMessage; }
}

test('portable startup supports case investigation, keyboard navigation, mobile menu and contact drafts', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const ids = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], new Element()]));
  const root = new Element();
  const fields = new Map(['name', 'email', 'message'].map(name => [name, new Element()]));
  const form = ids.get('contact-form');
  form.elements = { namedItem: name => fields.get(name) };
  const tabs = ['C001', 'C002'].map(id => { const el = ids.get('tab-' + id); el.dataset.case = id; return el; });
  const caseFields = ['reference', 'status', 'multiple', 'verify', 'consider'].map(name => {
    const el = new Element(); el.dataset.caseField = name; return el;
  });
  const events = new Map();
  const document = {
    documentElement: root,
    querySelector: selector => ids.get(selector.slice(1)),
    querySelectorAll: selector => ({ '[data-case]': tabs, '[data-case-field]': caseFields,
      '#contact-form input, #contact-form textarea': [...fields.values()] }[selector] || []),
    addEventListener: (name, handler) => events.set(name, handler),
  };
  let assigned;
  const globals = {
    document,
    window: { matchMedia: () => ({ addEventListener() {} }), location: { assign: value => { assigned = value; } } },
    FormData: class { get(name) { return fields.get(name).value; } },
  };
  const prior = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try {
    for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    const entry = html.match(/<script type="module" src="([^"]+)"/)[1];
    await import(new URL(`../${entry}`, import.meta.url));
    const menu = ids.get('menu-toggle');
    menu.emit('click');
    assert.equal(menu.getAttribute('aria-expanded'), 'true');
    events.get('keydown')({ key: 'Escape' });
    assert.equal(menu.getAttribute('aria-expanded'), 'false');
    assert.ok(menu.focused);
    tabs[1].emit('click');
    assert.equal(caseFields[0].textContent, 'C002 / VIKRAM SHAH');
    assert.equal(tabs[1].getAttribute('aria-selected'), 'true');
    assert.match(caseFields[3].textContent, /fictional/i);
    tabs[1].emit('keydown', { key: 'Home' });
    assert.equal(caseFields[0].textContent, 'C001 / ANITA RAO');
    assert.ok(tabs[0].focused);
    assert.match(caseFields[3].textContent, /unverified/);
    form.emit('submit');
    assert.equal(assigned, undefined);
    fields.get('name').value = 'Recruiter';
    fields.get('message').value = 'An AML opportunity\nCan we talk?';
    form.emit('submit');
    const draft = new URL(assigned);
    assert.equal(draft.hostname, 'wa.me');
    assert.equal(draft.pathname, '/919591454650');
    assert.ok(draft.searchParams.get('text').includes('An AML opportunity\nCan we talk?'));
    const { initializePortfolio } = await import('../app.js');
    initializePortfolio();
    assert.equal(menu.listeners.get('click').length, 1);
  } finally {
    for (const [key, descriptor] of prior) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
