"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";

const WORDS = [
  { word: "GRACE",    hint: "God's unmerited favor" },
  { word: "FAITH",    hint: "Belief without sight" },
  { word: "PRAYER",   hint: "Talking with God" },
  { word: "GOSPEL",   hint: "Good News of Jesus Christ" },
  { word: "BLESSING", hint: "God's favor upon you" },
  { word: "COVENANT", hint: "A sacred promise with God" },
  { word: "REDEMPTION", hint: "Being bought back from sin" },
  { word: "SALVATION", hint: "Being saved from sin and death" },
  { word: "SANCTIFY",  hint: "To be made holy" },
  { word: "PARABLE",   hint: "A teaching story used by Jesus" },
  { word: "BAPTISM",   hint: "An outward sign of inward faith" },
  { word: "PROPHET",   hint: "One who speaks for God" },
  { word: "DISCIPLE",  hint: "A follower of Jesus" },
  { word: "ETERNAL",   hint: "Without beginning or end" },
  { word: "REPENTANCE", hint: "Turning away from sin" },
];

function shuffle(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("") === str ? shuffle(str) : arr.join("");
}

export default function Scramble() {
  const router = useRouter();
  const [queue, setQueue] = useState<typeof WORDS>([]);
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const shuffledWords = [...WORDS].sort(() => Math.random() - 0.5).slice(0, 10);
    setQueue(shuffledWords);
    setScrambled(shuffle(shuffledWords[0].word));
    setIdx(0); setScore(0); setInput(""); setResult(null); setDone(false); setShowHint(false);
  }, []);

  const check = () => {
    const current = queue[idx];
    const correct = input.trim().toUpperCase() === current.word;
    if (correct) setScore((s) => s + 1);
    setResult(correct ? "correct" : "wrong");
    setTimeout(() => {
      if (idx < queue.length - 1) {
        const next = idx + 1;
        setIdx(next); setScrambled(shuffle(queue[next].word));
        setInput(""); setResult(null); setShowHint(false);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  const skip = () => {
    if (idx < queue.length - 1) {
      const next = idx + 1;
      setIdx(next); setScrambled(shuffle(queue[next].word));
      setInput(""); setResult(null); setShowHint(false);
    } else {
      setDone(true);
    }
  };

  if (queue.length === 0) return null;
  const current = queue[idx];

  return (
    <div className="min-h-full" style={{ backgroundColor: C.bg }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <button onClick={() => router.push("/app/games/")} className="rounded-xl border px-3 py-2 text-sm font-bold" style={{ backgroundColor: C.surface, borderColor: C.border, color: C.muted }}>← Back</button>
        <p className="flex-1 font-extrabold text-lg" style={{ color: C.text }}>Word Scramble</p>
        <p className="text-sm font-bold" style={{ color: C.f1 }}>{score} pts</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8">
        {!done ? (
          <>
            <div className="flex gap-1 mb-6">
              {queue.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: i < idx ? C.f1 : i === idx ? C.f2 : C.border }} />
              ))}
            </div>
            <p className="text-xs text-center mb-2" style={{ color: C.muted }}>{idx + 1} of {queue.length}</p>

            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {scrambled.split("").map((letter, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold border-2"
                  style={{ backgroundColor: C.hi, borderColor: C.border, color: C.f1 }}
                >
                  {letter}
                </div>
              ))}
            </div>

            {showHint && (
              <p className="text-sm text-center mb-4 italic" style={{ color: C.muted }}>{current.hint}</p>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder="Unscramble the letters…"
              disabled={result !== null}
              className="w-full rounded-2xl px-5 py-4 text-base border-2 outline-none text-center font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: C.surface,
                borderColor: result === "correct" ? C.green : result === "wrong" ? C.red : C.border,
                color: C.text,
              }}
            />

            {result === "wrong" && (
              <p className="text-center text-sm mb-3 font-bold" style={{ color: C.red }}>
                The answer was: {current.word}
              </p>
            )}

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
            <button
              onClick={skip}
              className="w-full mt-3 rounded-xl font-semibold text-sm"
              style={{ color: C.dim, padding: "10px 0" }}
            >
              Skip →
            </button>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-5xl mb-4">{score >= 8 ? "🏆" : "🎯"}</p>
            <p className="text-2xl font-bold mb-2" style={{ color: C.text }}>{score} / {queue.length} correct</p>
            <p className="text-sm mb-8" style={{ color: C.muted }}>
              {score === queue.length ? "Perfect! Word master!" : "Great effort! Keep practicing!"}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-2xl font-extrabold text-base"
                style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, padding: "16px 18px", minHeight: 54 }}
              >
                Play Again
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
