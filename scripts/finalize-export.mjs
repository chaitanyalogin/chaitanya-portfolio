import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root=fileURLToPath(new URL('../',import.meta.url));
const out=resolve(root,'out');
const hashes=new Set();
async function inspect(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const path=resolve(directory,entry.name);
    if(entry.isDirectory())await inspect(path);
    else if(entry.name.endsWith('.html')){
      const html=await readFile(path,'utf8');
      for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
        if(!/\bsrc=/.test(match[1]) && match[2])hashes.add(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`);
      }
    }
  }
}
await inspect(out);
let headers=await readFile(resolve(root,'public/_headers'),'utf8');
headers=headers.replace("script-src 'self'",`script-src 'self' ${[...hashes].join(' ')}`);
await writeFile(resolve(out,'_headers'),headers);
const pdf=await stat(resolve(out,'assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf'));
if(pdf.size<1000)throw new Error('Resume is missing from the export');
console.log(`Static export ready. Added ${hashes.size} CSP hashes for Next.js bootstrap scripts. Nothing deployed.`);
