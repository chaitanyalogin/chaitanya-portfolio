import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildWhatsAppURL, getSampleState, CONTACT, MEDIA } from '../app.js';
import { buildKnotGeometry, rotatePoint, projectPoint } from '../scene.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(`${root}index.html`, 'utf8');

test('WhatsApp composer preserves names, newlines, punctuation and non Latin text', () => {
  const message = 'React role: ₹30,000\nCan we talk? ಕನ್ನಡ & Hindi + English <script>';
  const url = new URL(buildWhatsAppURL({ name: '  Recruiter  ', email: 'jobs+react@example.com', message }));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, `/${CONTACT.phone}`);
  assert.equal(url.searchParams.get('text'), `Hi Chaitanya, I came across your portfolio.\nName: Recruiter\nEmail: jobs+react@example.com\n\n${message}`);
  assert.equal([...url.searchParams].length, 1);
});

test('Optional email is omitted from the WhatsApp draft', () => {
  const text = new URL(buildWhatsAppURL({ name: 'Someone', message: 'A project idea' })).searchParams.get('text');
  assert.ok(text.includes('Name: Someone'));
  assert.ok(!text.includes('Email:'));
});

test('Interactive sample changes actual observations and can restore the initial state', () => {
  const initial = getSampleState(false), corrected = getSampleState(true);
  assert.deepEqual(initial.observations, ['Denied', 'Denied', '50,000']);
  assert.deepEqual(corrected.observations, ['Allowed', 'Allowed', '500,000']);
  assert.equal(corrected.status, 'Resolved');
  assert.equal(corrected.button, 'Reset sample');
  assert.deepEqual(getSampleState(false), initial);
});

test('Media embeds use the requested video IDs and a verified project URL', () => {
  assert.equal(new URL(MEDIA.song.embed).pathname, '/embed/Kd0oh4WuoEE');
  assert.equal(new URL(MEDIA.documentary.embed).pathname, '/embed/TpZORqPD-qQ');
  assert.equal(new URL(MEDIA.entitlement.embed).hostname, 'entitlementci-review.vercel.app');
  for (const media of Object.values(MEDIA)) assert.ok(media.external.startsWith('https://'));
  assert.ok(!html.includes('<iframe')); // Third party players load only after a visitor activates one.
});

test('3D mesh is closed, finite and within the camera volume', () => {
  const geometry = buildKnotGeometry(112, 14);
  assert.equal(geometry.vertices.length, 112 * 14);
  assert.equal(geometry.faces.length, 112 * 14);
  const edges = new Map();
  for (const face of geometry.faces) {
    assert.ok(face.normal.every(Number.isFinite));
    assert.ok(Math.abs(Math.hypot(...face.normal) - 1) < 1e-7);
    for (let i = 0; i < 4; i++) {
      const key = [face.ids[i], face.ids[(i + 1) % 4]].sort((a, b) => a - b).join('/');
      edges.set(key, (edges.get(key) || 0) + 1);
    }
  }
  assert.ok([...edges.values()].every(count => count === 2));
  for (const point of geometry.vertices) {
    assert.ok(point.every(Number.isFinite));
    assert.ok(Math.hypot(...point) < 2.5);
  }
  assert.throws(() => buildKnotGeometry(0, 14));
});

test('3D rotation preserves distances and projection fits phone and desktop canvases', () => {
  const geometry = buildKnotGeometry(56, 8);
  for (const width of [280, 320, 375, 600, 960]) {
    const height = width < 500 ? 355 : 520;
    for (const angle of [0, .5, 1.2, 2.8, 4.2, 5.9]) for (const point of geometry.vertices) {
      const rotated = rotatePoint(point, .5, angle, -.26);
      assert.ok(Math.abs(Math.hypot(...point) - Math.hypot(...rotated)) < 1e-8);
      const [x, y] = projectPoint(rotated, width, height);
      assert.ok(Number.isFinite(x) && Number.isFinite(y));
      assert.ok(x >= 0 && x <= width && y >= 0 && y <= height, 'Mesh stays inside its canvas');
    }
  }
});

test('All internal fragment links target unique existing elements', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), match[1]);
});

test('External tabs are protected and one click WhatsApp links use the intended number', () => {
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    if (match[0].includes('target="_blank"')) assert.ok(match[0].includes('noopener'), match[0]);
    if (match[0].includes('wa.me/')) assert.ok(match[0].includes(`wa.me/${CONTACT.phone}?text=`));
  }
});

test('Local download and asset paths exist; resumes contain actual document bytes', async () => {
  const paths = new Set([...html.matchAll(/(?:href|src)="(assets\/[^"#?]+)"/g)].map(match => match[1]));
  for (const path of paths) assert.ok((await stat(`${root}${path}`)).size > 0, path);
  const pdf = await readFile(`${root}assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf`);
  const word = await readFile(`${root}assets/Chaitanyachidambar_S_Kulkarni_Resume.docx`);
  assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
  assert.equal(word.subarray(0, 2).toString(), 'PK');
});

test('Hosting security policy allows only the required media origins', async () => {
  const headers = await readFile(`${root}_headers`, 'utf8');
  assert.ok(headers.includes("script-src 'self'"));
  assert.ok(headers.includes('frame-src https://www.youtube-nocookie.com https://entitlementci-review.vercel.app'));
  assert.ok(!headers.includes('unsafe-inline'));
  assert.ok(!headers.includes('unsafe-eval'));
});
