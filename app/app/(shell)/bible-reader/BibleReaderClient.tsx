"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { C } from "@/lib/app-content/theme";
import { BOOKS, SCRIPTURE_FINDER_VERSES, VERSES, type ScriptureFinderVerse } from "@/lib/app-content/bibleData";

const POSITION_KEY = "bibleReadingPosition";

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

const OT_BOOKS = BOOKS.filter((b) => b.t === "OT");
const NT_BOOKS = BOOKS.filter((b) => b.t === "NT");

const TOPIC_KEYWORDS: Record<string, string[]> = {
  love: ["love", "loved", "loving", "beloved", "charity"],
  faith: ["faith", "believe", "trust", "confidence"],
  peace: ["peace", "rest", "still", "calm", "quiet"],
  hope: ["hope", "wait", "faith", "anticipate"],
  prayer: ["prayer", "pray", "supplication", "ask"],
  forgiveness: ["forgive", "forgiveness", "pardon", "mercy"],
  strength: ["strength", "strong", "mighty", "power", "courage"],
  joy: ["joy", "rejoice", "glad", "joyful", "delight"],
  healing: ["heal", "healing", "healed", "health", "restore"],
  wisdom: ["wisdom", "wise", "understanding", "knowledge"],
  grace: ["grace", "mercy", "favor", "compassion", "lovingkindness"],
  fear: ["fear", "afraid", "dread", "dismayed", "anxious"],
};

type Verse = { n: number; t: string };
type Bookmark = { id: string; book: string; chapter: number; verse: number; verseText: string };

function VerseBlock({ verse, isFirst, fontSize, isBookmarked, isHighlighted, onBookmark }: {
  verse: Verse; isFirst: boolean; fontSize: number; isBookmarked: boolean; isHighlighted: boolean; onBookmark: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const text = verse.t ?? "";
  if (!text) return null;
  const dropCap = isFirst && text.length > 1 ? text[0] : null;
  const bodyText = isFirst && text.length > 1 ? text.slice(1) : text;

  return (
    <div
      data-verse={verse.n}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", marginBottom: isFirst ? 22 : 14, padding: "6px 8px 6px 4px", borderRadius: 8,
        transition: "background 0.35s",
        backgroundColor: isHighlighted ? "rgba(200,118,42,0.14)" : hovered ? "rgba(200,118,42,0.06)" : "transparent",
        borderLeft: isBookmarked ? `3px solid ${C.f1}` : "3px solid transparent",
      }}
    >
      <p style={{ margin: 0, fontSize, lineHeight: 2.05, color: "#2C1A0E", fontFamily: 'Georgia, "Times New Roman", serif', textAlign: "left" }}>
        <sup style={{ fontSize: Math.max(9, fontSize * 0.55), fontWeight: 700, color: C.f1, marginRight: 5, verticalAlign: "super", lineHeight: 0 }}>{verse.n}</sup>
        {dropCap && (
          <span style={{ float: "left", fontFamily: "Playfair Display, Georgia, serif", fontSize: fontSize * 3.1, lineHeight: 0.82, fontWeight: 700, color: C.f1, marginRight: 8, marginTop: 4, paddingRight: 2 }}>
            {dropCap}
          </span>
        )}
        {bodyText}
      </p>

      <div style={{ position: "absolute", top: 6, right: 4, display: "flex", gap: 4, opacity: hovered || isBookmarked ? 1 : 0.35, transition: "opacity 0.2s" }}>
        <button
          onClick={onBookmark}
          style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid #E5D4B8", cursor: "pointer", fontSize: 12 }}
          title={isBookmarked ? "Remove bookmark" : "Bookmark"}
        >
          {isBookmarked ? "🔖" : <span style={{ opacity: 0.4 }}>🔖</span>}
        </button>
      </div>
    </div>
  );
}

