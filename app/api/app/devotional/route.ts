import { NextRequest, NextResponse } from "next/server";

const FALLBACK = `**Walking in Faith**\n\n**Verse:** "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." — 2 Timothy 1:7\n\nGod sees exactly where you are right now. He is not surprised by what you are feeling, and He is not distant.\n\nToday, He invites you to lay down what is heavy. You don't have to carry it alone. His grace is sufficient for this moment.\n\n**Application:** Take five quiet minutes today and simply tell God how you feel — just as you would a trusted friend.\n\n**Prayer:** Lord, thank You for knowing me completely and loving me still. In Jesus' name, Amen.`;

const SYSTEM_PROMPT =
  "You are FaithSpark, a deeply personal Christian devotional writer. You write with the warmth of Max Lucado, the depth of Spurgeon, and the accessibility of Rick Warren. Every devotional must feel written specifically for one person.";

export async function POST(req: NextRequest) {
  let body: {
    feeling?: string;
    firstName?: string;
    profileCtx?: string;
    recentScriptures?: string[];
    lens?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const feeling = (body.feeling ?? "").trim();
  if (!feeling) {
    return NextResponse.json({ error: "Please share how you're feeling." }, { status: 400 });
  }

  const firstName = body.firstName || "friend";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const recentScriptures = (body.recentScriptures ?? []).filter(Boolean);
  const lens = body.lens ?? "Grace in suffering";

  const userPrompt = [
    `Today: ${today}`,
    body.profileCtx && `\nPROFILE:\n${body.profileCtx}`,
    `\nFEELING: "${feeling}"`,
    `\nSpeak DIRECTLY to exactly what they typed. Not generic.`,
    recentScriptures.length > 0 && `\nDO NOT use: ${recentScriptures.join(", ")}`,
    `\nLENS: "${lens}"`,
    `\nFORMAT:\n**[Bold title]**\n\n**Verse:** "[KJV verse]" — [Reference]\n\n[3 paragraphs]\n\n**Application:** [One concrete step]\n\n**Prayer:** [Personal prayer using ${firstName}]`,
  ]
    .filter(Boolean)
    .join("");

  let text = "";
  const geminiKey = process.env.GEMINI_API_KEY ?? "";

  if (geminiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents: [{ role: "user", parts: [{ text: userPrompt }] }] }),
      });
      const d = await res.json();
      text = d.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    } catch (e) {
      console.error("[devotional] Gemini call failed:", e);
    }
  }

  if (!text) text = FALLBACK;

  return NextResponse.json({ text });
}
