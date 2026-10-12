import { KnotScene } from './lib/gpu-scene.js';

export const CONTACT = Object.freeze({ phone: '919591454650', email: 'chaitanyarocks.kulkarni@gmail.com' });
export const MEDIA = Object.freeze({
  song: { label: 'MUSIC VIDEO / THE CHAY SHOW', title: 'Sannata', embed: 'https://www.youtube-nocookie.com/embed/Kd0oh4WuoEE?autoplay=1&rel=0', external: 'https://www.youtube.com/watch?v=Kd0oh4WuoEE', note: 'Music video from The Chay Show. If the player is unavailable, open it on YouTube.' },
  documentary: { label: 'DOCUMENTARY / THE CHAY SHOW', title: 'The Chay Show', embed: 'https://www.youtube-nocookie.com/embed/TpZORqPD-qQ?autoplay=1&rel=0', external: 'https://www.youtube.com/watch?v=TpZORqPD-qQ', note: 'Documentary video from The Chay Show. If the player is unavailable, open it on YouTube.' },
  entitlement: { label: 'INTERACTIVE PROJECT DEMO', title: 'EntitlementCI', embed: 'https://entitlementci-review.vercel.app/', external: 'https://entitlementci-review.vercel.app/', note: 'Reviewer demo with sample data. If embedded access is blocked, open the demo in a new tab.' }
});

