import type { Metadata } from "next";
import HomeHub from "./HomeHub";

export const metadata: Metadata = {
  title: "Home",
  description: "Your FaithSpark dashboard — devotionals, Bible reading, and today's verse.",
};

export default function AppHomePage() {
  return <HomeHub />;
}
