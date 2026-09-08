"use client";

import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/app-content/theme";
import { SCRIPTURE_FINDER_VERSES } from "@/lib/app-content/bibleData";

type Verse = { text: string; ref: string };

const TOPIC_SYNONYMS: Record<string, string[]> = {
  addiction: ["temptation", "freedom", "sin", "strength", "victory", "trust"],
  anxiety: ["peace", "worry", "trust", "fear", "rest", "comfort"],
  grief: ["comfort", "healing", "hope", "peace", "death"],
  fear: ["fear", "courage", "trust", "strength", "protection"],
  hope: ["hope", "trust", "faith", "encouragement", "promise"],
  peace: ["peace", "rest", "trust", "hope", "joy"],
  strength: ["strength", "courage", "trust", "faith", "victory"],
  love: ["love", "grace", "mercy", "compassion", "family"],
  prayer: ["prayer", "worship", "trust", "guidance", "hope"],
  healing: ["healing", "restoration", "hope", "trust", "comfort"],
};

const FALLBACK_VERSES: Verse[] = [
  { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.", ref: "Jeremiah 29:11" },
  { text: "The Lord is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
];

const PEXELS_KEYWORDS = [
  "golden sunrise", "mountain peak", "peaceful ocean", "forest light",
  "desert sky", "waterfall nature", "starry night", "flower field",
];

const AMBIENT_TRACKS = [
  { id: "piano", label: "Piano", emoji: "🎹", url: "https://mindgardenpress.com/audio/ambient-piano.mp3" },
  { id: "worship", label: "Worship", emoji: "✝️", url: "https://mindgardenpress.com/audio/ambient-worship.mp3" },
  { id: "rain", label: "Rain", emoji: "🌧️", url: "https://mindgardenpress.com/audio/ambient-rain.mp3" },
  { id: "ocean", label: "Ocean", emoji: "🌊", url: "https://mindgardenpress.com/audio/ambient-ocean.mp3" },
  { id: "nature", label: "Nature", emoji: "🍃", url: "https://mindgardenpress.com/audio/ambient-nature.mp3" },
  { id: "soft", label: "Soft", emoji: "✨", url: "https://mindgardenpress.com/audio/ambient-soft.mp3" },
];

const THEMES = [
  { id: "none", name: "None", grad: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.78))", textColor: "#FFFFFF", refColor: "rgba(255,255,255,0.85)" },
  { id: "flame", name: "Flame", grad: "linear-gradient(to bottom, rgba(26,8,0,0.25), rgba(122,45,0,0.75))", textColor: "#FFF8E8", refColor: "#E8943A" },
  { id: "ocean", name: "Ocean", grad: "linear-gradient(to bottom, rgba(2,13,26,0.25), rgba(14,61,110,0.75))", textColor: "#E8F4FF", refColor: "#4DA8FF" },
  { id: "forest", name: "Forest", grad: "linear-gradient(to bottom, rgba(2,15,5,0.25), rgba(26,64,32,0.75))", textColor: "#E8FFF0", refColor: "#7ED98B" },
  { id: "royal", name: "Royal", grad: "linear-gradient(to bottom, rgba(13,0,32,0.25), rgba(45,0,112,0.75))", textColor: "#F0E8FF", refColor: "#C77DFF" },
  { id: "dawn", name: "Dawn", grad: "linear-gradient(to bottom, rgba(26,5,16,0.25), rgba(77,21,53,0.75))", textColor: "#FFE8F0", refColor: "#F06CA0" },
];

const CANVAS_COLORS: Record<string, [string, string]> = {
  none: ["rgba(0,0,0,0.25)", "rgba(0,0,0,0.85)"],
  flame: ["rgba(26,8,0,0.35)", "rgba(122,45,0,0.82)"],
  ocean: ["rgba(2,13,26,0.35)", "rgba(14,61,110,0.82)"],
  forest: ["rgba(2,15,5,0.35)", "rgba(26,64,32,0.82)"],
  royal: ["rgba(13,0,32,0.35)", "rgba(45,0,112,0.82)"],
  dawn: ["rgba(26,5,16,0.35)", "rgba(77,21,53,0.82)"],
};

function runTopicSearch(query: string): Verse[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const matchedTopics = new Set<string>();
  for (const [word, topics] of Object.entries(TOPIC_SYNONYMS)) {
    if (q.includes(word)) topics.forEach((t) => matchedTopics.add(t.toLowerCase()));
  }
  const scored = SCRIPTURE_FINDER_VERSES.map((v) => {
    let score = 0;
    const hay = v.text.toLowerCase();
    for (const t of matchedTopics) {
      if (v.topics?.some((vt) => vt.toLowerCase() === t)) score += 3;
    }
    for (const w of words) {
      if (hay.includes(w)) score += 1;
    }
    return { v, score };
  });
  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => ({ text: x.v.text, ref: x.v.ref }));
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function renderCard({
  verses,
  bgUri,
  theme,
  format,
}: {
  verses: Verse[];
  bgUri: string | null;
  theme: (typeof THEMES)[number] & { canvasColors: [string, string] };
  format: string;
}) {
  const W = 1080;
  const H = format === "9:16" ? 1920 : 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  if (bgUri) {
    try {
      const img = await loadImage(bgUri);
      const scale = Math.max(W / img.width, H / img.height);
      const dw = img.width * scale, dh = img.height * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    } catch {
      ctx.fillStyle = "#1A1000";
      ctx.fillRect(0, 0, W, H);
    }
  } else {
    ctx.fillStyle = "#1A1000";
    ctx.fillRect(0, 0, W, H);
  }

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  const [c1, c2] = theme.canvasColors;
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  try {
    await document.fonts.load('italic 48px "Playfair Display"');
  } catch {}
  ctx.textAlign = "center";
  const maxWidth = W - 160;
  const verseBlocks = verses.slice(0, 5);
  const blockGap = 36;
  const fontSize = verseBlocks.length > 2 ? 40 : verseBlocks.length > 1 ? 46 : 52;
  const lineHeight = fontSize * 1.38;
  const refSize = Math.round(fontSize * 0.58);

  let totalH = 0;
  const layouts = verseBlocks.map((v) => {
    ctx.font = `italic ${fontSize}px "Playfair Display", Georgia, serif`;
    const lines = wrapLines(ctx, `"${v.text}"`, maxWidth);
    const blockH = lines.length * lineHeight + refSize + 20;
    totalH += blockH + blockGap;
    return { v, lines, blockH };
  });
  totalH -= blockGap;

  let y = H / 2 - totalH / 2 + lineHeight / 2;

  for (const { v, lines } of layouts) {
    ctx.fillStyle = theme.textColor;
    ctx.font = `italic ${fontSize}px "Playfair Display", Georgia, serif`;
    for (const line of lines) {
      ctx.fillText(line, W / 2, y);
      y += lineHeight;
    }
    ctx.font = `700 ${refSize}px Outfit, sans-serif`;
    ctx.fillStyle = theme.refColor;
    ctx.fillText(`— ${v.ref}`, W / 2, y + 8);
    y += refSize + blockGap;
  }

  ctx.font = "600 22px Outfit, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("FaithSpark", W / 2, H - 50);

  return canvas.toDataURL("image/png");
}

export default function ScriptureArtClient() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Verse[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([FALLBACK_VERSES[0]]);
  const [customText, setCustomText] = useState("");
  const [customRef, setCustomRef] = useState("");
  const [bgUri, setBgUri] = useState<string | null>(null);
  const [bgLoading, setBgLoading] = useState(false);
  const [themeId, setThemeId] = useState("flame");
  const [format, setFormat] = useState("1:1");
  const [downloading, setDownloading] = useState(false);
  const [ambientId, setAmbientId] = useState<string | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[1];
  const previewW = 280;
  const previewH = format === "9:16" ? Math.round((previewW * 16) / 9) : previewW;
  const displayVerses = selectedVerses.length ? selectedVerses : [FALLBACK_VERSES[0]];
  const primaryVerse = displayVerses[0];
  const cardFontSize = primaryVerse.text.length > 160 ? 12 : primaryVerse.text.length > 100 ? 14 : 16;

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAmbient = async (trackId: string) => {
    if (ambientId === trackId && musicPlaying) {
      audioRef.current?.pause();
      setMusicPlaying(false);
      return;
    }
    const track = AMBIENT_TRACKS.find((t) => t.id === trackId);
    if (!track) return;
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(track.url);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    setAmbientId(trackId);
    try {
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  };

  const search = () => {
    const found = runTopicSearch(query);
    setResults(found.length ? found : FALLBACK_VERSES);
    setSearched(true);
  };

  const toggleVerse = (v: Verse) => {
    setSelectedVerses((prev) => {
      const exists = prev.some((x) => x.ref === v.ref);
      if (exists) return prev.filter((x) => x.ref !== v.ref);
      if (prev.length >= 5) return prev;
      return [...prev, v];
    });
  };

  const addCustomVerse = () => {
    const text = customText.trim();
    const ref = customRef.trim() || "Custom";
    if (!text) return;
    const v = { text, ref };
    setSelectedVerses((prev) => {
      if (prev.length >= 5) return [v, ...prev.slice(0, 4)];
      return [v, ...prev.filter((x) => x.ref !== ref)];
    });
    setCustomText("");
    setCustomRef("");
  };

  const shuffleBackground = async () => {
    setBgLoading(true);
    const kw = PEXELS_KEYWORDS[Math.floor(Math.random() * PEXELS_KEYWORDS.length)];
    try {
      const res = await fetch(`/api/app/pexels?query=${encodeURIComponent(kw)}`);
      const data = await res.json();
      setBgUri(data.url ?? null);
    } catch {
      setBgUri(null);
    }
    setBgLoading(false);
  };

  const download = async () => {
    setDownloading(true);
    try {
      const dataUrl = await renderCard({
        verses: displayVerses,
        bgUri,
        theme: { ...theme, canvasColors: CANVAS_COLORS[theme.id] },
        format,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `faithspark-${displayVerses[0].ref.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;
      a.click();
    } catch (e) {
      alert("Could not generate image: " + (e as Error).message);
    }
    setDownloading(false);
  };

  const share = async () => {
    const text = displayVerses.map((v) => `"${v.text}" — ${v.ref}`).join("\n\n");
    if (navigator.share) {
      try {
        await navigator.share({ title: "FaithSpark Scripture Art", text });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(text);
      alert("Verse copied to clipboard!");
    } catch {
      alert(text);
    }
  };

  const labelStyle = { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" as const, letterSpacing: 1, margin: "0 0 8px" };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, padding: "24px 20px 60px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, color: C.text, margin: "0 0 4px", textAlign: "center" }}>Scripture Art</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px", textAlign: "center" }}>Create shareable verse cards — up to 5 verses, ambient music, and more</p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: previewW, minHeight: previewH, borderRadius: 20, overflow: "hidden", position: "relative",
              backgroundImage: bgUri ? `url(${bgUri})` : "none",
              backgroundColor: bgUri ? "transparent" : C.hi,
              backgroundSize: "cover", backgroundPosition: "center",
              border: `1px solid ${C.border}`,
              boxShadow: `0 10px 30px ${C.shadow}`,
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: theme.grad }} />
            <div style={{ position: "relative", minHeight: previewH, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px 40px" }}>
              <span style={{ position: "absolute", top: 12, left: 14, fontSize: 14, opacity: 0.85 }}>🔥</span>
              {displayVerses.map((v, i) => (
                <div key={v.ref + i} style={{ textAlign: "center", marginBottom: i < displayVerses.length - 1 ? 14 : 0, maxWidth: "100%" }}>
                  <p
                    style={{
                      fontFamily: "Playfair Display, serif", fontStyle: "italic",
                      fontSize: displayVerses.length > 1 ? Math.max(11, cardFontSize - 2) : cardFontSize,
                      color: theme.textColor, lineHeight: 1.45, margin: "0 0 6px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    &ldquo;{v.text}&rdquo;
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 11, color: theme.refColor, margin: 0 }}>— {v.ref}</p>
                </div>
              ))}
            </div>
            <p style={{ position: "relative", textAlign: "center", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.55)", margin: "0 0 8px" }}>FAITHSPARK.APP</p>
          </div>
        </div>

        <div className="fs-card" style={{ marginBottom: 16 }}>
          <p style={labelStyle}>Card Format</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["1:1", "9:16"].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${format === f ? C.f1 : C.border}`,
                  backgroundColor: format === f ? C.hi2 : C.surface, color: format === f ? C.f1 : C.muted,
                }}
              >
                {f === "1:1" ? "⬜ Square" : "📱 Story"}
              </button>
            ))}
          </div>
        </div>

        <div className="fs-card" style={{ marginBottom: 16 }}>
          <p style={labelStyle}>Background Image</p>
          <button onClick={shuffleBackground} disabled={bgLoading} className="fs-btn-primary" style={{ width: "100%", marginBottom: bgUri ? 12 : 0 }}>
            {bgLoading ? "Loading…" : bgUri ? "🔀 Shuffle Background" : "🖼 Pick a Background"}
          </button>
          {bgUri && (
            <div
              style={{
                height: 100, borderRadius: 12, overflow: "hidden",
                backgroundImage: `url(${bgUri})`, backgroundSize: "cover", backgroundPosition: "center",
                border: `1px solid ${C.border}`,
              }}
            />
          )}
        </div>

        <div className="fs-card" style={{ marginBottom: 16 }}>
          <p style={labelStyle}>Ambient Music</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {AMBIENT_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleAmbient(t.id)}
                style={{
                  padding: "7px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 700,
                  border: `1.5px solid ${ambientId === t.id && musicPlaying ? C.f1 : C.border}`,
                  backgroundColor: ambientId === t.id && musicPlaying ? C.hi2 : C.surface,
                  color: ambientId === t.id && musicPlaying ? C.f1 : C.muted,
                }}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="fs-card" style={{ marginBottom: 16 }}>
          <p style={labelStyle}>Card Theme</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                style={{
                  padding: "7px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 700,
                  border: `1.5px solid ${themeId === t.id ? C.f1 : C.border}`,
                  backgroundColor: themeId === t.id ? C.hi2 : C.surface, color: themeId === t.id ? C.f1 : C.muted,
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="fs-card" style={{ marginBottom: 16 }}>
          <p style={labelStyle}>Find Verses (select up to 5)</p>
          <div style={{ display: "flex", gap: 8, marginBottom: searched ? 12 : 0 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="anxiety, grief, strength, addiction…"
              className="fs-input"
              style={{ flex: 1, minWidth: 0 }}
            />
            <button onClick={search} className="fs-btn-primary" style={{ flexShrink: 0 }}>
              Find
            </button>
          </div>
          {searched &&
            results.map((v, i) => {
              const selected = selectedVerses.some((x) => x.ref === v.ref);
              return (
                <button
                  key={i}
                  onClick={() => toggleVerse(v)}
                  style={{
                    display: "block", width: "100%", textAlign: "left", cursor: "pointer", marginTop: 8,
                    padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${selected ? C.f1 : C.border}`,
                    backgroundColor: selected ? C.hi2 : C.surface, boxSizing: "border-box",
                  }}
                >
                  <p style={{ fontSize: 13, color: C.text, margin: "0 0 2px", lineHeight: 1.45 }}>&ldquo;{v.text}&rdquo;</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.f1, margin: 0 }}>
                    {selected ? "✓ " : ""}
                    {v.ref}
                  </p>
                </button>
              );
            })}
        </div>

        <div className="fs-card" style={{ marginBottom: 16 }}>
          <p style={labelStyle}>Custom Verse</p>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type your own verse text…"
            rows={3}
            className="fs-input"
            style={{ width: "100%", marginBottom: 8, resize: "none", boxSizing: "border-box" }}
          />
          <input
            type="text"
            value={customRef}
            onChange={(e) => setCustomRef(e.target.value)}
            placeholder="Reference (e.g. Psalm 23:1)"
            className="fs-input"
            style={{ width: "100%", marginBottom: 10, boxSizing: "border-box" }}
          />
          <button onClick={addCustomVerse} disabled={!customText.trim()} className="fs-btn-primary" style={{ width: "100%", opacity: customText.trim() ? 1 : 0.5 }}>
            Add Custom Verse
          </button>
        </div>

        {selectedVerses.length > 0 && (
          <p style={{ fontSize: 12, color: C.muted, textAlign: "center", margin: "0 0 12px" }}>
            {selectedVerses.length} verse{selectedVerses.length !== 1 ? "s" : ""} selected
          </p>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button onClick={share} className="fs-btn-primary" style={{ flex: 1 }}>
            ⬆ Share
          </button>
          <button onClick={download} disabled={downloading} className="fs-btn-primary" style={{ flex: 1, opacity: downloading ? 0.6 : 1 }}>
            {downloading ? "Generating…" : "⬇ Download"}
          </button>
        </div>
      </div>
    </div>
  );
}
