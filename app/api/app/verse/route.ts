import { NextResponse } from "next/server";

const PROMPT =
  'Give me one powerful Bible verse for today. Return ONLY a JSON object with exactly two fields: { "verse": "the verse text here", "ref": "Book Chapter:Verse" } No explanation. No markdown. Just the raw JSON.';

export async function GET() {
  const geminiKey = process.env.GEMINI_API_KEY ?? "";
  if (!geminiKey) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${geminiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: PROMPT }] }] }),
    });
    const data = await res.json();
    const text = (data.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    if (!parsed.verse || !parsed.ref) throw new Error("Malformed response");
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("[verse] Gemini call failed:", e);
    return NextResponse.json({ error: "Could not fetch a verse." }, { status: 502 });
  }
}
