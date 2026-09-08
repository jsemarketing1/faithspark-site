import type { Metadata } from "next";
import BibleReaderHub from "./BibleReaderHub";

export const metadata: Metadata = {
  title: "Bible Reader",
  description: "A free, full KJV Bible reader with bookmarks and a scripture finder.",
};

export default function BibleReaderPage() {
  return <BibleReaderHub />;
}
