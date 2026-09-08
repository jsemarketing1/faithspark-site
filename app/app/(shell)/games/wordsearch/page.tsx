import type { Metadata } from "next";
import WordSearchClient from "./WordSearchClient";

export const metadata: Metadata = {
  title: "Word Search",
  description: "Find hidden Bible words in a classic word search puzzle.",
};

export default function WordSearchPage() {
  return <WordSearchClient />;
}
