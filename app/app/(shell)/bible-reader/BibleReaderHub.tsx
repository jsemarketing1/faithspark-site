"use client";

import dynamic from "next/dynamic";

// Touches Firestore (bookmarks) on mount — client-only so it never runs
// during Next.js static prerendering.
const BibleReaderClient = dynamic(() => import("./BibleReaderClient"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--fs-muted)", fontSize: 14 }}>
      Loading Bible Reader…
    </div>
  ),
});

export default function BibleReaderHub() {
  return <BibleReaderClient />;
}
