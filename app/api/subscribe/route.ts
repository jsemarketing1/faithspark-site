import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPSTREAM = "https://mindgardenpress.com/api/subscribe/";

// Proxies straight into mindgardenpress-site's /api/subscribe endpoint, which
// already owns the subscribers Firestore collection, the Resend audience,
// and the welcome-email send — so FaithSpark signups get the exact same
// welcome email as mindgardenpress.com signups, with no duplicated template.
export async function POST(req: NextRequest) {
  let body: { email?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field — real visitors never fill this hidden input, bots usually do.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify({ email, company: "", source: "faithspark_site" }),
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e) {
    console.error("[Subscribe] Upstream request failed:", e);
    return NextResponse.json({ error: "Something went wrong, please try again." }, { status: 500 });
  }
}
