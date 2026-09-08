import type { Metadata } from "next";
import FillInClient from "./FillInClient";

export const metadata: Metadata = {
  title: "Fill in the Blank",
  description: "Complete the scripture verse, one word at a time.",
};

export default function FillInPage() {
  return <FillInClient />;
}
