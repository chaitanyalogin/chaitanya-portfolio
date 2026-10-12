import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';

export function resolvePublicPath(rootDirectory, pathname, paths = path) {
  const root = paths.resolve(rootDirectory);
  const file = paths.resolve(root, `.${pathname}`);
  const relative = paths.relative(root, file);
  // The empty relative path is the homepage directory and must be allowed.
  if (relative === '..' || relative.startsWith(`..${paths.sep}`) || paths.isAbsolute(relative)) return null;
  return file;
}

const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.pdf':'application/pdf', '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.txt':'text/plain; charset=utf-8' };

export function createStaticHandler(rootDirectory) {
  const root = path.resolve(rootDirectory);
  return async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let file = resolvePublicPath(root, pathname);
      if (!file) { response.writeHead(403); response.end(); return; }
      if ((await stat(file)).isDirectory()) file = path.resolve(file, 'index.html');
      const bytes = await readFile(file);
      response.writeHead(200, {
        'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': pathname.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'no-cache',
      });
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : await readFile(path.resolve(root, '404.html')));
    }
  };
}
