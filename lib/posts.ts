import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export interface FAQ {
  question: string;
  answer: string;
}

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  image: string;
  readingTime: string;
  faqs: FAQ[];
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    return {
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ?? '',
      slug: data.slug ?? filename.replace('.mdx', ''),
      tags: data.tags ?? [],
      image: data.image ?? '',
      readingTime: stats.text,
      faqs: data.faqs ?? [],
    } as PostMeta;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post | null> {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return {
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    slug: data.slug ?? slug,
    tags: data.tags ?? [],
    image: data.image ?? '',
    readingTime: stats.text,
    faqs: data.faqs ?? [],
    content,
    contentHtml: processed.toString(),
  } as Post;
}
