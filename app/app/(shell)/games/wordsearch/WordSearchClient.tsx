"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";

const GRID_SIZE = 12;
const WORD_COUNT = 10;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIRECTIONS: [number, number][] = [[0, 1], [1, 0], [1, 1], [-1, 1]];

type Placed = { word: string; cells: [number, number][] };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickWords(bank: string[], count: number) {
  return shuffle(bank).slice(0, count);
}

function canPlace(grid: string[][], word: string, r: number, c: number, dr: number, dc: number) {
  for (let i = 0; i < word.length; i++) {
    const nr = r + i * dr;
    const nc = c + i * dc;
    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return false;
    if (grid[nr][nc] !== "" && grid[nr][nc] !== word[i]) return false;
  }
  return true;
}

function placeWord(grid: string[][], word: string, r: number, c: number, dr: number, dc: number): [number, number][] {
  const cells: [number, number][] = [];
  for (let i = 0; i < word.length; i++) {
    const nr = r + i * dr;
    const nc = c + i * dc;
    grid[nr][nc] = word[i];
    cells.push([nr, nc]);
  }
  return cells;
}

function buildGrid(words: string[]): { grid: string[][]; placed: Placed[] } | null {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  const placed: Placed[] = [];
  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const word of sorted) {
    let wordPlaced = false;
    const dirs = shuffle(DIRECTIONS);

    for (const [dr, dc] of dirs) {
      const candidates: [number, number][] = [];
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (canPlace(grid, word, r, c, dr, dc)) candidates.push([r, c]);
        }
      }
      if (!candidates.length) continue;

      const [sr, sc] = candidates[Math.floor(Math.random() * candidates.length)];
      const cells = placeWord(grid, word, sr, sc, dr, dc);
      placed.push({ word, cells });
      wordPlaced = true;
      break;
    }

    if (!wordPlaced) return null;
  }

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = LETTERS[Math.floor(Math.random() * 26)];
    }
  }

  return { grid, placed };
}

function generatePuzzle(wordBank: string[]) {
  for (let attempt = 0; attempt < 80; attempt++) {
    const words = pickWords(wordBank, WORD_COUNT);
    const result = buildGrid(words);
    if (result) return { words, ...result };
  }

  const shortBank = wordBank.filter((w) => w.length <= 8);
  for (let attempt = 0; attempt < 40; attempt++) {
    const words = pickWords(shortBank.length >= WORD_COUNT ? shortBank : wordBank, WORD_COUNT);
    const result = buildGrid(words);
    if (result) return { words, ...result };
  }

  return null;
}

