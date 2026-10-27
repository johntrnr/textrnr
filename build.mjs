// textrnr — builds the whole site. no dependencies. run: node build.mjs
//   index.html            ← projects.json + apps/
//   projects/<slug>/      ← one page per project (cover from covers/<slug>.jpg)
//   bio/index.html        ← bio.json (bio, metrics, achievements, links)
//   posts/index.html      ← posts.json (x.com posts)
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, mkdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';

const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
const esc = (s = '') => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const low = s => esc(String(s || '').toLowerCase());
const pick = (html, re) => (html.match(re) || [])[1]?.trim() || '';
const ls = d => (existsSync(d) ? readdirSync(d).filter(f => !f.startsWith('.')) : []);
const write = (f, s) => { mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const now = new Date();
const today = now.toISOString().slice(0, 10);
const stamp = now.toLocaleString('sv-SE', { timeZone: 'Europe/Brussels' }).slice(0, 16); // build time, brussels
// css is inlined into every page so a cached stylesheet can never mismatch the html
const CSS = readFileSync('style.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{};:,>])\s*/g, '$1').trim();

// ── shared shell ───────────────────────────────────────────────
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a0a0a'/%3E%3Crect x='10' y='10' width='3' height='3' fill='%23ff2a12'/%3E%3C/svg%3E";
const NAV = [['projects', ''], ['posts', 'posts/'], ['bio', 'bio/']];

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
<style>${CSS}</style>
</head>
<body>
<header><a class="brand" href="${r || './'}">textrnr<i>.</i></a><nav>${nav}</nav></header>
<main>
${body}
</main>
<footer>updated ${stamp}</footer>
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
const rows = projects.map(p => `<li><a href="projects/${p.slug}/"><span class="no">${p.no}</span><b>${low(p.name)}</b><span class="d">${low(p.desc)}</span><span class="s${p.app ? ' on' : ''}">${p.app ? 'live' : 'soon'}</span></a></li>`).join('\n');
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

// ── lightbox (posts) ─────────────────────────────────
const LIGHTBOX = `<dialog id="lb"><img alt=""><p></p></dialog>
<script>
const d=document.getElementById('lb'),im=d.querySelector('img'),cap=d.querySelector('p'),a=[...document.querySelectorAll('a.lb')];let k=0;
const show=i=>{k=(i+a.length)%a.length;im.src=a[k].href;cap.textContent=a[k].dataset.cap||'';};
a.forEach((l,i)=>l.onclick=e=>{e.preventDefault();show(i);d.showModal();});
d.onclick=()=>d.close();
addEventListener('keydown',e=>{if(!d.open)return;if(e.key==='ArrowRight')show(k+1);if(e.key==='ArrowLeft')show(k-1);});
let x0=null;d.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});d.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){e.preventDefault();show(k+(dx<0?1:-1));}});
</script>
`;
const smOf = (dir, src) => { const i = src.lastIndexOf('/') + 1; const sm = `${src.slice(0, i)}sm/${src.slice(i)}`; return existsSync(`${dir}/${sm}`) ? sm : src; };
const img = (src, alt, w, h) => `<img src="${esc(src)}" alt="${low(alt)}"${w && h ? ` width="${w}" height="${h}"` : ''} loading="lazy" decoding="async">`;

// ── bio ────────────────────────────────────────────────────────
const B = JSON.parse(readFileSync('bio.json', 'utf8'));
const ext = (u, t) => u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>` : t;
write('bio/index.html', page({
  depth: 1, active: 'bio', title: 'bio', desc: B.bio[0],
  body: `<section class="intro"><p>${low(B.name)}</p></section>
<section class="bio">
<div class="b-text">${B.bio.map(t => `<p>${low(t)}</p>`).join('')}</div>
<h2>numbers</h2>
<ul class="metrics">${B.metrics.map(m => `<li><span>${low(m.value)}</span><span class="dim">${low(m.label)}</span></li>`).join('')}</ul>
<h2>achievements</h2>
<ol class="ach">${B.achievements.map(a => `<li><span class="dim">${low(a.year)}</span><span>${ext(a.url, low(a.text))}</span></li>`).join('')}</ol>
<h2>elsewhere</h2>
<ul class="links">${B.links.map(l => `<li>${ext(l.url, `${low(l.name)} ↗`)}</li>`).join('')}</ul>
</section>`
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
        return `<article><div class="ph n${Math.min(p.photos.length, 2)}">${p.photos.map(f => `<a class="lb" href="${esc(f.src)}" data-cap="${low(cap)}">${img(smOf('posts', f.src), p.text || `post ${p.date}`, f.width, f.height)}</a>`).join('')}</div><p><span class="dim">${esc(p.date)}</span>${p.text ? ` ${low(p.text)}` : ''}</p></article>`;
      }).join('\n')}</div>`
    : `<p class="empty">nothing here yet.</p>`}`,
  scripts: feed.length ? LIGHTBOX : ''
}));

console.log(`built — ${projects.length} projects (${live} live), ${feed.length}/${wanted.size} posts`);
