import { spawn } from 'node:child_process';
const input = process.argv.slice(2);
let host = '0.0.0.0', port = '5173';
for (let i = 0; i < input.length; i++) {
  if (['--host', '--hostname', '-H'].includes(input[i])) host = input[++i];
  else if (['--port', '-p'].includes(input[i])) port = input[++i];
  else if (input[i] !== '--strictPort') throw new Error('Unknown development option: ' + input[i]);
}
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', host, '--port', port], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
