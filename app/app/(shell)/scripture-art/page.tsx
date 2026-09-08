import type { Metadata } from "next";
import ScriptureArtClient from "./ScriptureArtClient";

export const metadata: Metadata = {
  title: "Scripture Art",
  description: "Create shareable verse cards — pick a background, ambient music, and up to 5 verses.",
};

export default function ScriptureArtPage() {
  return <ScriptureArtClient />;
}
