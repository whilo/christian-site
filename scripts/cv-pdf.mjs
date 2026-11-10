// Print the built /cv page to public/christian-weilbach-cv.pdf with the system Chromium.
// Usage: npm run cv:pdf   (builds first; set CHROMIUM=/path/to/chromium to override)
// The PDF is committed, so deployment does not need a browser.
import { createServer } from 'node:http';
import { readFile, stat, copyFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const root = resolve('dist');
const out = resolve('public/christian-weilbach-cv.pdf');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
  try {
    let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    let file = join(root, path);
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404); res.end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const chromium = process.env.CHROMIUM ?? 'chromium';
// Snap-packaged Chromium may only write inside the home directory, so print into dist first.
const tmp = join(root, 'cv.pdf');
const code = await new Promise((r) => {
  const p = spawn(chromium, ['--headless', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=4000',
    `--print-to-pdf=${tmp}`, `http://127.0.0.1:${port}/cv/`], { stdio: 'inherit' });
  p.on('exit', r);
});
server.close();
if (code !== 0) { console.error(`chromium exited with ${code}`); process.exit(1); }
await copyFile(tmp, out);
console.log(`wrote ${out}`);
