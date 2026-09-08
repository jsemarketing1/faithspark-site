"use client";

import { useRouter } from "next/navigation";
import { C } from "@/lib/app-content/theme";

const GAME_LIST = [
  { id: "trivia",     icon: "🧠", label: "Bible Trivia",   desc: "Test your Bible knowledge",         to: "/app/games/trivia/",     color: "#5B4B9A", grad: "linear-gradient(145deg, #6B5BB5, #4A3D82)" },
  { id: "wordsearch", icon: "🔍", label: "Word Search",    desc: "Find hidden Bible words",          to: "/app/games/wordsearch/", color: "#2A6B9E", grad: "linear-gradient(145deg, #3A8BC2, #1E5578)" },
  { id: "scramble",   icon: "🔤", label: "Word Scramble",  desc: "Unscramble scripture words",       to: "/app/games/scramble/",   color: "#B86A1A", grad: "linear-gradient(145deg, #D4882E, #9A5510)" },
  { id: "fillin",     icon: "✏️", label: "Fill in Blank",  desc: "Complete the scripture verse",     to: "/app/games/fillin/",     color: "#3A7D52", grad: "linear-gradient(145deg, #4A9A68, #2D6340)" },
  { id: "faithdice",  icon: "🎲", label: "Faith Dice",     desc: "Classic Yahtzee with a faith twist", to: "/app/games/faithdice/",  color: "#9E3D4A", grad: "linear-gradient(145deg, #C25563, #7A2E38)" },
  { id: "sudoku",     icon: "🧩", label: "Bible Sudoku",   desc: "Classic sudoku, faith twist",       to: "/app/games/sudoku/",     color: "#2A7A78", grad: "linear-gradient(145deg, #3A9E9B, #1E5F5D)" },
];

export default function Games() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg, padding: "32px 36px 60px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <span style={{ fontSize: 48 }}>🎮</span>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 700, color: C.text, margin: "10px 0 6px" }}>Faith Games</h1>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Fun Bible-based games to strengthen your knowledge</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          {GAME_LIST.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => router.push(game.to)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: 168,
                padding: "22px 14px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                background: game.grad,
                boxShadow: `0 8px 22px ${game.color}40`,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 28px ${game.color}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = `0 8px 22px ${game.color}40`;
              }}
            >
              <span style={{ fontSize: 38, lineHeight: 1, marginBottom: 12 }}>{game.icon}</span>
              <p style={{ fontWeight: 800, fontSize: 15, color: "#fff", margin: "0 0 6px", lineHeight: 1.25 }}>{game.label}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.88)", margin: 0, lineHeight: 1.45 }}>{game.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
