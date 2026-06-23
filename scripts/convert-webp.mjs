import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');

const files = fs.readdirSync(BLOG_DIR).filter(f =>
  /\.(png|jpg|jpeg|PNG|JPG|JPEG)$/.test(f)
);

let converted = 0;
for (const file of files) {
  const input = path.join(BLOG_DIR, file);
  const outputName = file.replace(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/, '.webp');
  const output = path.join(BLOG_DIR, outputName);

  if (fs.existsSync(output)) {
    console.log(`skip  ${outputName} (already exists)`);
    continue;
  }

  try {
    const info = await sharp(input)
      .webp({ quality: 82 })
      .toFile(output);
    const kb = (info.size / 1024).toFixed(0);
    console.log(`ok    ${outputName} (${kb} KB)`);
    converted++;
  } catch (e) {
    console.error(`fail  ${file}: ${e.message}`);
  }
}

console.log(`\nDone — ${converted} images converted.`);
