"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, onSnapshot, type Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";

type Bookmark = {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  verseText?: string;
  createdAt?: Timestamp;
};

export default function SidebarBookmarks({ onNavigate }: { onNavigate?: () => void }) {
  const { uid } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (!uid || !db) {
      setBookmarks([]);
      return;
    }
    const unsub = onSnapshot(
      collection(db, "users", uid, "bibleBookmarks"),
      (snap) => setBookmarks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Bookmark))),
      () => setBookmarks([])
    );
    return unsub;
  }, [uid]);

  const sorted = [...bookmarks]
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
    .slice(0, 6);

  return (
    <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--fs-border)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 8px" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fs-muted)" }}>
          Saved Verses
        </span>
        {sorted.length > 0 && (
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--fs-green)", background: "rgba(45,106,79,0.1)", borderRadius: 8, padding: "1px 6px" }}>
            {bookmarks.length}
          </span>
        )}
      </div>
      {sorted.length === 0 ? (
        <p style={{ margin: 0, padding: "2px 8px", fontSize: "0.75rem", color: "var(--fs-muted)", lineHeight: 1.5 }}>
          Bookmark a verse in Bible Reader and it will show up here.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {sorted.map((bm) => (
            <Link
              key={bm.id}
              href={`/app/bible-reader/?book=${encodeURIComponent(bm.book)}&ch=${bm.chapter}&verse=${bm.verse}`}
              onClick={onNavigate}
              style={{ padding: "7px 10px", borderRadius: 8, border: "1px solid var(--fs-border)", background: "var(--fs-cream)", textDecoration: "none", display: "block" }}
            >
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--fs-green)" }}>
                {bm.book} {bm.chapter}:{bm.verse}
              </div>
              {bm.verseText && (
                <div style={{ fontSize: "0.68rem", color: "var(--fs-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontStyle: "italic" }}>
                  &ldquo;{bm.verseText}&rdquo;
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
