import type { Metadata } from "next";
import JournalClient from "./JournalClient";

export const metadata: Metadata = {
  title: "Journal",
  description: "A private space to write out what's on your heart.",
};

export default function JournalPage() {
  return <JournalClient />;
}
