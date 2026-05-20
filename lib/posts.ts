import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  image: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
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
    } as PostMeta;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    slug: data.slug ?? slug,
    tags: data.tags ?? [],
    image: data.image ?? '',
    readingTime: stats.text,
    content,
  } as Post;
}