export function buildWhatsAppURL({ name = '', email = '', message = '' } = {}) {
  const lines = ['Hi Chaitanya, I came across your portfolio.'];
  if (name.trim()) lines.push(`Name: ${name.trim()}`);
  if (email.trim()) lines.push(`Email: ${email.trim()}`);
  if (message.trim()) lines.push('', message.trim());
  return `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function getSampleState(resolved) {
  return resolved
    ? { observations: ['Allowed', 'Allowed', '500,000'], badge: 'All 3 resolved', status: 'Resolved', explanation: 'Fresh observations now match the Enterprise plan.', button: 'Reset sample' }
    : { observations: ['Denied', 'Denied', '50,000'], badge: '3 discrepancies', status: 'Drift', explanation: "A plan upgrade doesn't always mean the application catches up.", button: 'Apply correction' };
}

let initialized = false;
export function initializePortfolio() {
  if (initialized) return;
  initialized = true;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  let scene;
  let toastTimer;
  let motionPaused = false;
  let dialogActive = false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  try { motionPaused = localStorage.getItem('chay-motion') === 'off' || (localStorage.getItem('chay-motion') !== 'on' && reduced.matches); }
  catch { motionPaused = reduced.matches; }
  const showToast = text => {
    const toast = $('#toast');
    toast.textContent = text;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
  };
  const updateMotion = () => {
    document.documentElement.classList.toggle('motion-off', motionPaused);
    const toggle = $('#motion-toggle');
    toggle.setAttribute('aria-pressed', String(motionPaused));
    toggle.setAttribute('aria-label', motionPaused ? 'Enable decorative animation' : 'Pause decorative animation');
    toggle.querySelector('span').textContent = motionPaused ? 'Motion off' : 'Motion on';
    scene?.setMotion(!motionPaused && !dialogActive);
  };
  try { scene = new KnotScene($('#orbit-canvas'), $('#hero-art')); }
  catch { /* A static image of the same 3D mesh remains visible when canvas is unavailable. */ }
  updateMotion();
  $('#motion-toggle').addEventListener('click', () => {
    motionPaused = !motionPaused;
    try { localStorage.setItem('chay-motion', motionPaused ? 'off' : 'on'); } catch { /* Preferences remain session local. */ }
    updateMotion();
  });
  reduced.addEventListener?.('change', event => {
    // Changes to system accessibility preferences take effect immediately.
    motionPaused = event.matches;
    updateMotion();
  });

  const menu = $('#menu-toggle');
  const nav = $('#main-nav');
  const closeMenu = () => {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener?.('change', event => { if (event.matches) closeMenu(); });

  let scrollPending = false;
  const sections = $$('main section[id]');
  const navigation = $$('.main-nav a');
  const progress = $('#scroll-progress');
  let sectionPositions = [];
  let pageHeight = 1;
  let previousActive;
  function measurePage() {
    pageHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    sectionPositions = sections.map(section => ({ id: section.id, top: section.getBoundingClientRect().top + window.scrollY }));
    updateScroll();
  }
  function updateScroll() {
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / pageHeight))})`;
    let active;
    for (const section of sectionPositions) {
      if (section.top < window.scrollY + window.innerHeight * .35) active = section.id;
    }
    if (active !== previousActive) {
      for (const link of navigation) {
        if (link.getAttribute('href') === `#${active}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
      previousActive = active;
    }
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', measurePage, { passive: true });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measurePage).observe(document.body);
  measurePage();

  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle('offscreen-motion', !entry.isIntersecting);
    }, { threshold: 0 });
    for (const element of sections) observer.observe(element);
  }

  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canTilt) for (const element of $$('.tilt-surface')) {
    const original = element.classList.contains('resume-paper') ? 'rotate(-7deg) rotateY(-14deg) rotateX(9deg)' : '';
    let tiltFrame = 0;
    element.addEventListener('pointermove', event => {
      if (motionPaused || tiltFrame) return;
      tiltFrame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        element.style.transform = `${original} perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        tiltFrame = 0;
      });
    }, { passive: true });
    element.addEventListener('pointerleave', () => { cancelAnimationFrame(tiltFrame); tiltFrame = 0; element.style.transform = original; });
  }

  let resolved = false;
  $('#sample-toggle').addEventListener('click', () => {
    resolved = !resolved;
    const sample = getSampleState(resolved);
    $$('.entitlement-row [data-observed]').forEach((cell, i) => { cell.textContent = sample.observations[i]; });
    $$('.row-status').forEach(cell => { cell.textContent = sample.status; });
    $('.entitlement-window').classList.toggle('sample-resolved', resolved);
    $('#drift-badge').classList.toggle('resolved', resolved);
    $('#drift-badge').textContent = sample.badge;
    $('#sample-status').textContent = sample.explanation;
    $('#sample-toggle').firstChild.textContent = `${sample.button} `;
  });

  const dialog = $('#media-dialog');
  let trigger;
  function closeMedia() { dialog.close(); }
  for (const button of $$('[data-media]')) button.addEventListener('click', event => {
    const media = MEDIA[button.dataset.media];
    if (!media) return;
    if (typeof dialog.showModal !== 'function') {
      if (button.tagName !== 'A') window.open(media.external, '_blank', 'noopener,noreferrer');
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = button;
    $('#media-dialog-label').textContent = media.label;
    $('#media-dialog-title').textContent = media.title;
    $('#media-dialog-note').textContent = media.note;
    $('#media-external').href = media.external;
    const frame = $('#media-frame');
    frame.replaceChildren();
    frame.classList.toggle('project-frame', button.dataset.media === 'entitlement');
    const iframe = document.createElement('iframe');
    iframe.src = media.embed;
    iframe.title = `${media.title} ${button.dataset.media === 'entitlement' ? 'project demo' : 'video player'}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    // The project gets no top-level navigation rights. YouTube retains its own player behavior.
    if (button.dataset.media === 'entitlement') iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
    frame.append(iframe);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialogActive = true;
    updateMotion();
  });
  $('#media-close').addEventListener('click', closeMedia);
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeMedia();
  });
  dialog.addEventListener('close', () => {
    $('#media-frame').replaceChildren();
    document.body.classList.remove('dialog-open');
    dialogActive = false;
    updateMotion();
    trigger?.focus();
  });

  for (const image of $$('.video-cover img')) {
    image.addEventListener('error', () => image.closest('.video-cover').classList.add('image-unavailable'));
    if (image.complete && !image.naturalWidth) image.closest('.video-cover').classList.add('image-unavailable');
  }
  $('#copy-email').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
      await navigator.clipboard.writeText(CONTACT.email);
      showToast('Email address copied.');
    } catch { showToast(`Email: ${CONTACT.email}`); }
  });
  $('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ['name', 'message']) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? '' : 'Please add a little context.');
      if (!field.reportValidity()) return;
    }
    const data = new FormData(form);
    const url = buildWhatsAppURL({ name: String(data.get('name') || ''), email: String(data.get('email') || ''), message: String(data.get('message') || '') });
    // Same-tab navigation remains reliable even if a browser blocks popups.
    window.location.assign(url);
  });
  for (const field of $$('#contact-form input, #contact-form textarea')) field.addEventListener('input', () => field.setCustomValidity(''));
  $('#year').textContent = String(new Date().getFullYear());
}

