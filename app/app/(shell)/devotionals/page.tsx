import type { Metadata } from "next";
import DevotionalsClient from "./DevotionalsClient";

export const metadata: Metadata = {
  title: "Devotionals",
  description: "A free daily devotional, or one written just for you based on how you're feeling today.",
};

export default function DevotionalsPage() {
  return <DevotionalsClient />;
}