export default function BibleReaderClient() {
  const { uid } = useAuth();
  const searchParams = useSearchParams();

  const [book, setBook] = useState("John");
  const [ch, setCh] = useState(3);
  const [testament, setTestament] = useState<"OT" | "NT">("NT");
  const [expandedBook, setExpandedBook] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [fontSize, setFontSize] = useState(17);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [versesLoading, setVersesLoading] = useState(true);
  const [versesError, setVersesError] = useState(false);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  const [finderQuery, setFinderQuery] = useState("");
  const [finderResults, setFinderResults] = useState<ScriptureFinderVerse[]>([]);
  const [finderSearched, setFinderSearched] = useState(false);
  const [finderShowAll, setFinderShowAll] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentBook = BOOKS.find((b) => b.n === book);
  const totalChapters = currentBook?.c ?? 1;

  useEffect(() => {
    const qBook = searchParams.get("book");
    const qCh = parseInt(searchParams.get("ch") ?? "", 10);
    if (qBook && BOOKS.some((b) => b.n === qBook) && qCh > 0) {
      setBook(qBook);
      setCh(qCh);
      setTestament((BOOKS.find((b) => b.n === qBook)?.t as "OT" | "NT") ?? "NT");
      return;
    }
    const raw = lsGet(POSITION_KEY);
    if (!raw) return;
    try {
      const pos = JSON.parse(raw);
      setBook(pos.book);
      setCh(pos.chapter);
      setTestament((BOOKS.find((b) => b.n === pos.book)?.t as "OT" | "NT") ?? "NT");
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const qVerse = parseInt(searchParams.get("verse") ?? "", 10);
    if (!qVerse || versesLoading || verses.length === 0) return;
    setHighlightedVerse(qVerse);
    const t = setTimeout(() => setHighlightedVerse(null), 2200);
    const el = scrollRef.current?.querySelector(`[data-verse="${qVerse}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    return () => clearTimeout(t);
  }, [searchParams, versesLoading, verses]);

  useEffect(() => {
    setVerses([]);
    setVersesLoading(true);
    setVersesError(false);
    const encoded = encodeURIComponent(book);
    fetch(`https://bible-api.com/${encoded}+${ch}?translation=kjv`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.verses)) {
          setVerses(data.verses.map((v: { verse: number; text: string }) => ({ n: v.verse, t: v.text.replace(/\n/g, " ").trim() })));
        } else {
          const key = `${book}-${ch}`;
          const local = VERSES[key];
          if (local) setVerses(local); else setVersesError(true);
        }
      })
      .catch(() => {
        const key = `${book}-${ch}`;
        const local = VERSES[key];
        if (local) setVerses(local); else setVersesError(true);
      })
      .finally(() => setVersesLoading(false));
  }, [book, ch]);

  useEffect(() => {
    if (!uid || !db) return;
    const unsub = onSnapshot(collection(db, "users", uid, "bibleBookmarks"), (snap) => setBookmarks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Bookmark))), () => {});
    return unsub;
  }, [uid]);

  const bookmarkedVerseNums = useMemo(
    () => new Set(bookmarks.filter((b) => b.book === book && b.chapter === ch).map((b) => b.verse)),
    [bookmarks, book, ch]
  );

  const savePosition = (b: string, c: number) => lsSet(POSITION_KEY, JSON.stringify({ book: b, chapter: c, verse: 1, lastRead: new Date().toISOString() }));

  const navigate = (b: string, c: number) => {
    setBook(b);
    setCh(c);
    setExpandedBook("");
    setShowPicker(false);
    savePosition(b, c);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevChapter = () => {
    if (ch > 1) { navigate(book, ch - 1); return; }
    const idx = BOOKS.findIndex((b) => b.n === book);
    if (idx > 0) { const prev = BOOKS[idx - 1]; navigate(prev.n, prev.c); }
  };

  const nextChapter = () => {
    if (ch < totalChapters) { navigate(book, ch + 1); return; }
    const idx = BOOKS.findIndex((b) => b.n === book);
    if (idx < BOOKS.length - 1) navigate(BOOKS[idx + 1].n, 1);
  };

  const toggleBookmark = async (verseNum: number, verseText: string) => {
    if (!uid || !db) {
      alert("Sign in to save bookmarks — they appear in the sidebar.");
      return;
    }
    const existing = bookmarks.find((b) => b.book === book && b.chapter === ch && b.verse === verseNum);
    try {
      if (existing) {
        await deleteDoc(doc(db, "users", uid, "bibleBookmarks", existing.id));
      } else {
        await addDoc(collection(db, "users", uid, "bibleBookmarks"), { book, chapter: ch, verse: verseNum, verseText: verseText.slice(0, 200), note: "", createdAt: serverTimestamp(), color: "gold" });
        setHighlightedVerse(verseNum);
        setTimeout(() => setHighlightedVerse(null), 1200);
      }
    } catch {
      alert("Could not save bookmark. Check your connection and try again.");
    }
  };

  const runFinderSearch = () => {
    const q = finderQuery.trim().toLowerCase();
    if (!q) return;
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    const matchedTopics: string[] = [];
    for (const [topic, kws] of Object.entries(TOPIC_KEYWORDS)) {
      if (kws.some((kw) => q.includes(kw))) matchedTopics.push(topic);
    }
    const scored = SCRIPTURE_FINDER_VERSES.map((v) => {
      let score = 0;
      const hay = v.text.toLowerCase();
      for (const t of matchedTopics) { if (v.topics?.includes(t)) score += 3; }
      for (const w of words) { if (hay.includes(w)) score += 1; }
      return { v, score };
    });
    setFinderResults(scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 20).map((x) => x.v));
    setFinderSearched(true);
    setFinderShowAll(false);
  };

  const BookPicker = () => {
    const filtered = testament === "OT" ? OT_BOOKS : NT_BOOKS;
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.55)" }} onClick={() => setShowPicker(false)}>
        <div style={{ width: "100%", maxWidth: 560, backgroundColor: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "88vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "14px 20px 10px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: C.border, margin: "0 auto 14px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: C.text, margin: 0 }}>Choose Book</p>
              <button onClick={() => setShowPicker(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.hi, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer", fontSize: 13 }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 0, marginTop: 12, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
              {(["OT", "NT"] as const).map((tab) => (
                <button key={tab} onClick={() => setTestament(tab)} style={{ flex: 1, padding: "9px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", background: testament === tab ? `linear-gradient(135deg, ${C.f1}, ${C.f2})` : C.surface, color: testament === tab ? C.onPrimary : C.muted, border: "none" }}>
                  {tab === "OT" ? "Old Testament" : "New Testament"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.map((bk) => (
              <div key={bk.n}>
                <button onClick={() => setExpandedBook(expandedBook === bk.n ? "" : bk.n)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${C.border}`, background: "none", cursor: "pointer" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: book === bk.n ? C.f1 : C.text }}>{bk.n}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, color: C.dim }}>{bk.c} ch</span>
                    <span style={{ fontSize: 12, color: expandedBook === bk.n ? C.f1 : C.dim }}>{expandedBook === bk.n ? "▲" : "▼"}</span>
                  </div>
                </button>
                {expandedBook === bk.n && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 14px 14px", backgroundColor: C.hi }}>
                    {Array.from({ length: bk.c }, (_, i) => i + 1).map((n) => {
                      const isCurrent = book === bk.n && ch === n;
                      return (
                        <button key={n} onClick={() => navigate(bk.n, n)} style={{ minWidth: 36, height: 36, padding: "0 4px", borderRadius: 8, border: `2px solid ${isCurrent ? C.f1 : C.border}`, fontSize: 11, fontWeight: 700, cursor: "pointer", background: isCurrent ? `linear-gradient(135deg, ${C.f1}, ${C.f2})` : C.surface, color: isCurrent ? C.onPrimary : C.muted }}>
                          {n}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const BookmarkPanel = () => (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.55)" }} onClick={() => setShowBookmarks(false)}>
      <div style={{ width: "100%", maxWidth: 560, backgroundColor: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "70vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "14px 20px 12px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: C.border, margin: "0 auto 14px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: C.text, margin: 0 }}>🔖 Bookmarks</p>
            <button onClick={() => setShowBookmarks(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.hi, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer", fontSize: 13 }}>✕</button>
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px 24px" }}>
          {bookmarks.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 32 }}>
              <p style={{ fontSize: 32, margin: "0 0 12px" }}>🔖</p>
              <p style={{ fontSize: 14, color: C.muted }}>No bookmarks yet. Tap 🔖 next to any verse.</p>
            </div>
          ) : (
            [...bookmarks].sort((a, b) => a.book === book && a.chapter === ch ? -1 : 1).map((bm) => (
              <div key={bm.id} style={{ display: "flex", gap: 12, backgroundColor: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: 14, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.f1, margin: "0 0 4px" }}>{bm.book} {bm.chapter}:{bm.verse}</p>
                  <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>&ldquo;{bm.verseText}&rdquo;</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => { setShowBookmarks(false); navigate(bm.book, bm.chapter); }} style={{ padding: "5px 10px", borderRadius: 8, backgroundColor: C.hi2, border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 700, color: C.text, cursor: "pointer" }}>Go →</button>
                  <button onClick={() => uid && db && deleteDoc(doc(db, "users", uid, "bibleBookmarks", bm.id))} style={{ padding: "5px 8px", borderRadius: 8, backgroundColor: C.hi, border: `1px solid ${C.border}`, fontSize: 13, color: C.dim, cursor: "pointer" }}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const FinderPanel = () => (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", backgroundColor: "rgba(0,0,0,0.55)" }} onClick={() => setShowFinder(false)}>
      <div style={{ width: "100%", maxWidth: 480, maxHeight: "min(78vh, 620px)", backgroundColor: C.bg, borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: "0 20px 50px rgba(0,0,0,0.28)", display: "flex", flexDirection: "column", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 12px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <span style={{ fontSize: 17, color: C.f1 }}>🔍</span>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: C.text, margin: 0, flex: 1 }}>Scripture Finder</p>
          <button onClick={() => setShowFinder(false)} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: C.hi, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer", fontSize: 12 }}>✕</button>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <input autoFocus type="text" value={finderQuery} onChange={(e) => setFinderQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runFinderSearch()} placeholder="e.g. love, peace, do not fear" style={{ flex: 1, minWidth: 0, backgroundColor: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 11, padding: "10px 12px", color: C.text, fontSize: 13, outline: "none" }} />
          <button onClick={runFinderSearch} style={{ padding: "10px 16px", borderRadius: 11, flexShrink: 0, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none" }}>Find</button>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 14px 18px" }}>
          {!finderSearched && (
            <div style={{ textAlign: "center", paddingTop: 28, paddingBottom: 8 }}>
              <p style={{ fontSize: 28, margin: "0 0 10px" }}>📖</p>
              <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, color: C.text, margin: "0 0 6px" }}>Search the Scriptures</p>
              <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>Try &quot;anxiety&quot;, &quot;strength&quot;, &quot;forgiveness&quot;</p>
            </div>
          )}
          {finderSearched && finderResults.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: 28 }}>
              <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>No verses found. Try different words.</p>
            </div>
          )}
          {(finderShowAll ? finderResults : finderResults.slice(0, 10)).map((item) => (
            <div key={item.ref} style={{ backgroundColor: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 10 }}>
              {item.topics?.[0] && <span style={{ display: "inline-block", backgroundColor: C.hi2, color: C.f1, borderRadius: 7, padding: "2px 7px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{item.topics[0]}</span>}
              <p style={{ fontSize: 11, fontWeight: 700, color: C.f1, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: 0.8 }}>{item.ref}</p>
              <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, color: C.text, lineHeight: 1.65, margin: "0 0 10px" }}>&ldquo;{item.text}&rdquo;</p>
              <button onClick={() => { setShowFinder(false); navigate(item.book, item.chapter); }} style={{ padding: "5px 11px", borderRadius: 9, backgroundColor: C.hi2, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.text, cursor: "pointer" }}>
                Go to {item.book} {item.chapter} →
              </button>
            </div>
          ))}
          {!finderShowAll && finderResults.length > 10 && (
            <button onClick={() => setFinderShowAll(true)} style={{ width: "100%", padding: "10px 0", borderRadius: 12, border: `1.5px solid ${C.border}`, color: C.f1, fontWeight: 700, fontSize: 12, cursor: "pointer", background: "none" }}>
              Show {finderResults.length - 10} more results
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, minHeight: 0, backgroundColor: C.bg, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, backgroundColor: C.bg, borderBottom: `1px solid ${C.border}`, padding: "12px 20px 10px", flexShrink: 0 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "stretch", borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}`, backgroundColor: C.surface, flexShrink: 0 }}>
            <button onClick={prevChapter} disabled={book === BOOKS[0].n && ch === 1} style={{ width: 40, border: "none", backgroundColor: "transparent", color: C.text, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: book === BOOKS[0].n && ch === 1 ? 0.3 : 1, borderRight: `1px solid ${C.border}` }}>‹</button>
            <button onClick={() => setShowPicker(true)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${C.f1}12, ${C.f2}08)`, minWidth: 0 }}>
              <span style={{ fontSize: 15, lineHeight: 1 }}>📕</span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, minWidth: 0 }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: C.text, fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap" }}>{book}</span>
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 0.3 }}>Chapter {ch}</span>
              </span>
              <span style={{ color: C.f1, fontSize: 10, marginLeft: 4, flexShrink: 0 }}>▼</span>
            </button>
            <button onClick={nextChapter} disabled={book === BOOKS[BOOKS.length - 1].n && ch === totalChapters} style={{ width: 40, border: "none", backgroundColor: "transparent", color: C.text, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: book === BOOKS[BOOKS.length - 1].n && ch === totalChapters ? 0.3 : 1, borderLeft: `1px solid ${C.border}` }}>›</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 14, border: `1.5px solid ${C.border}`, backgroundColor: C.surface, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, paddingRight: 6, marginRight: 2, borderRight: `1px solid ${C.border}` }}>
              <button onClick={() => setFontSize((s) => Math.max(13, s - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "none", backgroundColor: "transparent", color: C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>A−</button>
              <span style={{ fontSize: 10, color: C.dim, fontWeight: 700, minWidth: 22, textAlign: "center" }}>{fontSize}</span>
              <button onClick={() => setFontSize((s) => Math.min(24, s + 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "none", backgroundColor: "transparent", color: C.muted, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>A+</button>
            </div>
            <button onClick={() => setShowFinder(true)} title="Scripture finder" style={{ width: 34, height: 34, borderRadius: 9, border: "none", backgroundColor: `${C.f1}14`, color: C.f1, cursor: "pointer", fontSize: 15 }}>🔍</button>
            <button onClick={() => setShowBookmarks(true)} title="Bookmarks" style={{ width: 34, height: 34, borderRadius: 9, border: "none", backgroundColor: "transparent", color: C.f1, cursor: "pointer", fontSize: 15 }}>🔖</button>
          </div>
        </div>
        <p style={{ maxWidth: 760, margin: "8px auto 0", width: "100%", textAlign: "center", fontSize: 10, color: C.dim, lineHeight: 1.4 }}>Hover a verse for 🔖 bookmark (saved to sidebar)</p>
      </div>

      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.hi} 100%)` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 20px 72px" }}>
          <div style={{ backgroundColor: "#FDF6EA", backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.03) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.03) 100%)", border: "1px solid #E5D4B8", borderRadius: 6, boxShadow: "0 8px 32px rgba(44,26,14,0.10), inset 0 0 60px rgba(255,255,255,0.55)", padding: "44px 48px 52px", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid #E5D4B8" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.f1, textTransform: "uppercase", letterSpacing: 3, margin: "0 0 10px" }}>{BOOKS.find((b) => b.n === book)?.t === "OT" ? "Old Testament" : "New Testament"}</p>
              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 32, color: "#2C1A0E", margin: "0 0 6px", fontWeight: 700, letterSpacing: "-0.02em" }}>{book}</h1>
              <p style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: "#6B5344", margin: "0 0 14px", fontStyle: "italic" }}>Chapter {ch}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ flex: 1, maxWidth: 80, height: 1, backgroundColor: C.f1, opacity: 0.35 }} />
                <span style={{ fontSize: 14, color: C.f1, opacity: 0.6 }}>✦</span>
                <div style={{ flex: 1, maxWidth: 80, height: 1, backgroundColor: C.f1, opacity: 0.35 }} />
              </div>
            </div>

            {versesLoading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 60 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, border: `3px solid ${C.f1}`, borderTopColor: "transparent", animation: "bspin 0.8s linear infinite" }} />
                <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>Loading {book} {ch}…</p>
                <style>{`@keyframes bspin { to { transform: rotate(360deg) } }`}</style>
              </div>
            )}

            {!versesLoading && versesError && (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <p style={{ fontSize: 32, margin: "0 0 12px" }}>📖</p>
                <p style={{ fontSize: 15, color: C.muted }}>Could not load this chapter. Check your connection and try again.</p>
              </div>
            )}

            {!versesLoading && !versesError && (
              <div style={{ position: "relative" }}>
                {verses.map((v, idx) => (
                  <VerseBlock
                    key={v.n}
                    verse={v}
                    isFirst={idx === 0}
                    fontSize={fontSize}
                    isBookmarked={bookmarkedVerseNums.has(v.n)}
                    isHighlighted={highlightedVerse === v.n}
                    onBookmark={() => toggleBookmark(v.n, v.t)}
                  />
                ))}
              </div>
            )}

            {!versesLoading && !versesError && verses.length > 0 && (
              <p style={{ textAlign: "center", fontSize: 10, color: "#9A8472", marginTop: 36, letterSpacing: 1.5, textTransform: "uppercase" }}>King James Version</p>
            )}

            {!versesLoading && !versesError && verses.length > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: "1px solid #E5D4B8" }}>
                <button onClick={prevChapter} disabled={book === BOOKS[0].n && ch === 1} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, backgroundColor: C.surface, border: `1.5px solid ${C.border}`, color: ch > 1 || book !== BOOKS[0].n ? C.text : C.dim, cursor: "pointer", fontWeight: 600, opacity: book === BOOKS[0].n && ch === 1 ? 0.3 : 1 }}>‹ Previous</button>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 13, color: C.muted, textAlign: "center" }}>{book} {ch}</span>
                <button onClick={nextChapter} disabled={book === BOOKS[BOOKS.length - 1].n && ch === totalChapters} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, border: "none", color: C.onPrimary, cursor: "pointer", fontWeight: 700, opacity: book === BOOKS[BOOKS.length - 1].n && ch === totalChapters ? 0.3 : 1 }}>Next ›</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPicker && <BookPicker />}
      {showBookmarks && <BookmarkPanel />}
      {showFinder && <FinderPanel />}
    </div>
  );
}
