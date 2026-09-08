"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";
import { READING_PLANS, getTodaysDayForPlan, type ReadingPlan } from "@/lib/app-content/readingPlans";

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
const progressKey = (planId: string) => `faithspark_reading_plan_${planId}`;

type Progress = { startDate: string; completedDays: number[] };

function loadProgress(planId: string): Progress | null {
  const raw = lsGet(progressKey(planId));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function calcStreak(completedDays: number[], todayDay: number) {
  if (!completedDays?.length) return 0;
  const sorted = [...completedDays].sort((a, b) => b - a);
  if (sorted[0] !== todayDay && sorted[0] !== todayDay - 1) return 0;
  let streak = 0;
  let expected = sorted[0];
  for (const d of sorted) {
    if (d === expected) { streak++; expected--; } else break;
  }
  return streak;
}

export default function ReadingPlansClient() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, forceTick] = useState(0);

  const selectedPlan = READING_PLANS.find((p) => p.id === selectedId);

  if (selectedPlan) {
    return <PlanDetail plan={selectedPlan} onBack={() => setSelectedId(null)} onChanged={() => forceTick((t) => t + 1)} onGoToReader={(book, chapter) => router.push(`/app/bible-reader/?book=${encodeURIComponent(book)}&ch=${chapter}`)} />;
  }

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, color: "#fff", margin: "0 0 4px" }}>Reading Plans</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.88)", margin: 0 }}>Structured journeys through Scripture</p>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 60px" }}>
        {READING_PLANS.map((plan) => {
          const progress = loadProgress(plan.id);
          const started = !!progress;
          const todayDay = started ? getTodaysDayForPlan(progress.startDate, plan.duration) : 1;
          const pct = started ? Math.round(((progress.completedDays?.length ?? 0) / plan.duration) * 100) : 0;
          return (
            <button key={plan.id} onClick={() => setSelectedId(plan.id)} style={{ width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.border}`, backgroundColor: C.surface, borderRadius: 18, padding: 18, marginBottom: 14, display: "flex", gap: 16, alignItems: "flex-start", boxSizing: "border-box" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, flexShrink: 0, backgroundColor: plan.color + "22", border: `1.5px solid ${plan.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{plan.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: C.text, margin: "0 0 2px", lineHeight: 1.35 }}>{plan.title}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: plan.color, margin: "0 0 8px", lineHeight: 1.4 }}>{plan.subtitle}</p>
                <p style={{ fontSize: 13, color: C.muted, margin: "0 0 10px", lineHeight: 1.55 }}>{plan.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: C.dim }}>{plan.duration} days · ~{plan.estimatedMinutes} min/day</span>
                  {started && <span style={{ fontSize: 11, fontWeight: 700, color: plan.color }}>· Day {Math.min(todayDay, plan.duration)} · {pct}%</span>}
                </div>
                {started && (
                  <div style={{ height: 6, backgroundColor: C.border, borderRadius: 3, overflow: "hidden", marginTop: 8 }}>
                    <div style={{ height: 6, width: `${pct}%`, backgroundColor: plan.color, borderRadius: 3 }} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlanDetail({ plan, onBack, onChanged, onGoToReader }: { plan: ReadingPlan; onBack: () => void; onChanged: () => void; onGoToReader: (book: string, chapter: number) => void }) {
  const [progress, setProgress] = useState<Progress | null>(() => loadProgress(plan.id));
  const [viewDay, setViewDay] = useState<number | null>(null);

  useEffect(() => {
    if (!progress) {
      const fresh: Progress = { startDate: new Date().toISOString(), completedDays: [] };
      lsSet(progressKey(plan.id), JSON.stringify(fresh));
      setProgress(fresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!progress) return null;

  const todayDay = Math.min(getTodaysDayForPlan(progress.startDate, plan.duration), plan.duration);
  const completedCount = progress.completedDays.length;
  const streak = calcStreak(progress.completedDays, todayDay);
  const activeDay = plan.days.find((d) => d.day === (viewDay ?? todayDay)) ?? plan.days[0];
  const isActiveDayComplete = progress.completedDays.includes(activeDay.day);

  const markComplete = () => {
    if (progress.completedDays.includes(activeDay.day)) return;
    const updated = { ...progress, completedDays: [...progress.completedDays, activeDay.day].sort((a, b) => a - b) };
    lsSet(progressKey(plan.id), JSON.stringify(updated));
    setProgress(updated);
    onChanged();
  };

  const restart = () => {
    if (!window.confirm("Restart this plan from Day 1? Your progress will be cleared.")) return;
    const fresh: Progress = { startDate: new Date().toISOString(), completedDays: [] };
    lsSet(progressKey(plan.id), JSON.stringify(fresh));
    setProgress(fresh);
    setViewDay(null);
    onChanged();
  };

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.bg, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.f1, fontSize: 14, fontWeight: 700 }}>← Back</button>
        <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, color: C.text, margin: 0, flex: 1, textAlign: "center", minWidth: 0, lineHeight: 1.3, padding: "0 8px" }}>{plan.title}</p>
        <button onClick={restart} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim, fontSize: 12, fontWeight: 600 }}>Restart</button>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 60px" }}>
        <div style={{ backgroundColor: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: "16px 18px", marginBottom: 18, display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{ fontSize: 32 }}>{plan.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0 }}>{completedCount} / {plan.duration} days complete</p>
              {streak > 0 && <p style={{ fontSize: 13, fontWeight: 700, color: plan.color, margin: 0 }}>🔥 {streak} day streak</p>}
            </div>
            <div style={{ height: 7, backgroundColor: C.border, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: 7, width: `${Math.round((completedCount / plan.duration) * 100)}%`, backgroundColor: plan.color, borderRadius: 4 }} />
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: C.surface, borderRadius: 18, border: `1.5px solid ${plan.color}55`, padding: 20, marginBottom: 22 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 4px" }}>
            Day {activeDay.day} of {plan.duration}{activeDay.day === todayDay ? " · Today" : ""}
          </p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: C.text, margin: "0 0 14px", lineHeight: 1.3, wordBreak: "break-word" }}>{activeDay.title}</h2>

          <div style={{ marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {activeDay.passages.map((p, i) => (
              <button key={i} onClick={() => onGoToReader(p.book, p.chapter)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${plan.color}55`, backgroundColor: plan.color + "14", color: plan.color, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                📖 {p.book} {p.chapter}{p.verseStart ? `:${p.verseStart}${p.verseEnd && p.verseEnd !== p.verseStart ? "-" + p.verseEnd : ""}` : ""}
              </button>
            ))}
          </div>

          {activeDay.reflection && (
            <div style={{ backgroundColor: C.hi, borderLeft: `3px solid ${plan.color}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>💭 Reflection</p>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 14, color: C.text, margin: 0, lineHeight: 1.6 }}>{activeDay.reflection}</p>
            </div>
          )}

          {isActiveDayComplete ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0", borderRadius: 14, backgroundColor: C.green + "18", border: `2px solid ${C.green}` }}>
              <span style={{ fontSize: 18 }}>✅</span>
              <p style={{ fontWeight: 700, color: C.green, margin: 0 }}>Day {activeDay.day} Complete</p>
            </div>
          ) : (
            <button onClick={markComplete} style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`, color: "#fff", fontWeight: 800, fontSize: 15 }}>
              Mark Day {activeDay.day} Complete ✓
            </button>
          )}
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 12px" }}>All {plan.duration} Days</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {plan.days.map((d) => {
            const done = progress.completedDays.includes(d.day);
            const isCurrent = d.day === (viewDay ?? todayDay);
            return (
              <button key={d.day} onClick={() => setViewDay(d.day)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "10px 14px", borderRadius: 12, cursor: "pointer", border: `1.5px solid ${isCurrent ? plan.color : C.border}`, backgroundColor: isCurrent ? plan.color + "14" : C.surface, width: "100%", boxSizing: "border-box" }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: done ? C.green + "22" : C.hi, color: done ? C.green : C.dim, fontSize: 11, fontWeight: 800 }}>
                  {done ? "✓" : d.day}
                </div>
                <p style={{ fontSize: 13, color: C.text, margin: 0, flex: 1, minWidth: 0, lineHeight: 1.45 }}>{d.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
