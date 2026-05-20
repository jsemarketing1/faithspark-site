import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEY = process.env.INDEXNOW_KEY || 'faithspark9a7b2026';
const HOST = 'faithspark.app';
const BASE = `https://${HOST}`;

const blogDir = path.join(__dirname, '..', 'content', 'blog');
const blogUrls = [];

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
  for (const file of files) {
    blogUrls.push(`${BASE}/blog/${file.replace('.mdx', '')}/`);
  }
}

const urlList = [
  `${BASE}/`,
  `${BASE}/blog/`,
  `${BASE}/download/`,
  ...blogUrls,
];

console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing/Yahoo)...`);

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
} catch (err) {
  console.log('IndexNow submission failed (non-fatal):', err.message);
}
