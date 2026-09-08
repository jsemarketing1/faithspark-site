"use client";

import { useEffect, useState } from "react";
import { C } from "@/lib/app-content/theme";

const JOURNAL_KEY = "faithspark_journal_v2";

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

type Entry = { id: string; text: string; date: string; preview: string };

export default function JournalClient() {
  const [entryText, setEntryText] = useState("");
  const [saving, setSaving] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  useEffect(() => {
    const raw = lsGet(JOURNAL_KEY);
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  const saveEntry = () => {
    const text = entryText.trim();
    if (!text) return;
    setSaving(true);
    const entry: Entry = {
      id: Date.now().toString(),
      text,
      date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      preview: text.slice(0, 120).replace(/\n/g, " "),
    };
    const updated = [entry, ...entries];
    lsSet(JOURNAL_KEY, JSON.stringify(updated));
    setEntries(updated);
    setEntryText("");
    setSaving(false);
  };

  const deleteEntry = (entry: Entry) => {
    if (!window.confirm("Delete this journal entry permanently?")) return;
    const updated = entries.filter((e) => e.id !== entry.id);
    setEntries(updated);
    lsSet(JOURNAL_KEY, JSON.stringify(updated));
    if (selectedEntry?.id === entry.id) setSelectedEntry(null);
  };

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, color: "#fff", margin: "0 0 4px" }}>My Journal</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.88)", margin: 0 }}>{today}</p>
      </div>

      <div className="fs-content" style={{ maxWidth: 720 }}>
        <div className="fs-card" style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, color: C.f1 }}>New Entry</p>
          <textarea
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder="What's on your heart today? Write freely…"
            rows={7}
            className="fs-input"
            style={{ fontFamily: "Georgia, serif", lineHeight: 1.75, resize: "none", background: "transparent", border: "none", padding: 0 }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={saveEntry} disabled={!entryText.trim() || saving} className="fs-btn-primary">
              {saving ? "Saving…" : "Save Entry"}
            </button>
          </div>
        </div>

        {entries.length > 0 ? (
          <div>
            <p className="fs-label">Past Entries ({entries.length})</p>
            {entries.map((item) => (
              <div key={item.id} className="fs-card" style={{ marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }} onClick={() => setSelectedEntry(item)}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: C.f1 }}>{item.date}</p>
                  <p className="line-clamp-2" style={{ fontSize: 13, lineHeight: 1.6, color: C.muted, margin: 0 }}>
                    {item.preview}{item.text.length > 120 ? "…" : ""}
                  </p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteEntry(item); }} style={{ borderRadius: 10, padding: "4px 8px", fontSize: 12, fontWeight: 700, flexShrink: 0, backgroundColor: C.hi, color: C.dim, border: `1px solid ${C.border}`, cursor: "pointer" }}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>No entries yet. Write your first journal entry above!</p>
          </div>
        )}
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setSelectedEntry(null)}>
          <div className="w-full max-w-lg rounded-t-3xl max-h-[88vh] overflow-y-auto" style={{ backgroundColor: C.bg }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 pt-5 pb-4">
              <p className="font-bold text-sm" style={{ color: C.f1 }}>{selectedEntry.date}</p>
              <button onClick={() => setSelectedEntry(null)} className="rounded-2xl px-3 py-1 text-sm font-semibold border" style={{ backgroundColor: C.hi, color: C.muted, borderColor: C.border }}>
                Close
              </button>
            </div>
            <div className="px-6 pb-12">
              <p className="text-base leading-8 whitespace-pre-wrap" style={{ color: C.text, fontFamily: "Georgia, serif" }}>{selectedEntry.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
