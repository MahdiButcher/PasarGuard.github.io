import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadPortFromEnvFiles() {
  if (process.env.PORT) return;

  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;

    const match = readFileSync(path, 'utf8').match(
      /^\s*PORT\s*=\s*["']?(\d+)["']?\s*$/m,
    );
    if (match) {
      process.env.PORT = match[1];
      return;
    }
  }
}

loadPortFromEnvFiles();

const child = spawn('next', ['dev', '--turbo'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
