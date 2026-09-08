import type { Metadata } from "next";
import BibleReaderHub from "./BibleReaderHub";

export const metadata: Metadata = {
  title: "Bible Reader | FaithSpark",
  description: "A free, full KJV Bible reader with bookmarks and a scripture finder.",
};

export default function BibleReaderPage() {
  return <BibleReaderHub />;
}
