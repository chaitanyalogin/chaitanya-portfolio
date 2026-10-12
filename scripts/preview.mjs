import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname } from 'node:path';

// Produce a portable design preview without changing the production source.
const root = fileURLToPath(new URL('../', import.meta.url));
const destination = resolve(process.argv[2] || resolve(root, 'dist/Portfolio_Preview.html'));
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.pdf': 'application/pdf', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
const assets = new Map();
async function assetData(path) {
  if (!assets.has(path)) assets.set(path, `data:${mime[extname(path)] || 'application/octet-stream'};base64,${(await readFile(resolve(root, path))).toString('base64')}`);
  return assets.get(path);
}
let html = await readFile(resolve(root, 'index.html'), 'utf8');
let css = await readFile(resolve(root, 'styles.css'), 'utf8');
css = css.replace("assets/knot-fallback.webp", await assetData('assets/knot-fallback.webp'));
const scene = (await readFile(resolve(root, 'scene.js'), 'utf8')).replace(/^export /gm, '');
const gpu = (await readFile(resolve(root, 'lib/gpu-scene.js'), 'utf8')).replace(/^import[^\n]+\n/m, '').replace(/^export /gm, '');
const app = (await readFile(resolve(root, 'app.js'), 'utf8')).replace(/^import[^\n]+\n/m, '').replace(/^export /gm, '');
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`);
html = html.replace('<script type="module" src="app.js"></script>', `<script type="module">${scene}\n${gpu}\n${app}\ninitializePortfolio();</script>`);
for (const path of new Set([...html.matchAll(/(?:href|src|content)="(assets\/[^"#?]+)"/g)].map(match => match[1]))) html = html.split(`"${path}"`).join(`"${await assetData(path)}"`);
await mkdir(resolve(destination, '..'), { recursive: true });
await writeFile(destination, html);
console.log(`Portable preview written to ${destination}`);
