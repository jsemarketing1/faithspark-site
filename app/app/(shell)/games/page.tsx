import type { Metadata } from "next";
import GamesClient from "./GamesClient";

export const metadata: Metadata = {
  title: "Games",
  description: "Fun Bible-based games to strengthen your knowledge — trivia, word search, scramble, and more.",
};

export default function GamesPage() {
  return <GamesClient />;
}
