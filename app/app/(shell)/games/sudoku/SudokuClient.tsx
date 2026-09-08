"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";
import { SUDOKU_PUZZLES, type SudokuDifficulty } from "@/lib/app-content/sudokuPuzzles";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DIFFICULTY_META: Record<SudokuDifficulty, { label: string; desc: string; colorKey: string }> = {
  easy: {
    label: "Easy",
    desc: "36–45 clues · solve by scanning rows, columns, and boxes",
    colorKey: "green",
  },
  medium: {
    label: "Medium",
    desc: "30–35 clues · candidate elimination required",
    colorKey: "f1",
  },
  hard: {
    label: "Hard",
    desc: "26–30 clues · multiple solving techniques",
    colorKey: "red",
  },
};

function countGivens(puzzle: readonly (readonly number[])[]) {
  return puzzle.flat().filter((v) => v !== 0).length;
}

function puzzleToBoard(puzzle: readonly (readonly number[])[]) {
  return puzzle.map((row) => row.map((v) => v));
}

function puzzleToFixed(puzzle: readonly (readonly number[])[]) {
  return puzzle.map((row) => row.map((v) => v !== 0));
}

export default function Sudoku() {
  const router = useRouter();

  const [difficulty, setDifficulty] = useState<SudokuDifficulty>("easy");
  const config = SUDOKU_PUZZLES[difficulty];
  const givens = useMemo(() => countGivens(config.puzzle), [config.puzzle]);

  const [board, setBoard] = useState<number[][]>(() => puzzleToBoard(config.puzzle));
  const [fixed, setFixed] = useState<boolean[][]>(() => puzzleToFixed(config.puzzle));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const [won, setWon] = useState(false);

  const loadDifficulty = (level: SudokuDifficulty) => {
    const next = SUDOKU_PUZZLES[level];
    setDifficulty(level);
    setBoard(puzzleToBoard(next.puzzle));
    setFixed(puzzleToFixed(next.puzzle));
    setSelected(null);
    setErrors(new Set());
    setChecked(false);
    setWon(false);
  };

  const resetPuzzle = () => {
    setBoard(puzzleToBoard(config.puzzle));
    setSelected(null);
    setErrors(new Set());
    setChecked(false);
    setWon(false);
  };

  const checkConflicts = (b: number[][], r: number, c: number, val: number) => {
    const errs = new Set<string>();
    if (val === 0) return errs;
    for (let cc = 0; cc < 9; cc++) {
      if (cc !== c && b[r][cc] === val) {
        errs.add(r + "," + cc);
        errs.add(r + "," + c);
      }
    }
    for (let rr = 0; rr < 9; rr++) {
      if (rr !== r && b[rr][c] === val) {
        errs.add(rr + "," + c);
        errs.add(r + "," + c);
      }
    }
    const br = Math.floor(r / 3) * 3;
    const bc = Math.floor(c / 3) * 3;
    for (let rr = br; rr < br + 3; rr++) {
      for (let cc = bc; cc < bc + 3; cc++) {
        if ((rr !== r || cc !== c) && b[rr][cc] === val) {
          errs.add(rr + "," + cc);
          errs.add(r + "," + c);
        }
      }
    }
    return errs;
  };

  const recomputeErrors = (b: number[][]) => {
    const allErrors = new Set<string>();
    for (let rr = 0; rr < 9; rr++) {
      for (let cc = 0; cc < 9; cc++) {
        const errs = checkConflicts(b, rr, cc, b[rr][cc]);
        errs.forEach((e) => allErrors.add(e));
      }
    }
    return allErrors;
  };

  const fillCell = (num: number) => {
    if (!selected || won) return;
    const [r, c] = selected;
    if (fixed[r]?.[c]) return;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);
    setChecked(false);
    const allErrors = recomputeErrors(newBoard);
    setErrors(allErrors);
    const solved = newBoard.every((row, rr) =>
      row.every((v, cc) => v === config.solution[rr][cc])
    );
    if (solved) setWon(true);
  };

  const checkAnswers = () => {
    setChecked(true);
    const allErrors = recomputeErrors(board);
    setErrors(allErrors);
    const solved = board.every((row, rr) =>
      row.every((v, cc) => v === config.solution[rr][cc])
    );
    if (solved) setWon(true);
  };

  const diffColor = (key: string) => {
    if (key === "green") return C.green;
    if (key === "red") return C.red;
    return C.f1;
  };

  const selRow = selected?.[0] ?? -1;
  const selCol = selected?.[1] ?? -1;

  const cellBg = (r: number, c: number, isFixed: boolean, isErr: boolean, isSel: boolean) => {
    if (checked && isErr) return C.red + "22";
    if (checked && !isFixed && board[r][c] === config.solution[r][c]) return C.green + "22";
    if (isSel) return C.f1 + "33";
    if (selected && (r === selRow || c === selCol ||
      (Math.floor(r / 3) === Math.floor(selRow / 3) && Math.floor(c / 3) === Math.floor(selCol / 3)))) {
      return C.hi;
    }
    return "transparent";
  };

  const btnPrimary = {
    padding: "14px 20px", minHeight: 48, borderRadius: 14, border: "none",
    fontWeight: 800, fontSize: 15, cursor: "pointer",
    background: "linear-gradient(135deg, " + C.f1 + ", " + C.f2 + ")",
    color: C.onPrimary,
  };

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
          <p className="font-extrabold text-lg leading-tight" style={{ color: C.text }}>Sudoku</p>
          <p className="text-xs" style={{ color: C.muted }}>{givens} clues · {DIFFICULTY_META[difficulty].label}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5">
        {/* Difficulty */}
        <div
          className="flex gap-1 mb-3 p-1 rounded-2xl"
          style={{ backgroundColor: C.hi, border: "1px solid " + C.border }}
        >
          {(["easy", "medium", "hard"] as SudokuDifficulty[]).map((level) => {
            const meta = DIFFICULTY_META[level];
            const active = difficulty === level;
            const accent = diffColor(meta.colorKey);
            return (
              <button
                key={level}
                type="button"
                onClick={() => loadDifficulty(level)}
                className="flex-1 rounded-xl font-bold text-sm"
                style={{
                  padding: "12px 8px", minHeight: 44, border: "none", cursor: "pointer",
                  background: active ? "linear-gradient(135deg, " + accent + ", " + C.f2 + ")" : "transparent",
                  color: active ? "#fff" : C.muted,
                }}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-center mb-4" style={{ color: C.dim, lineHeight: 1.5 }}>
          {DIFFICULTY_META[difficulty].desc}
        </p>

        {won && (
          <div className="rounded-2xl p-5 mb-4 text-center border" style={{ backgroundColor: C.hi, borderColor: C.f1 }}>
            <p className="text-3xl mb-2">🏆</p>
            <p className="font-bold text-xl mb-1" style={{ color: C.text }}>Puzzle Solved!</p>
            <p className="text-sm mb-3" style={{ color: C.muted }}>{DIFFICULTY_META[difficulty].label} complete</p>
            <button type="button" onClick={resetPuzzle} style={btnPrimary}>
              Play Again
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="border-2 rounded-2xl overflow-hidden mb-4" style={{ borderColor: C.border }}>
          {board.map((row, r) => (
            <div
              key={r}
              className="flex"
              style={{ borderBottom: r < 8 ? "1px solid " + ((r + 1) % 3 === 0 ? C.border2 : C.border) : "none" }}
            >
              {row.map((val, c) => {
                const isFixed = fixed[r]?.[c];
                const isSel = selected?.[0] === r && selected?.[1] === c;
                const isErr = errors.has(r + "," + c);
                const boxBorder = (c + 1) % 3 === 0 && c < 8;
                const displayVal = val === 0 ? "" : String(val);
                const textColor = isFixed
                  ? C.text
                  : checked && val !== 0
                    ? (val === config.solution[r][c] ? C.green : C.red)
                    : isErr
                      ? C.red
                      : isSel
                        ? C.f1
                        : C.muted;

                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => !isFixed && setSelected([r, c])}
                    className="flex-1 aspect-square flex items-center justify-center font-bold transition"
                    style={{
                      backgroundColor: cellBg(r, c, isFixed, isErr, isSel),
                      color: textColor,
                      borderRight: boxBorder ? "2px solid " + C.border2 : "1px solid " + C.border,
                      cursor: isFixed ? "default" : "pointer",
                      fontSize: "1.35rem",
                      minHeight: 46,
                    }}
                  >
                    {displayVal}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Number pad */}
        {selected && !fixed[selected[0]]?.[selected[1]] && (
          <>
            <div className="grid grid-cols-9 gap-2 mb-3">
              {NUMBERS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => fillCell(n)}
                  className="aspect-square rounded-xl flex items-center justify-center font-bold transition"
                  style={{
                    backgroundColor: C.surface,
                    border: "1.5px solid " + C.border,
                    color: C.text,
                    fontSize: "1.1rem",
                    minHeight: 44,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => fillCell(0)}
              className="w-full mb-4 rounded-2xl font-bold text-sm border"
              style={{ borderColor: C.border, color: C.dim, padding: "12px 0", minHeight: 44, backgroundColor: C.surface, cursor: "pointer" }}
            >
              Clear Cell
            </button>
          </>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={resetPuzzle}
            className="flex-1 rounded-2xl border font-bold text-base"
            style={{ borderColor: C.border, color: C.muted, padding: "14px 12px", minHeight: 50, backgroundColor: C.surface, cursor: "pointer" }}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={checkAnswers}
            className="flex-[2] rounded-2xl font-extrabold text-base"
            style={{ ...btnPrimary, width: "auto" }}
          >
            Check Answers
          </button>
        </div>
      </div>
    </div>
  );
}
