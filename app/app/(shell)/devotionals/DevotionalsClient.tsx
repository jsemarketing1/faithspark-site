"use client";

import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { C } from "@/lib/app-content/theme";
import { fetchTodaysDevotional, getDayOfYear } from "@/lib/app-content/devotionals";

const STORAGE_KEY = "faithspark_saved_devotionals";
const TODAY_KEY = "faithspark_devotional_today_v2";
const HISTORY_KEY = "faithspark_devotional_history_v2";
const LENS_HISTORY_KEY = "faithspark_lens_history";
const DAILY_LIMIT = 2;

const ALL_LENSES = [
  "Grace in suffering", "Trusting God's timing", "Identity in Christ", "Courage under pressure",
  "Peace in chaos", "Gratitude in hardship", "God's faithfulness", "Surrendering control",
  "Strength in weakness", "Walking by faith not sight", "Forgiveness and release", "Purpose in pain",
  "Hope when hopeless", "God sees you", "Staying rooted", "Renewal of the mind",
  "Waiting on God", "Overcoming fear", "Community and belonging", "Answered prayer",
];

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

function pickLens(used: string[]) {
  const fresh = ALL_LENSES.filter((l) => !used.includes(l));
  const pool = fresh.length > 0 ? fresh : ALL_LENSES;
  return pool[Math.floor(Math.random() * pool.length)];
}
function extractTitle(t: string) { const m = t.match(/\*\*([^*]+)\*\*/); return m ? m[1].trim() : ""; }
function extractScripture(t: string) { const m = t.match(/\b([1-3]?\s?[A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\s+(\d+:\d+(?:[-–]\d+)?)/); return m ? m[0].trim() : ""; }

function renderInlineBold(text: string) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ color: C.f1, fontWeight: 700 }}>{part}</strong> : <span key={i}>{part}</span>
  );
}

function renderDevotional(text: string) {
  if (!text) return null;
  const paragraphs = text.split("\n\n").map((p) => p.trim()).filter(Boolean);
  return paragraphs.map((para, i) => {
    if (/^\*\*[^*]+\*\*$/.test(para)) {
      const title = para.replace(/\*\*/g, "");
      return (
        <p key={i} style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 18px", lineHeight: 1.3 }}>
          {title}
        </p>
      );
    }
    if (/^\*\*(Verse|Application|Prayer|Reflection):/i.test(para)) {
      const colonIdx = para.indexOf(":");
      const label = para.slice(2, colonIdx);
      const body = para.slice(colonIdx + 1).replace(/\*\*/g, "").trim();
      const icons: Record<string, string> = { Verse: "📖", Application: "✅", Prayer: "🙏", Reflection: "✨" };
      const icon = icons[label] || "•";
      return (
        <div key={i} style={{ backgroundColor: C.hi, borderLeft: `3px solid ${C.f1}`, borderRadius: 8, padding: "12px 14px", margin: "0 0 16px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.f1, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>
            {icon} {label}
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text, lineHeight: 1.75, margin: 0, fontStyle: label === "Verse" ? "italic" : "normal" }}>
            {body}
          </p>
        </div>
      );
    }
    return (
      <p key={i} style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.text, lineHeight: 1.87, margin: "0 0 16px" }}>
        {renderInlineBold(para)}
      </p>
    );
  });
}

// ─── View: Selector ───────────────────────────────────────────────────────
function Selector({ onPersonal, onDaily }: { onPersonal: () => void; onDaily: () => void }) {
  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-content" style={{ paddingTop: 0 }}>
        <div className="fs-app-hero" style={{ height: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 20px", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔥</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, color: "#fff", margin: "0 0 6px" }}>Today&apos;s Devotional</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: 0 }}>How would you like to start your day?</p>
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 18, textAlign: "center" }}>
          Choose your devotional
        </p>

        <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
          <button onClick={onPersonal} style={{ width: "100%", borderRadius: 20, border: "2px solid #C8762A", padding: "28px 26px", minHeight: 112, backgroundColor: C.surface, cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", boxShadow: "0 6px 20px rgba(200,118,42,0.20)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #C8762A, #F5B942)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(200,118,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 28 }}>🔥</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: C.text, margin: "0 0 6px", fontWeight: 700 }}>Personal Devotional</p>
                <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.5 }}>Generated just for you based on how you feel today</p>
              </div>
            </div>
          </button>

          <button onClick={onDaily} style={{ width: "100%", borderRadius: 20, border: "2px solid #4CAF50", padding: "28px 26px", minHeight: 112, backgroundColor: C.surface, cursor: "pointer", textAlign: "left", position: "relative", overflow: "hidden", boxShadow: "0 6px 20px rgba(76,175,80,0.14)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #4CAF50, #81C784)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(76,175,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 28 }}>📖</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: C.text, margin: "0 0 6px", fontWeight: 700 }}>Daily Devotional</p>
                <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.5 }}>A new Scripture-based devotional every day — always free</p>
              </div>
            </div>
            <span style={{ position: "absolute", top: 16, right: 18, backgroundColor: "#4CAF50", borderRadius: 20, padding: "4px 11px", fontSize: 11, fontWeight: 700, color: "#fff" }}>FREE</span>
          </button>
        </div>
      </div>
    </div>
  );
}

