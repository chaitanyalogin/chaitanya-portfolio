import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { resolvePublicPath, createStaticHandler } from '../scripts/static-handler.mjs';

test('Homepage directory is allowed with a trailing slash on Windows and POSIX', () => {
  assert.equal(resolvePublicPath('C:\\Users\\Chay\\portfolio\\out\\', '/', path.win32), 'C:\\Users\\Chay\\portfolio\\out');
  assert.equal(resolvePublicPath('/workspace/portfolio/out/', '/', path.posix), '/workspace/portfolio/out');
});

test('Windows asset paths stay inside the public directory and traversal is rejected', () => {
  const root='C:\\Users\\Chay\\portfolio\\out\\';
  assert.equal(resolvePublicPath(root, '/assets/resume.pdf', path.win32), 'C:\\Users\\Chay\\portfolio\\out\\assets\\resume.pdf');
  assert.equal(resolvePublicPath(root, '/../private.txt', path.win32), null);
  assert.equal(resolvePublicPath('/work/out/', '/../out-private/file', path.posix), null);
});

const root = fileURLToPath(new URL('../out/', import.meta.url));
const handler = createStaticHandler(root);
async function request(url, method='GET') {
  const result={};
  await handler({url,method},{writeHead(status,headers){result.status=status;result.headers=headers;},end(body){result.body=body;}});
  return result;
}

test('Actual homepage handler returns the built portfolio with HTTP 200', async () => {
  const response=await request('/');
  assert.equal(response.status,200);
  assert.equal(response.headers['Content-Type'],'text/html; charset=utf-8');
  assert.ok(response.body.toString().includes('EntitlementCI'));
});

test('HEAD homepage returns headers without a response body', async () => {
  const response=await request('/', 'HEAD');
  assert.equal(response.status,200);
  assert.equal(response.body,undefined);
});

test('Next.js script and resume requests return their correct content types', async () => {
  const html=await readFile(path.resolve(root,'index.html'),'utf8');
  const script=html.match(/<script[^>]+src="([^"]+)"/)[1];
  const js=await request(script);
  assert.equal(js.status,200);
  assert.equal(js.headers['Content-Type'],'text/javascript; charset=utf-8');
  const pdf=await request('/assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf');
  assert.equal(pdf.status,200);
  assert.equal(pdf.headers['Content-Type'],'application/pdf');
  assert.equal(pdf.body.subarray(0,4).toString(),'%PDF');
});

test('Encoded traversal is forbidden and absent files return the custom 404', async () => {
  assert.equal((await request('/..%2f..%2fprivate.txt')).status,403);
  const missing=await request('/does-not-exist');
  assert.equal(missing.status,404);
  assert.ok(missing.body.toString().includes('PAGE NOT FOUND'));
});
