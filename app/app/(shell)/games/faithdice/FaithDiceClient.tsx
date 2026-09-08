"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, C as themeC } from "@/lib/app-content/theme";

const DOTS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 2], [2, 0]],
  3: [[0, 2], [1, 1], [2, 0]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

const UPPER = ["ones", "twos", "threes", "fours", "fives", "sixes"];
const LOWER = ["threeKind", "fourKind", "fullHouse", "smStraight", "lgStraight", "yahtzee", "chance"];
const ALL_CATS = [...UPPER, ...LOWER];

const CAT_LABELS: Record<string, string> = {
  ones: "Ones", twos: "Twos", threes: "Threes", fours: "Fours", fives: "Fives", sixes: "Sixes",
  threeKind: "3 of a Kind", fourKind: "4 of a Kind", fullHouse: "Full House",
  smStraight: "Sm. Straight", lgStraight: "Lg. Straight", yahtzee: "Yahtzee!", chance: "Chance",
};

const CAT_HINT: Record<string, string> = {
  fullHouse: "25 pts", smStraight: "30 pts", lgStraight: "40 pts", yahtzee: "50 pts",
  ones: "sum of 1s", twos: "sum of 2s", threes: "sum of 3s",
  fours: "sum of 4s", fives: "sum of 5s", sixes: "sum of 6s",
  threeKind: "sum all", fourKind: "sum all", chance: "sum all",
};

const SMALL_STRAIGHTS = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
const LARGE_STRAIGHTS = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function hasSequence(dice: number[], sequence: number[]) {
  const counts: Record<number, number> = {};
  for (const d of dice) counts[d] = (counts[d] ?? 0) + 1;
  return sequence.every((n) => counts[n]);
}

function computeScore(cat: string, dice: number[]) {
  const counts: Record<number, number> = {};
  for (const d of dice) counts[d] = (counts[d] ?? 0) + 1;
  const vals = Object.values(counts);
  const sum = dice.reduce((a, b) => a + b, 0);
  const max = vals.length ? Math.max(...vals) : 0;

  switch (cat) {
    case "ones": return dice.filter((d) => d === 1).reduce((a, b) => a + b, 0);
    case "twos": return dice.filter((d) => d === 2).reduce((a, b) => a + b, 0);
    case "threes": return dice.filter((d) => d === 3).reduce((a, b) => a + b, 0);
    case "fours": return dice.filter((d) => d === 4).reduce((a, b) => a + b, 0);
    case "fives": return dice.filter((d) => d === 5).reduce((a, b) => a + b, 0);
    case "sixes": return dice.filter((d) => d === 6).reduce((a, b) => a + b, 0);
    case "threeKind": return max >= 3 ? sum : 0;
    case "fourKind": return max >= 4 ? sum : 0;
    case "fullHouse": return vals.includes(3) && vals.includes(2) ? 25 : 0;
    case "smStraight": return SMALL_STRAIGHTS.some((seq) => hasSequence(dice, seq)) ? 30 : 0;
    case "lgStraight": return LARGE_STRAIGHTS.some((seq) => hasSequence(dice, seq)) ? 40 : 0;
    case "yahtzee": return max === 5 ? 50 : 0;
    case "chance": return sum;
    default: return 0;
  }
}

function initScores(): Record<string, number | null> {
  return Object.fromEntries(ALL_CATS.map((c) => [c, null]));
}

function Die({ value, held, enabled, onToggle, C }: { value: number; held: boolean; enabled: boolean; onToggle: () => void; C: typeof themeC }) {
  const dots = value >= 1 ? DOTS[value] : [];
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!enabled}
      style={{
        width: 56, height: 56, borderRadius: 12, border: `2.5px solid ${held ? C.f2 : "#C8B08A"}`,
        backgroundColor: held ? C.f1 : "#FAFAF8",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        cursor: enabled ? "pointer" : "default",
        boxShadow: held ? `0 4px 12px ${C.f1}55` : "0 2px 6px rgba(0,0,0,0.08)",
        padding: 0, flexShrink: 0,
      }}
    >
      {value > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {[0, 1, 2].map((row) => (
            <div key={row} style={{ display: "flex", gap: 3 }}>
              {[0, 1, 2].map((col) => {
                const active = dots.some(([r, c]) => r === row && c === col);
                return (
                  <div
                    key={col}
                    style={{
                      width: 9, height: 9, borderRadius: 5,
                      backgroundColor: active ? (held ? "#fff" : "#2C1A0E") : "transparent",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#D9C8A9" }} />
      )}
      {held && (
        <span style={{ fontSize: 8, fontWeight: 800, color: held ? "#fff" : C.f1, marginTop: 2, letterSpacing: 0.8 }}>
          HELD
        </span>
      )}
    </button>
  );
}

const btnPrimary = (C: typeof themeC) => ({
  padding: "14px 28px", minHeight: 52, borderRadius: 14, border: "none",
  fontWeight: 800, fontSize: 16, cursor: "pointer",
  background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary,
});

export default function FaithDice() {
  const router = useRouter();

  const [dice, setDice] = useState([0, 0, 0, 0, 0]);
  const [held, setHeld] = useState([false, false, false, false, false]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [scores, setScores] = useState(initScores);
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const hasRolled = rollsLeft < 3;
  const upperSum = UPPER.reduce((a, c) => a + (scores[c] ?? 0), 0);
  const upperBonus = upperSum >= 63 ? 35 : 0;
  const lowerSum = LOWER.reduce((a, c) => a + (scores[c] ?? 0), 0);
  const grandTotal = upperSum + upperBonus + lowerSum;
  const roundsPlayed = ALL_CATS.filter((c) => scores[c] !== null).length;

  const roll = () => {
    if (rollsLeft === 0 || gameOver) return;
    setDice((prev) => prev.map((d, i) => (held[i] ? d : rollDie())));
    setRollsLeft((prev) => prev - 1);
  };

  const toggleHold = (i: number) => {
    if (!hasRolled || rollsLeft === 0) return;
    setHeld((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const scoreCategory = (cat: string) => {
    if (!hasRolled || scores[cat] !== null || gameOver) return;
    const pts = computeScore(cat, dice);
    const next = { ...scores, [cat]: pts };
    setScores(next);

    if (cat === "yahtzee" && pts === 50) setShowCelebrate(true);

    if (ALL_CATS.every((c) => next[c] !== null)) {
      setGameOver(true);
    } else {
      setDice([0, 0, 0, 0, 0]);
      setHeld([false, false, false, false, false]);
      setRollsLeft(3);
    }
  };

  const newGame = () => {
    setDice([0, 0, 0, 0, 0]);
    setHeld([false, false, false, false, false]);
    setRollsLeft(3);
    setScores(initScores());
    setGameOver(false);
    setShowCelebrate(false);
  };

  const accent = C.accent || C.f2;

  const renderCategory = (cat: string, compact = false) => {
    const scored = scores[cat];
    const potential = hasRolled && scored === null ? computeScore(cat, dice) : null;
    const canScore = scored === null && hasRolled;

    return (
      <button
        key={cat}
        type="button"
        onClick={() => scoreCategory(cat)}
        disabled={!canScore}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: compact ? 6 : 8,
          padding: compact ? "9px 10px" : "12px 16px", border: "none", borderBottom: `1px solid ${C.border}`,
          backgroundColor: canScore ? `${C.f1}08` : "transparent",
          cursor: canScore ? "pointer" : "default", textAlign: "left",
        }}
      >
        <span style={{ flex: 1, minWidth: 0, fontSize: compact ? 12 : 14, fontWeight: 600, color: C.text, lineHeight: 1.25 }}>
          {CAT_LABELS[cat]}
        </span>
        {!compact && <span style={{ fontSize: 11, color: C.dim, flexShrink: 0 }}>{CAT_HINT[cat]}</span>}
        <span style={{
          minWidth: 28, textAlign: "right", fontWeight: 700, fontSize: compact ? 14 : 15, flexShrink: 0,
          color: scored !== null ? C.f1 : potential !== null ? (potential > 0 ? accent : C.border) : C.dim,
        }}>
          {scored !== null ? scored : potential !== null ? potential : "—"}
        </span>
      </button>
    );
  };

  const sectionCardStyle: React.CSSProperties = {
    border: `1.5px solid ${C.border}`,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: C.surface,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };

  const sectionHeadStyle = (gradient: string): React.CSSProperties => ({
    padding: "9px 12px",
    background: gradient,
    flexShrink: 0,
  });

  const upperHeadGrad = "linear-gradient(135deg, " + C.f1 + ", " + C.f2 + ")";
  const lowerHeadGrad = "linear-gradient(135deg, " + accent + ", " + C.f1 + ")";
  const totalsHeadGrad = "linear-gradient(135deg, " + C.f2 + ", " + accent + ")";
  const bonusLabel = upperBonus > 0
    ? "Bonus +35 ✓"
    : "+" + Math.max(0, 63 - upperSum) + " to bonus";

  return (
    <div className="min-h-full" style={{ backgroundColor: C.bg }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <button
          onClick={() => router.push("/app/games/")}
          className="rounded-xl border font-bold text-sm"
          style={{ backgroundColor: C.surface, borderColor: C.border, color: C.muted, padding: "10px 14px" }}
        >
          ← Back
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-lg leading-tight" style={{ color: C.text }}>Faith Dice</p>
          <p className="text-xs" style={{ color: C.muted }}>Classic Yahtzee · Round {Math.min(roundsPlayed + 1, 13)}/13</p>
        </div>
        <p className="text-sm font-bold" style={{ color: C.f1 }}>{grandTotal} pts</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-5 pb-16">
        {gameOver && (
          <div
            className="rounded-2xl p-6 mb-4 text-center"
            style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})` }}
          >
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 26, color: C.onPrimary, margin: "0 0 4px" }}>
              Game Complete!
            </p>
            <p style={{ fontSize: 18, fontWeight: 800, color: C.onPrimary, margin: "0 0 16px" }}>
              Final Score: {grandTotal}
            </p>
            <button type="button" onClick={newGame} style={{ ...btnPrimary(C), background: "rgba(255,255,255,0.22)", width: "100%" }}>
              New Game
            </button>
          </div>
        )}

        {/* Dice area */}
        <div
          className="rounded-2xl mb-4 text-center mx-auto"
          style={{ backgroundColor: C.surface, border: `1.5px solid ${C.border}`, padding: "18px 16px", maxWidth: 480 }}
        >
          <div className="flex justify-center gap-2.5 flex-wrap mb-3">
            {dice.map((d, i) => (
              <Die
                key={i}
                value={d}
                held={held[i]}
                enabled={hasRolled && !gameOver}
                onToggle={() => toggleHold(i)}
                C={C}
              />
            ))}
          </div>

          {!gameOver && (
            <>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 12px" }}>
                {rollsLeft === 3
                  ? "Roll to start your turn"
                  : rollsLeft > 0
                    ? `${rollsLeft} roll${rollsLeft !== 1 ? "s" : ""} left — click dice to hold`
                    : "No rolls left — tap a score category"}
              </p>
              <button
                type="button"
                onClick={roll}
                disabled={rollsLeft === 0}
                style={{
                  ...btnPrimary(C),
                  opacity: rollsLeft > 0 ? 1 : 0.45,
                  cursor: rollsLeft > 0 ? "pointer" : "not-allowed",
                }}
              >
                {hasRolled ? "Roll Again" : "Roll Dice"}
              </button>
              {hasRolled && (
                <p style={{ fontSize: 12, color: C.dim, margin: "10px 0 0" }}>
                  Tap any open score row to bank your dice
                </p>
              )}
            </>
          )}
        </div>

        {/* Scorecard — three columns like a paper Yahtzee card */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(150px, 1fr))",
              gap: 12,
              alignItems: "stretch",
              minWidth: 460,
            }}
          >
            {/* Upper section */}
            <div style={sectionCardStyle}>
              <div style={sectionHeadStyle(upperHeadGrad)}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 1.1, textTransform: "uppercase", textAlign: "center" }}>
                  Upper
                </p>
              </div>
              <div style={{ flex: 1 }}>
                {UPPER.map((cat) => renderCategory(cat, true))}
              </div>
              <div style={{ padding: "10px 10px", backgroundColor: C.hi, fontSize: 11, lineHeight: 1.45, marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: C.text, marginBottom: 4 }}>
                  <span>Total</span>
                  <span style={{ fontWeight: 700 }}>{upperSum}/63</span>
                </div>
                <div style={{ fontWeight: 700, color: C.f1, textAlign: "center" }}>
                  {bonusLabel}
                </div>
              </div>
            </div>

            {/* Lower section */}
            <div style={sectionCardStyle}>
              <div style={sectionHeadStyle(lowerHeadGrad)}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 1.1, textTransform: "uppercase", textAlign: "center" }}>
                  Lower
                </p>
              </div>
              <div style={{ flex: 1 }}>
                {LOWER.map((cat) => renderCategory(cat, true))}
              </div>
            </div>

            {/* Totals */}
            <div style={sectionCardStyle}>
              <div style={sectionHeadStyle(totalsHeadGrad)}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 1.1, textTransform: "uppercase", textAlign: "center" }}>
                  Totals
                </p>
              </div>
              {([
                ["Upper Total", upperSum],
                ["Upper Bonus", upperBonus],
                ["Lower Total", lowerSum],
              ] as [string, number][]).map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 12px", borderBottom: "1px solid " + C.border, fontSize: 12,
                  }}
                >
                  <span style={{ color: C.text }}>{label}</span>
                  <span style={{ fontWeight: 700, color: C.f1 }}>{val}</span>
                </div>
              ))}
              <div
                style={{
                  marginTop: "auto",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "16px 12px", backgroundColor: C.hi2, textAlign: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                  Grand Total
                </span>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 28, color: C.f1, lineHeight: 1 }}>
                  {grandTotal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {!gameOver && (
          <button
            type="button"
            onClick={newGame}
            className="w-full mt-4 font-semibold text-sm"
            style={{ color: C.dim, padding: "12px 0", background: "none", border: "none", cursor: "pointer" }}
          >
            Reset — New Game
          </button>
        )}
      </div>

      {/* Yahtzee celebration */}
      {showCelebrate && (
        <div
          style={{
            position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.72)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 24,
          }}
        >
          <div
            style={{
              backgroundColor: C.bg, borderRadius: 24, padding: 32, textAlign: "center", maxWidth: 340, width: "100%",
              border: `3px solid ${C.f1}`, boxShadow: `0 0 30px ${C.f1}55`,
            }}
          >
            <p style={{ fontSize: 56, margin: "0 0 8px" }}>🎲</p>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 32, color: C.f1, margin: "0 0 10px" }}>YAHTZEE!</p>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 14, color: C.muted, lineHeight: 1.6, margin: "0 0 20px" }}>
              &quot;I can do all things through Christ who strengthens me.&quot;
              <br />— Philippians 4:13
            </p>
            <button type="button" onClick={() => setShowCelebrate(false)} style={{ ...btnPrimary(C), width: "100%" }}>
              Keep Going!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