type DailyDevotional = { title: string; verse: string; scripture: string; content: string; reflection?: string; prayer?: string };

// ─── View: Daily Devotional ─────────────────────────────────────────────
function DailyDevotionalView({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setDevotional(null);
    try {
      const data = await fetchTodaysDevotional();
      setDevotional(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleShare = () => {
    if (!devotional) return;
    const text = `${devotional.title}\n\n"${devotional.verse}"\n— ${devotional.scripture}\n\n${devotional.content}`;
    if (navigator.share) navigator.share({ title: devotional.title, text }).catch(() => {});
    else navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 160, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "#fff" }}>←</button>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, color: "#fff", margin: 0 }}>Daily Devotional</p>
          {devotional
            ? <button onClick={handleShare} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15, color: "#fff" }}>⬆</button>
            : <div style={{ width: 38 }} />}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, textAlign: "center", padding: "0 20px 18px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 4px" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: "#fff", margin: 0, lineHeight: 1.3 }}>{devotional?.title || "Daily Devotional"}</p>
        </div>
      </div>

      <div className="fs-content" style={{ maxWidth: 620, paddingTop: 24 }}>
        {status === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingTop: 40 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, border: `3px solid ${C.f1}`, borderTopColor: "transparent", animation: "dspin 0.8s linear infinite" }} />
            <p style={{ color: C.f1, fontSize: 14, margin: 0 }}>Loading today&apos;s devotional…</p>
            <style>{`@keyframes dspin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {status === "error" && (
          <div style={{ textAlign: "center", paddingTop: 32 }}>
            <p style={{ fontSize: 36, margin: "0 0 14px" }}>📖</p>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: C.text, margin: "0 0 10px" }}>Coming Soon</p>
            <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px", lineHeight: 1.6 }}>Check back soon — devotionals coming shortly!</p>
            <button onClick={load} className="fs-btn-primary">Try Again</button>
          </div>
        )}

        {status === "success" && devotional && (
          <>
            <p style={{ fontWeight: 700, fontSize: 12, color: C.f1, letterSpacing: 1.2, textTransform: "uppercase", textAlign: "center", margin: "0 0 12px" }}>{devotional.scripture}</p>
            <div style={{ borderLeft: `3px solid ${C.f1}`, paddingLeft: 16, paddingTop: 10, paddingBottom: 10, marginBottom: 22, backgroundColor: C.hi, borderRadius: 6 }}>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 16, color: C.text, lineHeight: 1.8, margin: 0 }}>&ldquo;{devotional.verse}&rdquo;</p>
            </div>
            <div style={{ height: 1, backgroundColor: C.border, margin: "0 8px 22px" }} />
            <p style={{ fontSize: 16, color: C.text, lineHeight: 1.8, margin: "0 0 20px" }}>{devotional.content}</p>
            {devotional.reflection && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "24px 0 10px" }}>
                  <span style={{ fontSize: 18 }}>✨</span>
                  <p style={{ fontWeight: 700, fontSize: 13, color: C.text, letterSpacing: 0.5, textTransform: "uppercase", margin: 0 }}>Reflection</p>
                </div>
                <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 15, color: C.f1, lineHeight: 1.75, margin: 0 }}>{devotional.reflection}</p>
              </>
            )}
            {devotional.prayer && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "24px 0 10px" }}>
                  <span style={{ fontSize: 18 }}>🙏</span>
                  <p style={{ fontWeight: 700, fontSize: 13, color: C.text, letterSpacing: 0.5, textTransform: "uppercase", margin: 0 }}>Prayer</p>
                </div>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.75, margin: 0 }}>{devotional.prayer}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

type SavedDevotional = { id: string; date: string; feeling: string; text: string };

// ─── View: Personal AI Devotional ───────────────────────────────────────
function PersonalDevotionalView({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const { profile } = useProfile();

  const [feeling, setFeeling] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [text, setText] = useState("");
  const [dots, setDots] = useState(0);
  const [saved, setSaved] = useState<SavedDevotional[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [genError, setGenError] = useState("");

  useEffect(() => {
    if (status !== "loading") return;
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    const raw = lsGet(STORAGE_KEY);
    if (raw) setSaved(JSON.parse(raw));

    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const raw2 = lsGet(TODAY_KEY);
    if (!raw2) return;
    try {
      const stored = JSON.parse(raw2);
      if (stored.date !== today || !stored.entries?.length) return;
      const latest = stored.entries[stored.entries.length - 1];
      setFeeling(latest.feeling);
      setText(latest.text);
      setStatus("done");
      setDailyCount(stored.entries.length);
    } catch { /* ignore malformed cache */ }
  }, []);

  const saveDevotion = async () => {
    const entry: SavedDevotional = { id: Date.now().toString(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), feeling: feeling.trim(), text };
    const updated = [entry, ...saved];
    setSaved(updated);
    setJustSaved(true);
    lsSet(STORAGE_KEY, JSON.stringify(updated));
    setTimeout(() => setJustSaved(false), 2000);
  };

  const deleteSaved = (id: string) => {
    const u = saved.filter((d) => d.id !== id);
    setSaved(u);
    lsSet(STORAGE_KEY, JSON.stringify(u));
  };

  const generate = async () => {
    if (!feeling.trim() || dailyCount >= DAILY_LIMIT) return;
    setStatus("loading");
    setText("");
    setGenError("");

    const todayShort = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    let history: { scripture?: string }[] = [];
    let usedLenses: string[] = [];
    try { const r = lsGet(HISTORY_KEY); if (r) history = JSON.parse(r); } catch { /* ignore */ }
    try { const r = lsGet(LENS_HISTORY_KEY); if (r) usedLenses = JSON.parse(r); } catch { /* ignore */ }

    const lens = pickLens(usedLenses);
    const recentScriptures = history.slice(0, 30).map((h) => h.scripture).filter((s): s is string => Boolean(s));
    const firstName = profile?.name?.split(" ")[0] || "friend";
    const profileCtx = [
      profile?.name && `Name: ${profile.name}`,
      profile?.gender && `Gender: ${profile.gender}`,
      profile?.ageRange && `Age range: ${profile.ageRange}`,
      profile?.season && `Life season: ${profile.season}`,
      profile?.struggles?.length && `Current struggles: ${profile.struggles.join(", ")}`,
      profile?.faith && `Faith stage: ${profile.faith}`,
    ].filter(Boolean).join("\n");

    let generatedText = "";
    try {
      const res = await fetch("/api/app/devotional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling: feeling.trim(), firstName, profileCtx, recentScriptures, lens }),
      });
      const data = await res.json();
      generatedText = data.text ?? "";
    } catch {
      setGenError("Something went wrong generating your devotional. Please try again.");
    }

    if (!generatedText) { setStatus("idle"); return; }
    setText(generatedText);

    const title = extractTitle(generatedText);
    const scripture = extractScripture(generatedText);
    const todayEntry = { id: Date.now().toString(), date: todayShort, feeling: feeling.trim(), text: generatedText };
    let todayStored: { date: string; entries: typeof todayEntry[] } = { date: todayShort, entries: [] };
    try { const r = lsGet(TODAY_KEY); if (r) { const p = JSON.parse(r); if (p.date === todayShort) todayStored = p; } } catch { /* ignore */ }
    const newEntries = [...(todayStored.entries ?? []), todayEntry];
    lsSet(TODAY_KEY, JSON.stringify({ date: todayShort, entries: newEntries }));
    lsSet(HISTORY_KEY, JSON.stringify([{ date: todayShort, feeling: feeling.trim(), title, scripture, theme: title, lens }, ...history].slice(0, 30)));
    lsSet(LENS_HISTORY_KEY, JSON.stringify([lens, ...usedLenses.filter((l) => l !== lens)].slice(0, 10)));

    if (user?.uid && db) {
      addDoc(collection(db, "devotionals"), { userId: user.uid, date: todayShort, feeling: feeling.trim(), scripture, lens, title, text: generatedText, createdAt: serverTimestamp() }).catch(() => {});
    }
    setDailyCount(newEntries.length);
    setStatus("done");
  };

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 160, position: "relative" }}>
        <div style={{ position: "absolute", top: 12, left: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(0,0,0,0.28)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "#fff" }}>←</button>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Devotional Menu</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, textAlign: "center", padding: "0 20px 18px" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#fff", margin: "0 0 4px" }}>Personal Devotional</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.80)", margin: 0 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="fs-content" style={{ maxWidth: 620, paddingTop: 24 }}>
        {status !== "done" && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.muted, letterSpacing: 1, textTransform: "uppercase", textAlign: "center", margin: "0 0 12px" }}>How are you feeling today?</p>
            <textarea
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              rows={6}
              placeholder={"Tell Spark how you feel today…\n\ne.g. I'm feeling overwhelmed and exhausted. I've been carrying a lot and I need God to remind me He's still here."}
              className="fs-input"
              style={{ fontFamily: "Georgia, serif", lineHeight: 1.75, resize: "none" }}
            />
          </div>
        )}

        {status === "idle" && (
          <>
            <button onClick={generate} disabled={!feeling.trim()} className="fs-btn-primary" style={{ width: "100%" }}>
              {feeling.trim() ? "Generate My Personal Devotional" : "Share How You Feel Above"}
            </button>
            {genError && <p style={{ fontSize: 13, color: C.red, textAlign: "center", marginTop: 10 }}>{genError}</p>}
          </>
        )}

        {status === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: 16 }}>
            <span style={{ fontSize: 52, animation: "fspulse 1.5s ease-in-out infinite" }}>🔥</span>
            <p style={{ fontWeight: 700, color: C.f1, margin: 0 }}>{"Crafting your devotional" + ".".repeat(dots + 1)}</p>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Just a moment…</p>
            <style>{`@keyframes fspulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }`}</style>
          </div>
        )}

        {status === "done" && text && (
          <div>
            <span style={{ display: "inline-block", backgroundColor: C.hi2, color: C.f1, border: `1px solid ${C.border}`, borderRadius: 10, padding: "3px 12px", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>Today&apos;s devotional</span>
            <div style={{ backgroundColor: C.surface, borderRadius: 20, padding: "26px 26px 10px", marginBottom: 16, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.f1}, ${C.f3})` }} />
              <div style={{ paddingTop: 6 }}>{renderDevotional(text)}</div>
            </div>
            <button onClick={justSaved ? undefined : saveDevotion} className="fs-btn-primary" style={{ width: "100%", marginBottom: 12, background: justSaved ? C.green : undefined }}>
              {justSaved ? "✓ Saved!" : "Save This Devotional"}
            </button>
            {dailyCount >= DAILY_LIMIT ? (
              <div className="fs-surface" style={{ padding: 14, textAlign: "center" }}>
                <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>You&apos;ve used both devotionals today. Come back tomorrow 🌅</p>
              </div>
            ) : (
              <div>
                <div style={{ borderRadius: 12, padding: "10px 14px", textAlign: "center", border: `1px solid ${C.f1}55`, marginBottom: 10 }}>
                  <p style={{ fontSize: 13, color: C.f1, margin: 0 }}>1 devotional remaining today</p>
                </div>
                <button onClick={() => { setStatus("idle"); setFeeling(""); setText(""); setJustSaved(false); }} className="fs-btn-primary" style={{ width: "100%" }}>
                  Generate Another Devotional
                </button>
              </div>
            )}
          </div>
        )}

        {saved.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: C.text, margin: "0 0 14px" }}>📚 Saved Devotionals</p>
            {saved.map((d) => (
              <div key={d.id} className="fs-surface" style={{ marginBottom: 12, overflow: "hidden" }}>
                <button style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: 16, background: "none", cursor: "pointer", textAlign: "left" }} onClick={() => setExpanded(expanded === d.id ? null : d.id)}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.f1, margin: "0 0 4px" }}>{d.date}</p>
                    <p style={{ fontSize: 13, color: C.text, lineHeight: 1.5, margin: 0 }}>{d.feeling}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: C.muted }}>{expanded === d.id ? "▲" : "▼"}</span>
                    <button onClick={(e) => { e.stopPropagation(); deleteSaved(d.id); }} style={{ fontSize: 13, color: C.dim, background: "none", cursor: "pointer", padding: 0 }}>✕</button>
                  </div>
                </button>
                {expanded === d.id && (
                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ height: 1, backgroundColor: C.border, marginBottom: 12 }} />
                    <div style={{ fontSize: 14 }}>{renderDevotional(d.text)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────
export default function DevotionalsClient() {
  const [view, setView] = useState<"selector" | "personal" | "daily">("selector");

  if (view === "daily") return <DailyDevotionalView onBack={() => setView("selector")} />;
  if (view === "personal") return <PersonalDevotionalView onBack={() => setView("selector")} />;
  return <Selector onPersonal={() => setView("personal")} onDaily={() => setView("daily")} />;
}
