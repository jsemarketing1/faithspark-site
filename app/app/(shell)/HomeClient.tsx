"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { C } from "@/lib/app-content/theme";
import { getVerseForTags, getGreetingForTags } from "@/lib/app-content/taggedVerses";
import { ProgressModal, READING_PROGRESS_KEY } from "@/components/app/ProgressModal";

const QUICK_ACTIONS = [
  { icon: "📖", label: "Devotionals", to: "/app/devotionals/", live: true },
  { icon: "📕", label: "Bible Reader", to: "/app/bible-reader/", live: true },
  { icon: "🗺️", label: "Reading Plans", to: "/app/reading-plans/", live: true },
  { icon: "🙏", label: "Prayer Board", to: "/app/prayer-board/", live: true },
  { icon: "📝", label: "Journal", to: "/app/journal/", live: true },
  { icon: "👨‍👩‍👧", label: "Bible Study", to: "/app/bible-study/", live: true },
  { icon: "🎨", label: "Scripture Art", to: "/app/scripture-art/", live: true },
  { icon: "🎮", label: "Games", to: "/app/games/", live: true },
  { icon: "🌍", label: "Explore", to: "/app/explore/", live: false },
];

const FREE_WEB_FEATURES = ["Bible Reader", "Daily Devotionals", "Personal Devotionals"];
const PREMIUM_APP_FEATURES = [
  { icon: "🔥", title: "Talk to Spark", desc: "Unlimited AI conversations with your personal faith companion" },
  { icon: "📷", title: "Bible Scanner", desc: "Photograph any Bible page and get instant verse insights" },
  { icon: "✨", title: "Verse Insights", desc: "Deep AI breakdowns of meaning, context, and application" },
  { icon: "🙏", title: "Guided Prayer", desc: "Step-by-step prayer sessions for morning and evening" },
  { icon: "🌙", title: "Sleep Stories", desc: "Calming, faith-based stories to end your day in peace" },
];

const APP_STORE_URL = "https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share";

function todayStr() { return new Date().toISOString().slice(0, 10); }
function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }

