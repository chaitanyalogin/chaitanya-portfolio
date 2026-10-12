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

test('portable startup wires motion, project demo, sample and WhatsApp form even without WebGL', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const ids = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], new Element()]));
  const root = new Element();
  root.scrollHeight = 2500;
  const body = new Element();
  const demo = new Element('A');
  demo.dataset.media = 'entitlement';
  const observed = Array.from({ length: 3 }, () => new Element());
  const statuses = Array.from({ length: 3 }, () => new Element());
  const preview = new Element();
  const fields = new Map(['name', 'email', 'message'].map(name => [name, new Element()]));
  const form = ids.get('contact-form');
  form.elements = { namedItem: name => fields.get(name) };
  const document = {
    documentElement: root, body,
    querySelector: selector => selector === '.entitlement-window' ? preview : ids.get(selector.slice(1)),
    querySelectorAll: selector => ({
      '[data-media]': [demo],
      '.entitlement-row [data-observed]': observed,
      '.row-status': statuses,
      '#contact-form input, #contact-form textarea': [...fields.values()],
    }[selector] || []),
    addEventListener() {},
    createElement: tag => new Element(tag.toUpperCase()),
  };
  let assigned;
  const storage = new Map();
  const globals = {
    document,
    window: {
      innerHeight: 800, scrollY: 0,
      matchMedia: () => ({ matches: false, addEventListener() {} }),
      addEventListener() {}, location: { assign: value => { assigned = value; } },
    },
    localStorage: { getItem: name => storage.get(name), setItem: (name, value) => storage.set(name, value) },
    requestAnimationFrame: () => 1, cancelAnimationFrame() {},
    FormData: class { get(name) { return fields.get(name).value; } },
  };
  const prior = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try {
    for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    const entry = html.match(/<script type="module" src="([^"]+)"/)[1];
    await import(new URL(`../${entry}`, import.meta.url));
    const motion = ids.get('motion-toggle');
    assert.equal(motion.querySelector('span').textContent, 'Motion on');
    motion.emit('click');
    assert.equal(motion.getAttribute('aria-pressed'), 'true');
    assert.equal(storage.get('chay-motion'), 'off');
    motion.emit('click');
    assert.equal(motion.querySelector('span').textContent, 'Motion on');

    ids.get('sample-toggle').emit('click');
    assert.deepEqual(observed.map(element => element.textContent), ['Allowed', 'Allowed', '500,000']);
    assert.ok(preview.classList.contains('sample-resolved'));

    const event = demo.emit('click');
    assert.ok(event.prevented);
    assert.ok(ids.get('media-dialog').open);
    assert.equal(ids.get('media-frame').children[0].src, 'https://entitlementci-review.vercel.app/');
    ids.get('media-close').emit('click');
    assert.equal(ids.get('media-frame').children.length, 0);
    assert.ok(!ids.get('media-dialog').open);
    assert.ok(!demo.emit('click', { ctrlKey: true }).prevented, 'Modified clicks retain normal link behavior');

    form.emit('submit');
    assert.equal(assigned, undefined, 'Empty messages must not navigate');
    fields.get('name').value = 'Recruiter';
    fields.get('message').value = 'A React opportunity\nCan we talk?';
    form.emit('submit');
    const draft = new URL(assigned);
    assert.equal(draft.hostname, 'wa.me');
    assert.equal(draft.pathname, '/919591454650');
    assert.ok(draft.searchParams.get('text').includes('A React opportunity\nCan we talk?'));

    const { initializePortfolio } = await import('../app.js');
    initializePortfolio();
    assert.equal(motion.listeners.get('click').length, 1, 'Initialization must not duplicate handlers');
  } finally {
    for (const [key, descriptor] of prior) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
