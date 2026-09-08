import type { Metadata } from "next";
import ReadingPlansClient from "./ReadingPlansClient";

export const metadata: Metadata = {
  title: "Reading Plans | FaithSpark",
  description: "Structured, guided journeys through Scripture.",
};

export default function ReadingPlansPage() {
  return <ReadingPlansClient />;
}