export default function WordSearch() {
  const router = useRouter();
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeWords, setActiveWords] = useState<string[]>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [selecting, setSelecting] = useState<[number, number][]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [solved, setSolved] = useState(false);

  const newPuzzle = useCallback((bank: string[]) => {
    if (!bank?.length) return;
    const puzzle = generatePuzzle(bank);
    if (!puzzle) return;
    setActiveWords(puzzle.words);
    setGrid(puzzle.grid);
    setPlaced(puzzle.placed);
    setFound([]);
    setSelecting([]);
    setSolved(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/wordsearch/bible-words.json")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load word list");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const bank = Array.isArray(data) ? data.map((w) => String(w).toUpperCase()) : [];
        setWordBank(bank);
        newPuzzle(bank);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err.message);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [newPuzzle]);

  const startSelect = (r: number, c: number) => { setIsSelecting(true); setSelecting([[r, c]]); };

  const continueSelect = (r: number, c: number) => {
    if (!isSelecting) return;
    const start = selecting[0];
    if (!start) return;
    const dr = r - start[0], dc = c - start[1];
    const len = Math.max(Math.abs(dr), Math.abs(dc));
    if (len === 0) { setSelecting([start]); return; }
    const normDr = Math.sign(dr), normDc = Math.sign(dc);
    if (!(normDr === 0 || normDc === 0 || Math.abs(dr) === Math.abs(dc))) return;
    const cells: [number, number][] = Array.from({ length: len + 1 }, (_, i) => [start[0] + i * normDr, start[1] + i * normDc]);
    setSelecting(cells);
  };

  const endSelect = () => {
    setIsSelecting(false);
    if (selecting.length < 2) { setSelecting([]); return; }
    const word = selecting.map(([r, c]) => grid[r]?.[c] || "").join("");
    const revWord = word.split("").reverse().join("");
    const match = placed.find((p) =>
      !found.includes(p.word) &&
      (p.word === word || p.word === revWord) &&
      selecting.length === p.cells.length
    );
    if (match) setFound((prev) => [...prev, match.word]);
    setSelecting([]);
  };

  const solvePuzzle = () => {
    setFound(placed.map((p) => p.word));
    setSolved(true);
    setSelecting([]);
  };

  const isSelected = (r: number, c: number) => selecting.some(([sr, sc]) => sr === r && sc === c);
  const isFoundCell = (r: number, c: number) => found.some((w) => {
    const p = placed.find((pl) => pl.word === w);
    return p?.cells.some(([pr, pc]) => pr === r && pc === c);
  });

  const allFound = found.length === placed.length && placed.length > 0;

  const btnBase = {
    padding: "14px 24px",
    minHeight: 48,
    fontSize: "1rem",
    fontWeight: 700,
    borderRadius: 16,
    border: "1px solid",
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: C.bg }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: C.border }}>
        <button onClick={() => router.push("/app/games/")} className="rounded-xl border px-3 py-2 text-sm font-bold" style={{ backgroundColor: C.surface, borderColor: C.border, color: C.muted }}>← Back</button>
        <p className="flex-1 font-extrabold text-lg" style={{ color: C.text }}>Word Search</p>
        <p className="text-sm font-bold" style={{ color: C.f1 }}>{found.length}/{placed.length}</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 flex flex-col items-center">
        <div className="flex flex-wrap gap-3 justify-center w-full mb-5">
          <button
            onClick={() => newPuzzle(wordBank)}
            disabled={loading || !wordBank.length}
            className="rounded-2xl font-bold"
            style={{
              ...btnBase,
              background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`,
              color: "#fff",
              borderColor: "transparent",
              opacity: loading || !wordBank.length ? 0.5 : 1,
            }}
          >
            New Puzzle
          </button>
          <button
            onClick={solvePuzzle}
            disabled={loading || !placed.length || allFound}
            className="rounded-2xl font-bold"
            style={{
              ...btnBase,
              backgroundColor: C.surface,
              borderColor: C.border,
              color: C.text,
              opacity: loading || !placed.length || allFound ? 0.5 : 1,
            }}
          >
            Solve Puzzle
          </button>
        </div>

        {loading && (
          <p className="text-sm font-semibold mb-4" style={{ color: C.muted }}>Loading words…</p>
        )}

        {loadError && (
          <p className="text-sm font-semibold mb-4 text-center" style={{ color: C.red }}>{loadError}</p>
        )}

        {(allFound || solved) && (
          <div className="rounded-2xl p-5 mb-4 text-center border w-full" style={{ backgroundColor: C.hi, borderColor: C.f1 }}>
            <p className="text-3xl mb-2">🎉</p>
            <p className="font-bold text-lg" style={{ color: C.text }}>
              {solved && !allFound ? "Puzzle solved!" : "All words found!"}
            </p>
            <button
              onClick={() => newPuzzle(wordBank)}
              className="mt-3 rounded-2xl font-bold text-base"
              style={{ background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: "#fff", padding: "14px 24px", minHeight: 48 }}
            >
              New Puzzle
            </button>
          </div>
        )}

        {/* Grid */}
        <div
          className="select-none mb-5 rounded-2xl overflow-hidden border w-full max-w-sm"
          style={{ backgroundColor: C.surface, borderColor: C.border }}
          onMouseLeave={endSelect}
        >
          {grid.map((row, r) => (
            <div key={r} className="flex">
              {row.map((letter, c) => {
                const sel = isSelected(r, c);
                const fnd = isFoundCell(r, c);
                return (
                  <div
                    key={c}
                    className="flex items-center justify-center font-bold text-base cursor-pointer transition-colors"
                    style={{
                      width: `${100 / GRID_SIZE}%`,
                      aspectRatio: "1",
                      backgroundColor: fnd ? C.green + "33" : sel ? C.f1 + "44" : "transparent",
                      color: fnd ? C.green : sel ? C.f1 : C.text,
                    }}
                    onMouseDown={() => startSelect(r, c)}
                    onMouseEnter={() => continueSelect(r, c)}
                    onMouseUp={endSelect}
                    onTouchStart={() => startSelect(r, c)}
                    onTouchEnd={endSelect}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Word list */}
        <div className="flex flex-wrap gap-2 justify-center w-full max-w-sm">
          {activeWords.map((w) => {
            const isFound = found.includes(w);
            return (
              <span key={w} className="px-3 py-1.5 rounded-full text-sm font-bold border" style={{
                backgroundColor: isFound ? C.green + "22" : C.surface,
                borderColor: isFound ? C.green : C.border,
                color: isFound ? C.green : C.muted,
                textDecoration: isFound ? "line-through" : "none",
              }}>{w}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
