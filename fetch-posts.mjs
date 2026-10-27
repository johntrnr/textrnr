// textrnr — downloads the photos from the x posts listed in posts.json
// into posts/img/ and records them in posts/data.json.
// runs in the publish action (github's servers can reach x). each post is
// fetched once; after that its photos live in this repo. no dependencies.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const DATA = 'posts/data.json';
const { posts = [] } = JSON.parse(readFileSync('posts.json', 'utf8'));
const data = existsSync(DATA) ? JSON.parse(readFileSync(DATA, 'utf8')) : [];
const have = new Set(data.filter(p => p.photos?.length).map(p => p.id));
mkdirSync('posts/img', { recursive: true });

const HEAD = { 'user-agent': 'Mozilla/5.0 (compatible; textrnr-site/1.0)' };
const token = id => ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, '');
const clean = s => String(s || '')
  .replace(/https?:\/\/t\.co\/\S+/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .trim();

async function json(url) {
  const r = await fetch(url, { headers: HEAD });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

// 1st choice: x's own embed api. 2nd: fxtwitter.
async function lookup(id) {
  try {
    const t = await json(`https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=${token(id)}`);
    let photos = (t.mediaDetails || []).filter(m => m.type === 'photo')
      .map(m => ({ url: m.media_url_https, width: m.original_info?.width, height: m.original_info?.height }));
    if (!photos.length) photos = (t.photos || []).map(p => ({ url: p.url, width: p.width, height: p.height }));
    if (photos.length) return { date: t.created_at, text: t.text, photos };
    console.warn(`  syndication: no photos for ${id}`);
  } catch (e) { console.warn(`  syndication failed for ${id}: ${e.message}`); }
  const { tweet: t } = await json(`https://api.fxtwitter.com/status/${id}`);
  return { date: t.created_at, text: t.text, photos: (t.media?.photos || []).map(p => ({ url: p.url, width: p.width, height: p.height })) };
}

let added = 0;
for (const u of posts) {
  const m = String(u).match(/status(?:es)?\/(\d+)/);
  if (!m) { console.warn(`skip, not a post link: ${u}`); continue; }
  const id = m[1];
  if (have.has(id)) continue;
  try {
    console.log(`fetching ${id}`);
    const t = await lookup(id);
    const photos = [];
    for (const [i, p] of t.photos.entries()) {
      const mm = p.url.match(/\/media\/([^.?/]+)\.(\w+)/);
      const ext = mm ? mm[2] : 'jpg';
      const src = mm ? `https://pbs.twimg.com/media/${mm[1]}?format=${ext}&name=large` : p.url;
      const r = await fetch(src, { headers: HEAD });
      if (!r.ok) throw new Error(`image ${r.status} ${src}`);
      const file = `img/${id}-${i + 1}.${ext}`;
      writeFileSync(`posts/${file}`, Buffer.from(await r.arrayBuffer()));
      photos.push({ src: file, width: p.width || null, height: p.height || null });
    }
    const entry = { id, url: `https://x.com/i/status/${id}`, date: new Date(t.date).toISOString().slice(0, 10), text: clean(t.text), photos };
    const at = data.findIndex(p => p.id === id);
    at >= 0 ? (data[at] = entry) : data.push(entry);
    added++;
    console.log(`  ${photos.length} photo(s)`);
  } catch (e) {
    console.warn(`  could not fetch ${id}: ${e.message}`);
  }
}

data.sort((a, b) => (b.id.length - a.id.length) || (b.id > a.id ? 1 : -1));
writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n');
console.log(`done — ${added} new post(s), ${data.length} total`);
