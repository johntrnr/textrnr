// textrnr — builds the whole site. no dependencies. run: node build.mjs
//   index.html            ← projects.json + apps/
//   tools/<slug>/         ← one page per project
//   gallery/index.html    ← every image in gallery/
//   posts/index.html      ← posts.json (x.com posts)
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, mkdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';

const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
const esc = (s = '') => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const low = s => esc(String(s || '').toLowerCase());
const pick = (html, re) => (html.match(re) || [])[1]?.trim() || '';
const ls = d => (existsSync(d) ? readdirSync(d).filter(f => !f.startsWith('.')) : []);
const write = (f, s) => { mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const today = new Date().toISOString().slice(0, 10);

// ── shared shell ───────────────────────────────────────────────
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a0a0a'/%3E%3Crect x='10' y='10' width='3' height='3' fill='%23ff2a12'/%3E%3C/svg%3E";
const NAV = [['tools', ''], ['gallery', 'gallery/'], ['posts', 'posts/']];

function page({ depth = 0, active = '', title = '', desc = 'apps, tools & experiments by textrnr.', body, scripts = '' }) {
  const r = '../'.repeat(depth);
  const nav = NAV.map(([n, h]) => `<a href="${r}${h || './'}"${active === n ? ' aria-current="page"' : ''}>${n}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${title ? `${low(title)} — ` : ''}textrnr</title>
<meta name="description" content="${low(desc)}">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${FAVICON}">
<link rel="stylesheet" href="${r}style.css">
</head>
<body>
<header><a class="brand" href="${r || './'}">textrnr<i>.</i></a><nav>${nav}</nav></header>
<main>
${body}
</main>
<footer><span>©textrnr</span><span class="dim">updated ${today}</span></footer>
${scripts}</body>
</html>
`;
}

// ── projects + apps ────────────────────────────────────────────
const apps = new Map();
for (const f of ls('apps')) {
  const p = `apps/${f}`;
  if (statSync(p).isDirectory() && existsSync(`${p}/index.html`)) apps.set(f.toLowerCase(), { href: `${p}/`, file: `${p}/index.html` });
  else if (f.endsWith('.html')) apps.set(f.slice(0, -5).toLowerCase(), { href: p, file: p });
}

const projects = JSON.parse(readFileSync('projects.json', 'utf8'));
const known = new Set(projects.map(p => p.slug.toLowerCase()));
for (const [slug, a] of apps) {
  if (known.has(slug)) continue;
  const html = readFileSync(a.file, 'utf8');
  const d = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i);
  projects.push({ slug, name: (pick(html, /<title[^>]*>([^<]*)<\/title>/i) || slug).split(/\s[—|–-]\s/)[0], kind: 'web', desc: d, intro: d, features: [] });
}

const covers = new Map(ls('covers').filter(f => IMG.test(f)).map(f => [f.replace(IMG, '').toLowerCase(), `covers/${f}`]));

projects.forEach((p, i) => {
  p.slug = p.slug.toLowerCase();
  p.no = String(i + 1).padStart(2, '0');
  const local = apps.get(p.slug);
  p.app = local ? { href: local.href, ext: false } : p.url ? { href: p.url, ext: true } : null;
  p.cover = covers.get(p.slug);
});
const live = projects.filter(p => p.app).length;

// index
const rows = projects.map(p => `<li><a href="tools/${p.slug}/"><span class="no">${p.no}</span><b>${low(p.name)}</b><span class="d">${low(p.desc)}</span><span class="k">${low(p.kind)}</span><span class="s${p.app ? ' on' : ''}">${p.app ? 'live' : 'soon'}</span></a></li>`).join('\n');
write('index.html', page({
  active: 'tools',
  body: `<section class="intro"><p>apps, tools &amp; experiments. cameras, image processors, editors and a few other things.</p><span class="dim">${projects.length} projects / ${live} live</span></section>
<ol class="list">
${rows}
</ol>`
}));

// one page per tool
rmSync('tools', { recursive: true, force: true });
projects.forEach((p, i) => {
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const open = p.app
    ? `<a class="btn" href="${p.app.ext ? esc(p.app.href) : `../../${p.app.href}`}"${p.app.ext ? ' target="_blank" rel="noopener"' : ''}>open ${low(p.name)} ↗</a>`
    : `<span class="btn off">coming soon</span>`;
  const feats = (p.features || []).length
    ? `<div><h2>features</h2><ol class="feat">${p.features.map(f => `<li>${low(f)}</li>`).join('')}</ol></div>`
    : '';
  write(`tools/${p.slug}/index.html`, page({
    depth: 2, active: 'tools', title: p.name, desc: p.desc,
    body: `<div class="crumb"><a href="../../">← tools</a><span class="dim">${p.no} / ${String(projects.length).padStart(2, '0')}</span></div>
<section class="t-head"><h1>${low(p.name)}</h1><p>${low(p.kind)} · ${p.app ? '<span class="acc">live</span>' : 'soon'}</p>${p.cover ? `<img class="cover" src="../../${esc(p.cover)}" alt="${low(p.name)}" loading="lazy" decoding="async">` : ''}</section>
<section class="t-body"><div><h2>about</h2><p class="t-intro">${low(p.intro || p.desc)}</p>${open}</div>${feats}</section>
<nav class="pager" aria-label="more tools"><a href="../${prev.slug}/">← ${low(prev.name)}</a><a href="../${next.slug}/">${low(next.name)} →</a></nav>`
  }));
});

// ── gallery ────────────────────────────────────────────────────
// newest first by filename: name files like 2026-10-27-night-drive.jpg
const shots = ls('gallery').filter(f => IMG.test(f)).sort().reverse();
const caption = f => f.replace(IMG, '').replace(/^\d{4}-\d{2}-\d{2}[-_ ]?/, '').replace(/[-_]+/g, ' ').trim();
write('gallery/index.html', page({
  depth: 1, active: 'gallery', title: 'gallery', desc: 'photos and work by textrnr.',
  body: `<section class="intro"><p>photos, renders and outputs from the tools.</p><span class="dim">${shots.length} images</span></section>
${shots.length
    ? `<div class="grid">${shots.map(f => `<a href="${esc(f)}"><img src="${esc(f)}" alt="${low(caption(f))}" loading="lazy" decoding="async"></a>`).join('')}</div>
<dialog id="lb"><img alt=""><p></p></dialog>`
    : `<p class="empty">nothing here yet.</p>`}`,
  scripts: shots.length ? `<script>
const d=document.getElementById('lb'),im=d.querySelector('img'),cap=d.querySelector('p'),a=[...document.querySelectorAll('.grid a')];let k=0;
const show=i=>{k=(i+a.length)%a.length;im.src=a[k].href;cap.textContent=a[k].firstChild.alt;};
a.forEach((l,i)=>l.onclick=e=>{e.preventDefault();show(i);d.showModal();});
d.onclick=()=>d.close();
addEventListener('keydown',e=>{if(!d.open)return;if(e.key==='ArrowRight')show(k+1);if(e.key==='ArrowLeft')show(k-1);});
</script>
` : ''
}));

// ── posts (x.com) ──────────────────────────────────────────────
const { handle, posts = [] } = JSON.parse(readFileSync('posts.json', 'utf8'));
const tweet = u => {
  const m = String(u).match(/(?:x|twitter)\.com\/([^/]+)\/status\/(\d+)/i);
  return m ? `<blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none"><a href="https://twitter.com/${esc(m[1])}/status/${m[2]}">post by @${esc(m[1])}</a></blockquote>` : '';
};
write('posts/index.html', page({
  depth: 1, active: 'posts', title: 'posts', desc: `photo posts by @${handle} on x.`,
  body: `<section class="intro"><p>photo posts from x.</p><a class="dim" href="https://x.com/${esc(handle)}/media" target="_blank" rel="noopener">@${esc(handle)} on x ↗</a></section>
${posts.length
    ? `<div class="posts">${posts.map(tweet).join('\n')}</div>`
    : `<div class="timeline"><a class="twitter-timeline" data-dnt="true" data-theme="light" data-chrome="noheader nofooter noborders transparent" data-tweet-limit="20" href="https://twitter.com/${esc(handle)}">posts by @${esc(handle)}</a></div>`}`,
  scripts: `<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n`
}));

console.log(`built — ${projects.length} tools (${live} live), ${shots.length} gallery images, ${posts.length} posts`);
