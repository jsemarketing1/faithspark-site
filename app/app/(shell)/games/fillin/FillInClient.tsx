"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";
import { FILLINS_ALL } from "@/lib/app-content/gamedata";

const PER_ROUND = 8;
const SEEN_KEY = "faithspark_fillin_seen";
const QUEUE_KEY = "faithspark_fillin_queue";

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
function shuffle<T>(arr: T[]): T[] { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

type FillIn = { verse: string; answer: string; ref: string; hint: string };

export default function FillIn() {
  const router = useRouter();
  const [questions, setQuestions] = useState<FillIn[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRound = () => {
    setLoading(true);
    let seenIds: number[] = [], queue: number[] = [];
    try { const s = lsGet(SEEN_KEY); if (s) seenIds = JSON.parse(s); } catch { /* ignore */ }
    try { const q = lsGet(QUEUE_KEY); if (q) queue = JSON.parse(q); } catch { /* ignore */ }
    if (queue.length === 0) {
      const unseen = FILLINS_ALL.map((_, i) => i).filter((i) => !seenIds.includes(i));
      if (unseen.length === 0) { seenIds = []; lsSet(SEEN_KEY, "[]"); }
      queue = shuffle(unseen.length > 0 ? unseen : FILLINS_ALL.map((_, i) => i));
    }
    const roundIndices = queue.slice(0, PER_ROUND);
    lsSet(QUEUE_KEY, JSON.stringify(queue.slice(PER_ROUND)));
    lsSet(SEEN_KEY, JSON.stringify([...seenIds, ...roundIndices].slice(-FILLINS_ALL.length)));
    setQuestions(roundIndices.map((i) => FILLINS_ALL[i] as FillIn));
    setIdx(0); setScore(0); setInput(""); setResult(null); setDone(false); setShowHint(false); setLoading(false);
  };

  useEffect(() => { loadRound(); }, []);

  const check = () => {
    if (!questions.length) return;
    const q = questions[idx];
    const correct = input.trim().toLowerCase() === q.answer.toLowerCase();
    if (correct) setScore((s) => s + 1);
    setResult(correct ? "correct" : "wrong");
    setTimeout(() => {
      if (idx < questions.length - 1) { setIdx((x) => x + 1); setInput(""); setResult(null); setShowHint(false); }
      else setDone(true);
    }, 1200);
  };

  if (loading || questions.length === 0) return <div className="min-h-full flex items-center justify-center" style={{ backgroundColor: C.bg }}><p style={{ color: C.muted }}>Loading…</p></div>;

  const q = questions[idx];
  const parts = q.verse.split("___");

  return (
    <div className="min-h-full" style={{ backgroundColor: C.bg }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <button onClick={() => router.push("/app/games/")} className="rounded-xl border px-3 py-2 text-sm font-bold" style={{ backgroundColor: C.surface, borderColor: C.border, color: C.muted }}>← Back</button>
        <p className="flex-1 font-extrabold text-lg" style={{ color: C.text }}>Fill in the Blank</p>
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
              <p className="text-xs" style={{ color: C.muted }}>{idx + 1} of {questions.length}</p>
              <p className="text-xs" style={{ color: C.muted }}>Score: {score}</p>
            </div>

            <div className="rounded-2xl p-6 border mb-5" style={{ backgroundColor: C.surface, borderColor: C.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.muted }}>{q.ref}</p>
              <p className="text-lg leading-9" style={{ color: C.text, fontFamily: "Georgia, serif" }}>
                {parts[0]}
                <span
                  className="inline-block border-b-2 font-bold px-1 min-w-[80px] text-center"
                  style={{ borderColor: result === "correct" ? C.green : result === "wrong" ? C.red : C.f1, color: result === "correct" ? C.green : result === "wrong" ? C.red : C.f1 }}
                >
                  {result === "wrong" ? q.answer : input || "___"}
                </span>
                {parts[1]}
              </p>
            </div>

            {showHint && (
              <p className="text-sm text-center mb-3 font-semibold" style={{ color: C.accent || C.f2 }}>
                Hint: starts with &quot;{q.answer[0]}&quot;, {q.answer.length} letters
              </p>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder="Type the missing word…"
              disabled={result !== null}
              className="w-full rounded-2xl px-5 py-4 text-base border-2 outline-none mb-4"
              style={{
                backgroundColor: C.surface,
                borderColor: result === "correct" ? C.green : result === "wrong" ? C.red : C.border,
                color: C.text,
              }}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="flex-1 rounded-2xl border font-bold text-base disabled:opacity-40"
                style={{
                  backgroundColor: C.surface, borderColor: C.border, color: C.text,
                  padding: "15px 16px", minHeight: 52,
                }}
              >
                💡 Hint
              </button>
              <button
                onClick={check}
                disabled={!input.trim() || result !== null}
                className="flex-1 rounded-2xl font-extrabold text-base disabled:opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary,
                  padding: "15px 16px", minHeight: 52,
                }}
              >
                Check →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-5xl mb-4">{score >= 6 ? "🏆" : score >= 4 ? "🎯" : "📖"}</p>
            <p className="text-2xl font-bold mb-2" style={{ color: C.text }}>{score} / {questions.length} correct</p>
            <p className="text-sm mb-8" style={{ color: C.muted }}>
              {score === questions.length ? "Perfect! Scripture master!" : score >= 6 ? "Great work!" : "Keep practicing!"}
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
