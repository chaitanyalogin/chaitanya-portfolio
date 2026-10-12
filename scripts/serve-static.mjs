import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createStaticHandler } from './static-handler.mjs';

const root=fileURLToPath(new URL('../out/',import.meta.url));
const port=Number(process.env.PORT || 5173);
try{await stat(resolve(root,'index.html'));}catch{console.error('Run npm ci and npm run build first, or use the supplied archive with its out folder.');process.exit(1);}
const server=createServer(createStaticHandler(root));
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is in use. Close the earlier preview or open its browser window.`:error.message);process.exitCode=1;});
server.listen(port,'0.0.0.0',()=>{
  const url=`http://localhost:${port}`;
  console.log(`Production portfolio preview: ${url}`);
  if(process.platform==='win32' && process.env.PORTFOLIO_OPEN_BROWSER==='1'){
    const child=spawn('cmd.exe',['/c','start','""',url],{detached:true,stdio:'ignore'});
    child.on('error',()=>console.log('Open the preview URL in your browser.'));child.unref();
  }
});
