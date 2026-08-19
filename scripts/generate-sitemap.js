const fs = require('fs');
const https = require('https');
const { execFileSync } = require('child_process');

const ORIGIN = 'https://lightningautoservice.com';
const BLOG_ID = '60dcIXEB4CyR6tNjQzMg';
const BLOG_API = `https://www.bloghandy.com/api/v1/?bh_id=${BLOG_ID}&domain=lightningautoservice.com&hash=&callback=bh_data&format=jsonp`;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers: { 'User-Agent': 'LightningAutoService-Sitemap/1.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        resolve(fetchText(new URL(response.headers.location, url).href));
        return;
      }
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`BlogHandy returned HTTP ${response.statusCode}`));
        return;
      }
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => resolve(body));
    });
    request.setTimeout(15000, () => request.destroy(new Error('BlogHandy request timed out')));
    request.on('error', reject);
  });
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function staticUrls() {
  return fs.readdirSync('.')
    .filter((file) => file.endsWith('.html') && file !== 'service.html')
    .sort()
    .map((file) => {
      const html = fs.readFileSync(file, 'utf8');
      if (/name="robots"[^>]*content="[^"]*noindex/i.test(html)) return null;
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
      if (!canonical) throw new Error(`${file} has no canonical URL`);
      let lastmod;
      try {
        lastmod = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim() || undefined;
      } catch {
        // A sitemap can still be generated when the build environment has no Git history.
      }
      return { loc: canonical, lastmod };
    })
    .filter(Boolean);
}

function blogUrls(jsonp) {
  const match = jsonp.match(/^bh_data\((.*)\)\s*$/s);
  if (!match) throw new Error('Unexpected BlogHandy response format');
  const payload = JSON.parse(match[1]);
  const content = payload.response?.content || '';
  const discovered = new Map();
  for (const post of content.split('<div dir="ltr" class="bh-post">').slice(1)) {
    const slug = post.match(/href="\?post=([^"]+)"/)?.[1];
    if (!slug || discovered.has(slug)) continue;
    const date = post.match(/<span class="bh-meta-date">(\d{2})-(\d{2})-(\d{4})<\/span>/);
    const entry = { loc: `${ORIGIN}/resources?post=${slug}` };
    if (date) entry.lastmod = `${date[3]}-${date[2]}-${date[1]}`;
    discovered.set(slug, entry);
  }
  for (const [, slug] of content.matchAll(/href="\?post=([^"]+)"/g)) {
    if (!discovered.has(slug)) discovered.set(slug, { loc: `${ORIGIN}/resources?post=${slug}` });
  }
  return [...discovered.values()];
}

function render(urls) {
  const rows = urls.map(({ loc, lastmod }) => {
    const modified = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${modified}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
}

(async () => {
  const blogFeed = await fetchText(BLOG_API);
  const urls = [...staticUrls(), ...blogUrls(blogFeed)];
  fs.writeFileSync('sitemap.xml', render(urls));
  console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
})().catch((error) => {
  console.error(`Sitemap generation failed: ${error.message}`);
  process.exit(1);
});