export default function HomeClient() {
  const { user } = useAuth();
  const { profile } = useProfile();

  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good Morning" : hr < 17 ? "Good Afternoon" : "Good Evening";
  const firstName = profile?.firstName || profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || "Friend";
  const formattedDate = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

  const tags = profile?.tags;
  const dailyVerse = useMemo(() => getVerseForTags(tags, dayOfYear), [tags, dayOfYear]);
  const personalGreeting = useMemo(() => getGreetingForTags(tags), [tags]);

  const [geminiVerse, setGeminiVerse] = useState<{ verse: string; ref: string } | null>(null);
  useEffect(() => {
    fetch("/api/app/verse")
      .then((r) => (r.ok ? r.json() : null))
      .then((v) => { if (v?.verse) setGeminiVerse(v); })
      .catch(() => {});
  }, []);

  const [streak, setStreak] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const raw = lsGet(READING_PROGRESS_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      setStreak(p.streak ?? 0);
    }
  }, []);

  const [firestoreDay, setFirestoreDay] = useState(1);
  const [firestoreCompletedToday, setFirestoreCompletedToday] = useState(false);
  const [marking, setMarking] = useState(false);
  const [markError, setMarkError] = useState("");

  useEffect(() => {
    if (!user || !db) return;
    const ref = doc(db, "users", user.uid, "progress", "reading");
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setFirestoreDay(d.day ?? 1);
        setFirestoreCompletedToday(d.lastCompleted === todayStr());
      } else {
        setDoc(ref, { day: 1, lastCompleted: "" }, { merge: true }).catch(() => {});
      }
    }).catch(() => {});
  }, [user]);

  const markComplete = async () => {
    if (!user || !db || firestoreCompletedToday || marking) return;
    setMarking(true);
    setMarkError("");
    try {
      const nextDay = firestoreDay + 1;
      const ref = doc(db, "users", user.uid, "progress", "reading");
      await setDoc(ref, { day: nextDay, lastCompleted: todayStr() }, { merge: true });
      setFirestoreDay(nextDay);
      setFirestoreCompletedToday(true);
    } catch {
      setMarkError("Could not save — check your connection.");
    } finally {
      setMarking(false);
    }
  };

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 150, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ padding: "0 24px 22px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 3, fontWeight: 500 }}>{greet}</p>
              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 34, color: "#fff", marginBottom: 4, fontWeight: 700, letterSpacing: "-0.4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {firstName}
              </h1>
              <p style={{ fontSize: 14.5, color: "rgba(255,235,195,0.9)", margin: 0 }}>{personalGreeting}</p>
            </div>
            <button onClick={() => setShowProgress(true)} className="fs-badge">🔥 {streak} day streak</button>
          </div>
        </div>
      </div>

      <div className="fs-content">
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 12, color: C.dim, margin: "0 0 4px" }}>{formattedDate}</p>
          <p className="fs-section-title" style={{ marginBottom: 0 }}>Today</p>
        </div>

        {/* Free vs Premium */}
        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="fs-card" style={{ background: `linear-gradient(135deg, ${C.green}14, ${C.green}06)`, border: `1.5px solid ${C.green}44` }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, backgroundColor: `${C.green}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✅</div>
              <div>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 19, color: C.text, margin: "0 0 5px", fontWeight: 700 }}>Free on the Web</p>
                <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.55 }}>Use FaithSpark online at no cost. No subscription needed for anything on this site.</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FREE_WEB_FEATURES.map((label) => (
                <span key={label} style={{ fontSize: 12, fontWeight: 600, color: C.text, backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 12px" }}>{label}</span>
              ))}
            </div>
          </div>

          <div className="fs-card" style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.f1}20, ${C.f2}0a)`, border: `1.5px solid ${C.f1}55` }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.f1}, ${C.f3})` }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⭐</div>
              <div>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 19, color: C.text, margin: "0 0 5px", fontWeight: 700 }}>Premium — Mobile App Only</p>
                <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.55 }}>A few AI-powered features require a subscription in the FaithSpark app. Download the app to upgrade — everything else stays free.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 18 }}>
              {PREMIUM_APP_FEATURES.map(({ icon, title, desc }) => (
                <div key={title} style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: C.text }}><span style={{ marginRight: 6 }}>{icon}</span>{title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: C.muted, lineHeight: 1.45 }}>{desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: C.f1, textDecoration: "none" }}>App Store</a>
              <span style={{ color: C.dim, fontSize: 12 }}>·</span>
              <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: C.f1, textDecoration: "none" }}>Google Play</a>
            </div>
          </div>
        </div>

        {/* Verse of the Day */}
        <div className="fs-app-hero" style={{ height: 170, marginBottom: 20, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 13 }}>✨</span>
            <p style={{ marginBottom: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>Verse of the Day</p>
          </div>
          <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.95)", margin: "0 0 10px" }}>
            &ldquo;{geminiVerse?.verse ?? dailyVerse?.text ?? ""}&rdquo;
          </p>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: C.f2, margin: 0 }}>— {geminiVerse?.ref ?? dailyVerse?.ref ?? ""}</p>
        </div>

        {/* Reading tracker */}
        <div className="fs-card" style={{ marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15.5, color: C.text, marginBottom: 2 }}>Bible Reading — Day {firestoreDay}</p>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{firestoreCompletedToday ? "You've read today. Great job!" : "Mark today's reading complete when you're done."}</p>
            {markError && <p style={{ fontSize: 12, color: C.red, margin: "4px 0 0" }}>{markError}</p>}
          </div>
          <button onClick={markComplete} disabled={!user || firestoreCompletedToday || marking} className="fs-btn-primary" style={{ opacity: !user || firestoreCompletedToday ? 0.6 : 1 }}>
            {firestoreCompletedToday ? "✓ Done Today" : marking ? "Saving…" : "Mark Complete"}
          </button>
        </div>

        {/* Quick navigation */}
        <div style={{ marginBottom: 30 }}>
          <p className="fs-section-title">Quick Actions</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {QUICK_ACTIONS.map((a) =>
              a.live ? (
                <Link key={a.to} href={a.to} className="fs-pill">
                  <span style={{ fontSize: 15 }}>{a.icon}</span>
                  {a.label}
                </Link>
              ) : (
                <span key={a.to} className="fs-pill fs-pill-soon">
                  <span style={{ fontSize: 15 }}>{a.icon}</span>
                  {a.label}
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: C.dim }}>Soon</span>
                </span>
              )
            )}
          </div>
        </div>

        {/* Mobile App promo */}
        <div style={{ borderRadius: 22, padding: "32px 28px", background: `linear-gradient(145deg, ${C.f1}12, ${C.f2}08)`, border: `1px solid ${C.f1}22` }}>
          <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📱</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 21, color: C.text, marginBottom: 8 }}>Take FaithSpark on the go</h2>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.55, marginBottom: 18 }}>Daily verses, voice chat with Spark, and your full library — built for real life.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "#111", borderRadius: 11, padding: "9px 16px", textDecoration: "none", fontSize: 13, fontWeight: 600, boxShadow: "0 3px 10px rgba(0,0,0,0.14)" }}>
                <span>🍎</span><span>App Store</span>
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 11, padding: "9px 16px", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                <span>▶︎</span><span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ProgressModal visible={showProgress} onClose={() => { setShowProgress(false); const raw = lsGet(READING_PROGRESS_KEY); if (raw) { const p = JSON.parse(raw); setStreak(p.streak ?? 0); } }} />
    </div>
  );
}
