import type { Metadata } from "next";
import FaithDiceClient from "./FaithDiceClient";

export const metadata: Metadata = {
  title: "Faith Dice",
  description: "Classic Yahtzee with a faith twist.",
};

export default function FaithDicePage() {
  return <FaithDiceClient />;
}
