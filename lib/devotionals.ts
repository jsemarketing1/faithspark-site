import { readFile } from 'fs/promises';
import path from 'path';

export type DevotionalEntry = {
  day: number;
  date: string;
  title: string;
  scripture: string;
  verse: string;
  content: string;
  prayer: string;
  reflection: string;
};

export type DevotionalsCatalog = Record<string, DevotionalEntry>;

/** Day of year 1–365 (matches devotionals.json keys). */
export function getDayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

let catalogCache: DevotionalsCatalog | null = null;

export async function loadDevotionalsCatalog(): Promise<DevotionalsCatalog> {
  if (catalogCache) return catalogCache;
  const filePath = path.join(process.cwd(), 'public', 'data', 'devotionals.json');
  const raw = await readFile(filePath, 'utf8');
  catalogCache = JSON.parse(raw) as DevotionalsCatalog;
  return catalogCache;
}

/** Server-side: load catalog and return today's entry. */
export async function getTodaysDevotional(date = new Date()): Promise<DevotionalEntry | null> {
  const catalog = await loadDevotionalsCatalog();
  const day = getDayOfYear(date);
  return catalog[String(day)] ?? null;
}

/** Client or edge: fetch public JSON and return today's entry. */
export async function fetchTodaysDevotional(baseUrl = ''): Promise<DevotionalEntry | null> {
  const day = getDayOfYear();
  const res = await fetch(`${baseUrl}/data/devotionals.json`, { cache: 'no-store' });
  if (!res.ok) return null;
  const catalog = (await res.json()) as DevotionalsCatalog;
  return catalog[String(day)] ?? null;
}