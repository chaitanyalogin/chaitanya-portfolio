import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = resolve(root, 'out');
const hashes = new Set();
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await inspect(path);
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
        if (!/\bsrc=/.test(match[1]) && match[2]) hashes.add("'sha256-" + createHash('sha256').update(match[2]).digest('base64') + "'");
      }
    }
  }
}
await inspect(out);
let headers = await readFile(resolve(root, 'public/_headers'), 'utf8');
headers = headers.replace("script-src 'self'", "script-src 'self' " + [...hashes].join(' '));
await writeFile(resolve(out, '_headers'), headers);
const pdf = await stat(resolve(out, 'assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf'));
if (pdf.size < 1000) throw new Error('Background CV is missing from the export');

// Both deployment entrypoints come from the same prerendered React content.
// The portable entry uses native module interactions, without Next's hydration.
const exported = await readFile(resolve(out, 'index.html'), 'utf8');
const body = exported.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
if (!body) throw new Error('Export contains no body');
const portableBody = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const description = 'Chaitanya Kulkarni: commerce graduate pursuing entry-level AML, KYC and financial crime operations roles. Explore TraceCase, an independent investigation workbench using fictional cases.';
const html = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f5f4ee"><title>Chaitanya Kulkarni | AML &amp; KYC Portfolio</title><meta name="description" content="' + description + '"><meta property="og:title" content="Chaitanya Kulkarni | Look closer. Think clearly."><meta property="og:description" content="' + description + '"><meta property="og:type" content="website"><meta property="og:image" content="https://chaitanya-portfolio-a2f.pages.dev/assets/social-card.png"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="https://chaitanya-portfolio-a2f.pages.dev/"><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="styles.css"></head><body>' + portableBody + '<script type="module" src="bootstrap.js"></script></body></html>\n';
await writeFile(resolve(root, 'index.html'), html);
await writeFile(resolve(root, 'styles.css'), await readFile(resolve(root, 'app/globals.css')));
console.log('Static export and portable entry are aligned. CSP hashes: ' + hashes.size);

