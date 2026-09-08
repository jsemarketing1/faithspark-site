"use client";

import dynamic from "next/dynamic";

// Touches Firestore (reading progress) on mount — client-only so it never
// runs during Next.js static prerendering.
const HomeClient = dynamic(() => import("./HomeClient"), { ssr: false });

export default function HomeHub() {
  return <HomeClient />;
}
