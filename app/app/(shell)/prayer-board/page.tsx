import type { Metadata } from "next";
import PrayerBoardHub from "./PrayerBoardHub";

export const metadata: Metadata = {
  title: "Prayer Board",
  description: "Share a prayer request or lift someone else's up — a community prayer wall.",
};

export default function PrayerBoardPage() {
  return <PrayerBoardHub />;
}
