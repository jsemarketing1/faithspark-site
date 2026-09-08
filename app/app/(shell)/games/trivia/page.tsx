import type { Metadata } from "next";
import TriviaClient from "./TriviaClient";

export const metadata: Metadata = {
  title: "Bible Trivia",
  description: "Test your Bible knowledge with rounds of trivia questions.",
};

export default function TriviaPage() {
  return <TriviaClient />;
}
