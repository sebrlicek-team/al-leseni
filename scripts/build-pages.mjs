import fs from 'node:fs/promises';
import path from 'node:path';
import {build, files, root} from './build.mjs';
import {selectProject} from './project.mjs';

// Keep the original modules and configuration; publish their static output.
const name = await selectProject(root);
const {out} = await build(name);
const output = (await files(out)).filter(file => path.basename(file) !== '_headers');
const published = [];
let previous = [];
try { previous = JSON.parse(await fs.readFile(path.join(root, 'pages-files.json'), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const file of output) {
  const relative = path.relative(out, file);
  let content = await fs.readFile(file);
  if (file.endsWith('.html')) {
    // Relative links support both a custom domain and /al-leseni/ project hosting.
    content = content.toString().replace(/\b(href|src|poster|data-src)="\/(?!\/)([^"]*)"/g,
      (_, attribute, target) => {
        const [, pathname, suffix] = target.match(/^([^?#]*)(.*)$/s);
        const destination = path.join(root, pathname);
        let link = path.relative(path.dirname(path.join(root, relative)), destination).split(path.sep).join('/');
        if (!link) link = './';
        else if (!pathname || pathname.endsWith('/')) link += '/';
        return `${attribute}="${link}${suffix}"`;
      });
  }
  const destination = path.join(root, relative);
  await fs.mkdir(path.dirname(destination), {recursive: true});
  await fs.writeFile(destination, content);
  published.push(relative.split(path.sep).join('/'));
}
for (const stale of previous.filter(file => !published.includes(file))) {
  if (!/^(?:[a-z0-9-]+\/)*index\.html$/.test(stale) || stale === 'index.html') continue;
  await fs.rm(path.join(root, stale), {force: true});
}
await fs.writeFile(path.join(root, '.nojekyll'), '');
await fs.writeFile(path.join(root, 'pages-files.json'), JSON.stringify(published, null, 2) + '\n');
console.log(`GitHub Pages: ${published.length} static files published in repository root.`);
