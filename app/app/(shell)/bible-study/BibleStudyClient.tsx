"use client";

import { useEffect, useState } from "react";
import { C } from "@/lib/app-content/theme";
import { FAMILY_STUDIES } from "@/lib/app-content/familyStudies";

const PROGRESS_KEY = "faithspark_family_study_progress";
const TOTAL = 52;

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

export default function BibleStudyClient() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [view, setView] = useState<"grid" | "study">("grid");
  const [activeWeek, setActiveWeek] = useState(1);

  useEffect(() => {
    const raw = lsGet(PROGRESS_KEY);
    if (raw) try { setCompleted(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);

  const currentWeek = completed.length < TOTAL ? completed.length + 1 : TOTAL;
  const study = FAMILY_STUDIES.find((s) => s.week === activeWeek) ?? FAMILY_STUDIES[0];

  const openWeek = (week: number) => {
    setActiveWeek(week);
    setView("study");
    window.scrollTo(0, 0);
  };

  const markComplete = () => {
    if (completed.includes(activeWeek)) return;
    const updated = [...completed, activeWeek].sort((a, b) => a - b);
    setCompleted(updated);
    lsSet(PROGRESS_KEY, JSON.stringify(updated));
    const next = activeWeek + 1;
    if (next <= FAMILY_STUDIES.length) {
      if (window.confirm(`✅ Week ${activeWeek} complete!\n\nReady to start Week ${next}: "${FAMILY_STUDIES[next - 1]?.title}"?`)) {
        openWeek(next);
      } else {
        setView("grid");
      }
    } else {
      alert("🎉 You have completed all 52 family Bible studies! What a journey!");
      setView("grid");
    }
  };

  const shareStudy = () => {
    const msg = `📖 We're doing Week ${study.week} of the FaithSpark 52-Week Family Bible Study — "${study.title}" (${study.theme}). Join us! 🔥`;
    if (navigator.share) navigator.share({ text: msg }).catch(() => {});
    else navigator.clipboard.writeText(msg).then(() => alert("Copied to clipboard!"));
  };

  if (view === "study") {
    const isDone = completed.includes(activeWeek);

    return (
      <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.bg, position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setView("grid")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", cursor: "pointer", color: C.f1, fontSize: 14, fontWeight: 700 }}>← Back</button>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, color: C.text, margin: 0, flex: 1, textAlign: "center" }}>Family Bible Study</p>
          <button onClick={shareStudy} style={{ background: "none", cursor: "pointer", color: C.f1, fontSize: 13, fontWeight: 700 }}>Share</button>
        </div>

        <div className="fs-app-hero" style={{ height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 20px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,248,238,0.75)", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 6px" }}>Week {study.week} of 52</p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#fff", textAlign: "center", margin: "0 0 8px", lineHeight: 1.25 }}>{study.title}</h1>
          <span style={{ backgroundColor: "rgba(255,255,255,0.20)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#fff" }}>{study.theme}</span>
        </div>

        <div className="fs-content">
          <Section label="📜 Scripture">
            <p style={{ fontSize: 13, fontWeight: 700, color: C.f1, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 0.8 }}>{study.scripture}</p>
            <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 15, color: C.text, lineHeight: 1.8, margin: 0 }}>{study.scriptureText}</p>
          </Section>

          <Section label="📖 Introduction">
            <p style={{ fontSize: 15, color: C.text, lineHeight: 1.85, margin: 0, whiteSpace: "pre-wrap" }}>{study.introduction}</p>
          </Section>

          {study.questions?.length > 0 && (
            <Section label="💬 Discussion Questions">
              {study.questions.map((q, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < study.questions.length - 1 ? 16 : 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, marginTop: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.onPrimary }}>{i + 1}</span>
                  </div>
                  <p style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: C.text, lineHeight: 1.6, margin: 0, flex: 1 }}>{q}</p>
                </div>
              ))}
            </Section>
          )}

          {study.activity && (
            <Section label="🎯 Family Activity" accent={C.f1 + "18"} accentBorder={C.f1 + "44"}>
              <p style={{ fontSize: 15, color: C.text, lineHeight: 1.85, margin: 0 }}>{study.activity}</p>
            </Section>
          )}

          {study.memoryVerse && (
            <div style={{ backgroundColor: C.f1 + "14", border: `1.5px solid ${C.f1}44`, borderRadius: 16, padding: 20, marginTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 10px" }}>⭐ Memory Verse</p>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 17, color: C.f1, lineHeight: 1.7, textAlign: "center", margin: 0 }}>{study.memoryVerse}</p>
            </div>
          )}

          {study.closingPrayer && (
            <div style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 12px" }}>🙏 Closing Prayer</p>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 15, color: C.text, lineHeight: 1.8, margin: 0 }}>{study.closingPrayer}</p>
            </div>
          )}

          <div style={{ marginTop: 32 }}>
            {isDone ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "18px 0", borderRadius: 18, backgroundColor: C.green + "18", border: `2px solid ${C.green}` }}>
                <span style={{ fontSize: 24 }}>✅</span>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: C.green, margin: 0, fontWeight: 700 }}>Week {study.week} Complete!</p>
              </div>
            ) : (
              <button onClick={markComplete} style={{ width: "100%", padding: "18px 0", borderRadius: 18, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, fontWeight: 800, fontSize: 17, cursor: "pointer", border: "none", letterSpacing: 0.3 }}>
                Mark Week {study.week} Complete ✓
              </button>
            )}
            {!isDone && <p style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 10 }}>Complete this week to unlock Week {study.week + 1}</p>}
          </div>
        </div>
      </div>
    );
  }

  const COLS = 10;
  const pct = Math.round((completed.length / TOTAL) * 100);

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: "#fff", margin: "0 0 2px" }}>Family Bible Study</h1>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.88)", margin: 0 }}>52 Weeks Through the Bible Together</p>
      </div>

      <div className="fs-content" style={{ paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "stretch", marginBottom: 10, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px", backgroundColor: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: 0 }}>Progress</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.f1, margin: 0 }}>{completed.length}/{TOTAL} · {pct}%</p>
            </div>
            <div style={{ height: 6, backgroundColor: C.border, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: 6, borderRadius: 3, width: `${pct}%`, background: `linear-gradient(90deg, ${C.f1}, ${C.f2})` }} />
            </div>
          </div>
          <button onClick={() => openWeek(currentWeek)} style={{ flex: "1 1 220px", padding: "10px 14px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
            {completed.length === 0 ? "▶ Start Week 1" : `▶ Week ${currentWeek}`}
          </button>
        </div>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
          {[
            { color: C.green, label: "Done" },
            { color: C.f1, label: "Current", border: true },
            { color: C.border, label: "Next", border: true },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.border ? "transparent" : item.color + "33", border: `2px solid ${item.color}` }} />
              <span style={{ fontSize: 10, color: C.muted }}>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gap: 6 }}>
          {Array.from({ length: TOTAL }, (_, i) => i + 1).map((week) => {
            const done = completed.includes(week);
            const isCurrent = week === currentWeek;
            const weekStudy = FAMILY_STUDIES[week - 1];
            return (
              <button key={week} onClick={() => openWeek(week)} title={weekStudy?.title} style={{ height: 40, borderRadius: 8, border: `1.5px solid ${isCurrent ? C.f1 : done ? C.green : C.border}`, backgroundColor: done ? C.green + "18" : isCurrent ? C.hi2 : C.surface, color: done ? C.green : isCurrent ? C.f1 : C.dim, fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0 }}>
                {done ? "✓" : week}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Section({ label, children, accent, accentBorder }: { label: string; children: React.ReactNode; accent?: string; accentBorder?: string }) {
  return (
    <div style={{ backgroundColor: accent ?? C.surface, border: `1px solid ${accentBorder ?? C.border}`, borderRadius: 16, padding: "18px 20px", marginTop: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 12px" }}>{label}</p>
      {children}
    </div>
  );
}
