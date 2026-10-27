// textrnr — builds index.html from projects.json + the apps/ folder.
// No dependencies. Run: node build.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';

const esc = (s = '') => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const pick = (html, re) => (html.match(re) || [])[1]?.trim() || '';

// 1. find every app in apps/ — either apps/<slug>/index.html or apps/<slug>.html
const found = new Map();
for (const f of existsSync('apps') ? readdirSync('apps') : []) {
  if (f.startsWith('.')) continue;
  const p = `apps/${f}`;
  if (statSync(p).isDirectory() && existsSync(`${p}/index.html`)) found.set(f.toLowerCase(), { href: `${p}/`, file: `${p}/index.html` });
  else if (f.endsWith('.html')) found.set(f.slice(0, -5).toLowerCase(), { href: p, file: p });
}

// 2. merge with projects.json (your order + text), then add anything new found in apps/
const list = JSON.parse(readFileSync('projects.json', 'utf8'));
const known = new Set(list.map(p => p.slug.toLowerCase()));
for (const [slug, a] of found) {
  if (known.has(slug)) continue;
  const html = readFileSync(a.file, 'utf8');
  list.push({
    slug,
    name: (pick(html, /<title[^>]*>([^<]*)<\/title>/i) || slug).split(/\s[—|–-]\s/)[0].toUpperCase(),
    kind: 'web',
    desc: pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i).toLowerCase()
  });
}

const rows = list.map((p, i) => {
  const local = found.get(p.slug.toLowerCase());
  const href = local ? local.href : p.url;
  const ext = !local && p.url;
  const n = String(i + 1).padStart(2, '0');
  const inner = `<span class="no">${n}</span><b>${esc(p.name)}</b><span class="d">${esc(p.desc)}</span><span class="k">${esc(p.kind)}</span><span class="s">${href ? 'open ↗' : 'soon'}</span>`;
  return href
    ? `<li><a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${inner}</a></li>`
    : `<li><div class="off">${inner}</div></li>`;
}).join('\n');

const live = list.filter(p => found.has(p.slug.toLowerCase()) || p.url).length;
const today = new Date().toISOString().slice(0, 10);
const tpl = readFileSync('template.html', 'utf8');

writeFileSync('index.html', tpl
  .replace('{{rows}}', rows)
  .replace('{{count}}', `${list.length} projects / ${live} live`)
  .replace('{{updated}}', today));

console.log(`index.html — ${list.length} projects, ${live} live`);
