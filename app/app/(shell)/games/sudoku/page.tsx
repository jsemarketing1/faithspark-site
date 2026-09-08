import type { Metadata } from "next";
import SudokuClient from "./SudokuClient";

export const metadata: Metadata = {
  title: "Bible Sudoku",
  description: "Classic sudoku, faith twist — three difficulty levels.",
};

export default function SudokuPage() {
  return <SudokuClient />;
}
