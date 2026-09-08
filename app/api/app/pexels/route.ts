import { NextRequest, NextResponse } from "next/server";

const SAFE_FALLBACK_QUERY = "golden sunrise peaceful nature faith light";

const BLOCKED_QUERY_TERMS = new Set([
  "healing", "recovery", "cancer", "breast", "mastectomy", "chemotherapy", "chemo",
  "tumor", "surgery", "surgical", "hospital", "medical", "patient", "wound", "scar",
  "illness", "disease", "sick", "nude", "naked", "nipple", "mastec", "oncology",
  "clinic", "doctor", "nurse", "dermatology", "amputation", "prosthetic", "bandage",
  "trauma", "injury", "burn", "autopsy", "anatomy", "skin cancer",
]);

const QUERY_REPLACEMENTS: Record<string, string> = {
  healing: "peaceful restoration", recovery: "hope sunrise", medical: "peaceful",
  hospital: "chapel", cancer: "hope", breast: "", surgery: "",
};

const BLOCKED_ALT_PATTERNS = [
  /\bbreast\b/i, /\bmastect/i, /\bcancer\b/i, /\bchemo/i, /\btumor\b/i, /\bsurger/i,
  /\bhospital\b/i, /\bmedical\b/i, /\bpatient\b/i, /\bwound\b/i, /\bscar\b/i,
  /\bnude\b/i, /\bnaked\b/i, /\bnipple\b/i, /\boncolog/i, /\bamputat/i,
  /\bprosthetic\b/i, /\bdermatolog/i, /\banatom/i, /\bbandage\b/i, /\bchemotherapy\b/i,
  /\btopless\b/i, /\bshirtless\b/i, /\bchest\b/i, /\btorso\b/i,
];

type PexelsPhoto = { id: number; alt?: string; url?: string; photographer?: string; src: { large2x?: string; large?: string } };

function sanitizeQuery(query: string) {
  if (!query) return SAFE_FALLBACK_QUERY;
  const sanitized = query
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase().replace(/[^a-z]/g, "");
      if (BLOCKED_QUERY_TERMS.has(lower)) return QUERY_REPLACEMENTS[lower] ?? "";
      return word;
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return sanitized || SAFE_FALLBACK_QUERY;
}

function isSafePhoto(photo: PexelsPhoto) {
  const text = [photo.alt, photo.url, photo.photographer].filter(Boolean).join(" ").toLowerCase();
  return !BLOCKED_ALT_PATTERNS.some((p) => p.test(text));
}

async function searchPexels(query: string, key: string): Promise<PexelsPhoto[]> {
  const safeQuery = sanitizeQuery(query);
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(safeQuery)}&per_page=30&orientation=landscape`, { headers: { Authorization: key } });
    const data = await res.json();
    const safe = (data.photos ?? []).filter(isSafePhoto);
    if (safe.length) return safe;
    if (safeQuery !== SAFE_FALLBACK_QUERY) {
      const fallbackRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(SAFE_FALLBACK_QUERY)}&per_page=30&orientation=landscape`, { headers: { Authorization: key } });
      const fallbackData = await fallbackRes.json();
      return (fallbackData.photos ?? []).filter(isSafePhoto);
    }
    return [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const key = process.env.PEXELS_KEY ?? "";
  const query = req.nextUrl.searchParams.get("query") ?? "";
  if (!key) return NextResponse.json({ url: null });

  const photos = await searchPexels(query, key);
  if (!photos.length) return NextResponse.json({ url: null });

  const photo = photos[Math.floor(Math.random() * photos.length)];
  return NextResponse.json({ url: photo.src.large2x || photo.src.large || null });
}
