import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildWhatsAppURL, CONTACT } from '../app.js';
import { CASES, LINKS } from '../lib/portfolio-data.js';

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

test('Case comparison preserves the distinction between a red flag and corroborating evidence', () => {
  assert.equal(CASES.C001.credits, CASES.C002.credits);
  assert.match(CASES.C001.verify, /unverified/);
  assert.match(CASES.C002.verify, /fictional/i);
  assert.notEqual(CASES.C001.consider, CASES.C002.consider);
  assert.ok(html.includes(LINKS.tracecase));
  assert.match(html, /entry-level AML/i);
  assert.match(html, /fictional/i);
  assert.ok(!html.includes('<iframe'));
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
  const paths = new Set([...html.matchAll(/(?:href|src)="(\/?assets\/[^"#?]+)"/g)].map(match => match[1]));
  for (const path of paths) assert.ok((await stat(`${root}${path.replace(/^\//, '')}`)).size > 0, path);
  const pdf = await readFile(`${root}assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf`);
  const word = await readFile(`${root}assets/Chaitanyachidambar_S_Kulkarni_Resume.docx`);
  assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
  assert.equal(word.subarray(0, 2).toString(), 'PK');
});

test('Hosting policy restricts scripts and disallows embedded third-party frames', async () => {
  const headers = await readFile(`${root}_headers`, 'utf8');
  assert.ok(headers.includes("script-src 'self'"));
  assert.ok(headers.includes("frame-src 'none'"));
  assert.ok(!headers.includes('unsafe-inline'));
  assert.ok(!headers.includes('unsafe-eval'));
});
