export function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

export type DailyDevotionalEntry = {
  title: string;
  verse: string;
  scripture: string;
  content: string;
  reflection?: string;
  prayer?: string;
};

/** Fetch today's entry from /data/devotionals.json */
export async function fetchTodaysDevotional(): Promise<DailyDevotionalEntry> {
  const day = getDayOfYear();
  const res = await fetch(`/data/devotionals.json`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Failed to load devotionals");
  const catalog = await res.json();
  const entry = catalog[String(day)];
  if (!entry) throw new Error(`No devotional for day ${day}`);
  return entry;
}
