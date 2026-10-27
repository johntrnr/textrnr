// textrnr — builds the whole site. no dependencies. run: node build.mjs
//   index.html            ← projects.json + apps/
//   projects/<slug>/      ← one page per project (cover from covers/<slug>.jpg)
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
const NAV = [['projects', ''], ['gallery', 'gallery/'], ['posts', 'posts/']];

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
<footer><span class="dim">updated ${today}</span></footer>
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
const thumbs = new Map(ls('covers/thumbs').filter(f => IMG.test(f)).map(f => [f.replace(IMG, '').toLowerCase(), `covers/thumbs/${f}`]));

projects.forEach((p, i) => {
  p.slug = p.slug.toLowerCase();
  p.no = String(i + 1).padStart(2, '0');
  const local = apps.get(p.slug);
  p.app = local ? { href: local.href, ext: false } : p.url ? { href: p.url, ext: true } : null;
  p.cover = covers.get(p.slug);
  p.thumb = thumbs.get(p.slug) || p.cover;
});
const live = projects.filter(p => p.app).length;

// index
const rows = projects.map(p => `<li><a href="projects/${p.slug}/"><span class="th">${p.thumb ? `<img src="${esc(p.thumb)}" alt="" width="160" height="200" loading="lazy" decoding="async">` : ''}</span><span class="no">${p.no}</span><b>${low(p.name)}</b><span class="d">${low(p.desc)}</span><span class="k">${low(p.kind)}</span><span class="s${p.app ? ' on' : ''}">${p.app ? 'live' : 'soon'}</span></a></li>`).join('\n');
write('index.html', page({
  active: 'projects',
  body: `<section class="intro"><p>apps, tools &amp; experiments. cameras, image processors, editors and a few other things.</p><span class="dim">${projects.length} projects / ${live} live</span></section>
<ol class="list">
${rows}
</ol>`
}));

// one page per project
rmSync('tools', { recursive: true, force: true });
rmSync('projects', { recursive: true, force: true });
projects.forEach((p, i) => {
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const open = p.app
    ? `<a class="btn" href="${p.app.ext ? esc(p.app.href) : `../../${p.app.href}`}"${p.app.ext ? ' target="_blank" rel="noopener"' : ''}>open ${low(p.name)} ↗</a>`
    : `<span class="btn off">coming soon</span>`;
  const feats = (p.features || []).length
    ? `<h2>features</h2><ol class="feat">${p.features.map(f => `<li>${low(f)}</li>`).join('')}</ol>`
    : '';
  write(`projects/${p.slug}/index.html`, page({
    depth: 2, active: 'projects', title: p.name, desc: p.desc,
    body: `<div class="crumb"><a href="../../">← projects</a><span class="dim">${p.no} / ${String(projects.length).padStart(2, '0')}</span></div>
<section class="t-head"><h1>${low(p.name)}</h1><p>${low(p.kind)} · ${p.app ? '<span class="acc">live</span>' : 'soon'}</p></section>
<section class="t-body${p.cover ? '' : ' solo'}">${p.cover ? `<figure class="cover"><img src="../../${esc(p.cover)}" alt="${low(p.name)}" width="960" height="1200" decoding="async"></figure>` : ''}<div class="t-text"><h2>about</h2><p class="t-intro">${low(p.intro || p.desc)}</p>${open}${feats}</div></section>
<nav class="pager" aria-label="more projects"><a href="../${prev.slug}/">← ${low(prev.name)}</a><a href="../${next.slug}/">${low(next.name)} →</a></nav>`
  }));
});

// ── lightbox (gallery + posts) ─────────────────────────────────
const LIGHTBOX = `<dialog id="lb"><img alt=""><p></p></dialog>
<script>
const d=document.getElementById('lb'),im=d.querySelector('img'),cap=d.querySelector('p'),a=[...document.querySelectorAll('a.lb')];let k=0;
const show=i=>{k=(i+a.length)%a.length;im.src=a[k].href;cap.textContent=a[k].dataset.cap||'';};
a.forEach((l,i)=>l.onclick=e=>{e.preventDefault();show(i);d.showModal();});
d.onclick=()=>d.close();
addEventListener('keydown',e=>{if(!d.open)return;if(e.key==='ArrowRight')show(k+1);if(e.key==='ArrowLeft')show(k-1);});
</script>
`;
const img = (src, alt, w, h) => `<img src="${esc(src)}" alt="${low(alt)}"${w && h ? ` width="${w}" height="${h}"` : ''} loading="lazy" decoding="async">`;

// ── gallery ────────────────────────────────────────────────────
// newest first by filename: name files like 2026-10-27-night-drive.jpg
const shots = ls('gallery').filter(f => IMG.test(f)).sort().reverse();
const caption = f => f.replace(IMG, '').replace(/^\d{4}-\d{2}-\d{2}[-_ ]?/, '').replace(/[-_]+/g, ' ').trim();
write('gallery/index.html', page({
  depth: 1, active: 'gallery', title: 'gallery', desc: 'photos and work by textrnr.',
  body: `<section class="intro"><p>photos, renders and outputs from the tools.</p><span class="dim">${shots.length} images</span></section>
${shots.length
    ? `<div class="grid">${shots.map(f => `<a class="lb" href="${esc(f)}" data-cap="${low(caption(f))}">${img(f, caption(f))}</a>`).join('')}</div>`
    : `<p class="empty">nothing here yet.</p>`}`,
  scripts: shots.length ? LIGHTBOX : ''
}));

// ── posts ──────────────────────────────────────────────────────
// photos downloaded from the x posts in posts.json (see fetch-posts.mjs)
const { handle, posts = [] } = JSON.parse(readFileSync('posts.json', 'utf8'));
const wanted = new Set(posts.map(u => (String(u).match(/status(?:es)?\/(\d+)/) || [])[1]).filter(Boolean));
const fetched = existsSync('posts/data.json') ? JSON.parse(readFileSync('posts/data.json', 'utf8')) : [];
const feed = fetched.filter(p => wanted.has(p.id) && p.photos?.length);
const nPhotos = feed.reduce((n, p) => n + p.photos.length, 0);
write('posts/index.html', page({
  depth: 1, active: 'posts', title: 'posts', desc: 'photo posts by textrnr.',
  body: `<section class="intro"><p>photo posts.</p><span class="dim">${feed.length} posts / ${nPhotos} photos</span></section>
${feed.length
    ? `<div class="feed">${feed.map(p => {
        const cap = [p.date, p.text].filter(Boolean).join(' — ');
        return `<article><div class="ph n${Math.min(p.photos.length, 2)}">${p.photos.map(f => `<a class="lb" href="${esc(f.src)}" data-cap="${low(cap)}">${img(f.src, p.text || `post ${p.date}`, f.width, f.height)}</a>`).join('')}</div><p><span class="dim">${esc(p.date)}</span>${p.text ? ` ${low(p.text)}` : ''}</p></article>`;
      }).join('\n')}</div>`
    : `<p class="empty">nothing here yet.</p>`}`,
  scripts: feed.length ? LIGHTBOX : ''
}));

console.log(`built — ${projects.length} projects (${live} live), ${shots.length} gallery images, ${feed.length}/${wanted.size} posts`);
