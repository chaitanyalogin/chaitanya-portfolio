import { CASES } from './lib/portfolio-data.js';

export const CONTACT = Object.freeze({ phone: '919591454650', email: 'chaitanyarocks.kulkarni@gmail.com' });
export function buildWhatsAppURL({ name = '', email = '', message = '' } = {}) {
  const lines = ['Hi Chaitanya, I came across your portfolio.'];
  if (name.trim()) lines.push('Name: ' + name.trim());
  if (email.trim()) lines.push('Email: ' + email.trim());
  if (message.trim()) lines.push('', message.trim());
  return 'https://wa.me/' + CONTACT.phone + '?text=' + encodeURIComponent(lines.join('\n'));
}

let initialized = false;
export function initializePortfolio() {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  document.documentElement.classList.add('has-js');
  const menu = $('#menu-toggle'), nav = $('#main-nav');
  function closeMenu() {
    nav?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) { closeMenu(); menu?.focus(); }
  });
  window.matchMedia('(min-width: 641px)').addEventListener?.('change', event => { if (event.matches) closeMenu(); });

  const tabs = $$('[data-case]');
  const fields = $$('[data-case-field]');
  function showCase(id) {
    const sample = CASES[id];
    if (!sample) return;
    for (const field of fields) {
      const value = sample[field.dataset.caseField];
      if (typeof value === 'string') field.textContent = value;
    }
    for (const tab of tabs) {
      const active = tab.dataset.case === id;
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    }
    $('#case-panel')?.setAttribute('aria-labelledby', 'tab-' + id);
    const status = $('#case-status');
    if (status) status.textContent = 'Showing ' + id + ' · Fictional training exercise';
  }
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => showCase(tab.dataset.case));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      showCase(tabs[target].dataset.case);
      tabs[target].focus();
    });
  }

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
  }
  $('#copy-email')?.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(CONTACT.email);
      showToast('Email address copied.');
    } catch { showToast('Email: ' + CONTACT.email); }
  });
  $('#contact-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ['name', 'message']) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? '' : 'Please add a little context.');
      if (!field.reportValidity()) return;
    }
    const data = new FormData(form);
    const url = buildWhatsAppURL({ name: String(data.get('name') || ''), email: String(data.get('email') || ''), message: String(data.get('message') || '') });
    window.location.assign(url);
  });
  for (const field of $$('#contact-form input, #contact-form textarea')) {
    field.addEventListener('input', () => field.setCustomValidity(''));
  }
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}

