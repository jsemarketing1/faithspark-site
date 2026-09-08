"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";
import { TRIVIA_ALL } from "@/lib/app-content/gamedata";

const PER_ROUND = 10;
const SEEN_KEY = "faithspark_trivia_seen";
const QUEUE_KEY = "faithspark_trivia_queue";

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Question = { q: string; a: number; opts: string[] };

function shuffleOptions(q: Question): Question {
  const correctText = q.opts[q.a];
  const shuffled = shuffle(q.opts);
  return { ...q, opts: shuffled, a: shuffled.indexOf(correctText) };
}

export default function Trivia() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRound = () => {
    setLoading(true);
    let seenIds: number[] = [], queue: number[] = [];
    try { const s = lsGet(SEEN_KEY); if (s) seenIds = JSON.parse(s); } catch { /* ignore */ }
    try { const q = lsGet(QUEUE_KEY); if (q) queue = JSON.parse(q); } catch { /* ignore */ }
    if (queue.length === 0) {
      const unseen = TRIVIA_ALL.map((_, i) => i).filter((i) => !seenIds.includes(i));
      if (unseen.length === 0) { seenIds = []; lsSet(SEEN_KEY, "[]"); }
      queue = shuffle(unseen.length > 0 ? unseen : TRIVIA_ALL.map((_, i) => i));
    }
    const roundIndices = queue.slice(0, PER_ROUND);
    const remaining = queue.slice(PER_ROUND);
    const newSeen = [...seenIds, ...roundIndices];
    lsSet(QUEUE_KEY, JSON.stringify(remaining));
    lsSet(SEEN_KEY, JSON.stringify(newSeen.slice(-TRIVIA_ALL.length)));
    setQuestions(roundIndices.map((i) => shuffleOptions(TRIVIA_ALL[i] as Question)));
    setIdx(0); setScore(0); setChosen(null); setDone(false); setLoading(false);
  };

  useEffect(() => { loadRound(); }, []);

  const answer = (i: number) => {
    if (chosen !== null || !questions.length) return;
    setChosen(i);
    if (i === questions[idx].a) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx < questions.length - 1) { setIdx((x) => x + 1); setChosen(null); }
      else setDone(true);
    }, 900);
  };

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-full flex items-center justify-center" style={{ backgroundColor: C.bg }}>
        <p style={{ color: C.muted }}>Loading questions…</p>
      </div>
    );
  }

  const q = questions[idx];

  const optStyle = (i: number) => {
    const base = { backgroundColor: C.surface, borderColor: C.border, color: C.text };
    if (chosen === null) return base;
    if (i === q.a) return { backgroundColor: C.green + "22", borderColor: C.green, color: C.green };
    if (i === chosen) return { backgroundColor: C.red + "22", borderColor: C.red, color: C.red };
    return base;
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: C.bg }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <button onClick={() => router.push("/app/games/")} className="rounded-xl border px-3 py-2 text-sm font-bold" style={{ backgroundColor: C.surface, borderColor: C.border, color: C.muted }}>← Back</button>
        <p className="flex-1 font-extrabold text-lg" style={{ color: C.text }}>Bible Trivia</p>
        <p className="text-sm font-bold" style={{ color: C.f1 }}>{score} pts</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {!done ? (
          <>
            <div className="flex gap-1 mb-4">
              {questions.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: i < idx ? C.f1 : i === idx ? C.f2 : C.border }} />
              ))}
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-xs" style={{ color: C.muted }}>Question {idx + 1} of {questions.length}</p>
              <p className="text-xs" style={{ color: C.muted }}>Score: {score}</p>
            </div>
            <p className="text-xs mb-2" style={{ color: C.muted }}>Question {idx + 1}</p>
            <p className="text-xl font-bold leading-8 mb-7" style={{ color: C.text, fontFamily: "Georgia, serif" }}>{q.q}</p>
            <div className="space-y-3">
              {q.opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  className="w-full text-left rounded-2xl border-2 font-semibold text-base transition"
                  style={{ ...optStyle(i), padding: "15px 18px", minHeight: 52 }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-5xl mb-4">{score >= 8 ? "🏆" : score >= 5 ? "🎯" : "📖"}</p>
            <p className="text-2xl font-bold mb-2" style={{ color: C.text }}>You scored {score} / {questions.length}</p>
            <p className="text-sm mb-8" style={{ color: C.muted }}>
              {score === questions.length ? "Perfect score! Amazing!" : score >= 8 ? "Excellent knowledge!" : score >= 5 ? "Good job! Keep studying!" : "Keep reading your Bible!"}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => loadRound()}
                className="w-full rounded-2xl font-extrabold text-base"
                style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, padding: "16px 18px", minHeight: 54 }}
              >
                Next Round
              </button>
              <button
                onClick={() => router.push("/app/games/")}
                className="w-full rounded-2xl border font-bold text-base"
                style={{ borderColor: C.border, color: C.muted, padding: "14px 18px", minHeight: 50 }}
              >
                Back to Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
