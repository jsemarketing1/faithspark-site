"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { C } from "@/lib/app-content/theme";

export const READING_PROGRESS_KEY = "faithspark_reading_progress";

const PLAN_TROPHIES: Record<string, { day: number; name: string; icon: string }[]> = {
  "30": [
    { day: 1, name: "First Spark", icon: "🥉" },
    { day: 15, name: "Halfway Home", icon: "🥈" },
    { day: 30, name: "30-Day Champion", icon: "🏆" },
  ],
  "90": [
    { day: 1, name: "First Spark", icon: "🥉" },
    { day: 30, name: "One Month Strong", icon: "🥈" },
    { day: 60, name: "Two Months of Faith", icon: "🥇" },
    { day: 90, name: "90-Day Warrior", icon: "🏆" },
  ],
  "365": [
    { day: 1, name: "First Spark", icon: "🥉" },
    { day: 183, name: "Halfway Through the Year", icon: "🥈" },
    { day: 365, name: "Year of Faith Champion", icon: "🏆" },
  ],
};

function lsGet(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
function lsSet(key: string, val: string) { try { localStorage.setItem(key, val); } catch { /* ignore */ } }

type Progress = { currentDay: number; streak: number; startDate: string; lastOpened: string; trophyDates: Record<string, string> };

export function ProgressModal({ visible, onClose, planKey = "30" }: { visible: boolean; onClose: () => void; planKey?: string }) {
  const planTotal = parseInt(planKey, 10);
  const trophies = useMemo(() => PLAN_TROPHIES[planKey] ?? PLAN_TROPHIES["30"], [planKey]);

  const today = new Date().toDateString();
  const todayStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const defaultProgress = useMemo<Progress>(() => ({ currentDay: 1, streak: 1, startDate: new Date().toISOString(), lastOpened: today, trophyDates: { "1": todayStr } }), [today, todayStr]);

  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [newTrophy, setNewTrophy] = useState<{ day: number; name: string; icon: string } | null>(null);

  const loadProgress = useCallback(async () => {
    try {
      const raw = lsGet(READING_PROGRESS_KEY);
      if (!raw) {
        const initial = { ...defaultProgress, lastOpened: today };
        setProgress(initial);
        lsSet(READING_PROGRESS_KEY, JSON.stringify(initial));
        return null;
      }
      const p: Progress = JSON.parse(raw);
      if (p.lastOpened !== today) {
        const nextDay = Math.min(p.currentDay + 1, planTotal);
        const updated = { ...p, currentDay: nextDay, streak: p.streak + 1, lastOpened: today };
        const earned = trophies.find((t) => t.day === nextDay && !p.trophyDates[String(t.day)]);
        if (earned) updated.trophyDates = { ...updated.trophyDates, [String(earned.day)]: todayStr };
        setProgress(updated);
        lsSet(READING_PROGRESS_KEY, JSON.stringify(updated));
        return earned ?? null;
      }
      setProgress(p);
      return null;
    } catch { return null; }
  }, [defaultProgress, today, todayStr, planTotal, trophies]);

  useEffect(() => {
    if (!visible) return;
    loadProgress().then((trophy) => { if (trophy) setNewTrophy(trophy); });
  }, [visible, loadProgress]);

  const pct = Math.min(100, Math.round((progress.currentDay / planTotal) * 100));
  const nextTrophy = trophies.find((t) => !progress.trophyDates[String(t.day)]);
  const daysUntilNext = nextTrophy ? Math.max(0, nextTrophy.day - progress.currentDay) : null;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 overflow-hidden">
      <div className="w-full max-w-lg rounded-t-3xl overflow-y-auto max-h-[90vh]" style={{ backgroundColor: C.bg }}>
        <div className="px-6 py-6 text-center relative" style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})` }}>
          <button onClick={onClose} className="absolute right-4 top-4 w-9 h-9 rounded-full bg-black/25 text-white flex items-center justify-center">✕</button>
          <p className="text-white font-bold text-2xl mb-1">Your Progress</p>
          <p className="text-white/75 text-sm mb-3">{planTotal}-Day Faith Journey</p>
          <span className="inline-flex items-center gap-1 bg-white/20 rounded-full px-4 py-1.5 text-white font-semibold text-sm">🔥 {progress.streak} day streak</span>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke={C.border} strokeWidth="8" />
                <circle cx="50" cy="50" r="44" fill="none" stroke={C.f2} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 44}`} strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: C.f1 }}>{pct}%</span>
                <span className="text-xs" style={{ color: C.muted }}>Complete</span>
              </div>
            </div>
            <p className="text-xl font-bold mt-3" style={{ color: C.text }}>Day {progress.currentDay} of {planTotal}</p>
            <p className="text-sm" style={{ color: C.muted }}>{planTotal - progress.currentDay} days remaining</p>
          </div>

          {nextTrophy && (
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Next Milestone</p>
              <div className="flex items-center gap-4 rounded-2xl p-4 border" style={{ backgroundColor: C.surface, borderColor: C.border }}>
                <span className="text-4xl">{nextTrophy.icon}</span>
                <div>
                  <p className="font-bold" style={{ color: C.text }}>{nextTrophy.name}</p>
                  <p className="text-sm" style={{ color: C.f1 }}>{daysUntilNext === 0 ? "Earned today!" : `${daysUntilNext} day${daysUntilNext !== 1 ? "s" : ""} away`}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.muted }}>Trophies</p>
            {trophies.map((t) => {
              const earnedDate = progress.trophyDates[String(t.day)];
              const daysLeft = Math.max(0, t.day - progress.currentDay);
              return (
                <div key={t.day} className="flex items-center gap-4 rounded-2xl p-4 mb-2 border-2" style={{ borderColor: earnedDate ? "#C9A227" : C.border, backgroundColor: earnedDate ? "#FFF8E1" : C.surface }}>
                  <span className="text-4xl" style={{ opacity: earnedDate ? 1 : 0.25 }}>{t.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: earnedDate ? "#2C1A0E" : C.dim }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>Day {t.day}</p>
                    {earnedDate ? <p className="text-xs font-bold" style={{ color: "#B8860B" }}>Earned {earnedDate}</p> : <p className="text-xs" style={{ color: C.dim }}>{daysLeft} day{daysLeft !== 1 ? "s" : ""} to unlock</p>}
                  </div>
                  {earnedDate ? <span className="w-7 h-7 rounded-full bg-[#C9A227] flex items-center justify-center text-white text-sm">✓</span> : <span className="text-xl opacity-25">🔒</span>}
                </div>
              );
            })}
          </div>

          <button onClick={onClose} className="w-full py-4 rounded-2xl font-bold text-white text-base transition" style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})` }}>Close</button>
        </div>
      </div>

      {newTrophy && (
        <div className="absolute inset-0 bg-black/65 flex items-center justify-center z-10">
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center w-72 border-4 border-[#C9A227]">
            <span className="text-7xl mb-2">{newTrophy.icon}</span>
            <p className="text-2xl font-bold text-gray-800 mb-1 text-center">Trophy Unlocked!</p>
            <p className="text-[#B8860B] font-bold mb-6 text-center">{newTrophy.name}</p>
            <button onClick={() => setNewTrophy(null)} className="w-full py-3 rounded-2xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})` }}>Awesome!</button>
          </div>
        </div>
      )}
    </div>
  );
}
