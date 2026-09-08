"use client";

import dynamic from "next/dynamic";

// Touches Firestore (live prayer feed) on mount — client-only so it never
// runs during Next.js static prerendering.
const PrayerBoardClient = dynamic(() => import("./PrayerBoardClient"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--fs-muted)", fontSize: 14 }}>
      Loading Prayer Board…
    </div>
  ),
});

export default function PrayerBoardHub() {
  return <PrayerBoardClient />;
}
