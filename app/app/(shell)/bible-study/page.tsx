import type { Metadata } from "next";
import BibleStudyClient from "./BibleStudyClient";

export const metadata: Metadata = {
  title: "Family Bible Study",
  description: "A 52-week family Bible study — scripture, discussion questions, and a family activity each week.",
};

export default function BibleStudyPage() {
  return <BibleStudyClient />;
}
