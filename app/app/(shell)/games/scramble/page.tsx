import type { Metadata } from "next";
import ScrambleClient from "./ScrambleClient";

export const metadata: Metadata = {
  title: "Word Scramble",
  description: "Unscramble faith words, one letter at a time.",
};

export default function ScramblePage() {
  return <ScrambleClient />;
}
