"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { usePathname } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const SEEN_KEY = "fs_popup_seen_v1";
// Same key OptinForm sets, so anyone who already joined via the inline form never sees the popup.
const OPTIN_KEY = "fs_optin_done";
const SHOW_DELAY_MS = 4000;
const TRACKING_SLUG = "faithspark-popup";
const TRACKING_URL = `https://mindgardenpress.com/go/${TRACKING_SLUG}/`;

// Pages where a "join our list" popup would be redundant or unwelcome.
const EXCLUDED_PREFIXES = ["/app", "/delete-account"];

const HIGHLIGHTS = [
  { icon: "📬", text: "A weekly newsletter in your inbox" },
  { icon: "🎨", text: "Free activities for the whole family" },
  { icon: "📰", text: "The week's top news articles" },
  { icon: "🎮", text: "Fun games to enjoy together" },
];

/**
 * One-time popup for first-time visitors, promoting the email list. Shown once
 * per browser (localStorage), a few seconds after landing. Tracking runs through
 * the "faithspark-popup" link in the mindgardenpress.com admin Tracking Links panel:
 * a no-cors hit to mindgardenpress.com/go/faithspark-popup records the click when
 * the popup is shown, and a successful submit passes the slug through /api/subscribe
 * so the signup is credited too.
 */
export default function NewVisitorPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const trackedClick = useRef(false);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname?.startsWith(p + "/"))) {
      setVisible(false);
      return;
    }

    let alreadySeen = true;
    try {
      alreadySeen = localStorage.getItem(SEEN_KEY) === "1" || !!localStorage.getItem(OPTIN_KEY);
    } catch {
      // Storage blocked: treat as seen so it never turns into a popup on every load.
    }
    if (alreadySeen) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!visible || trackedClick.current) return;
    trackedClick.current = true;
    // Cross-origin: no-cors lets the request (and its redirect) go through so the
    // click is recorded; we don't need to read the response.
    fetch(TRACKING_URL, { method: "GET", mode: "no-cors", keepalive: true }).catch(() => {});
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  function markSeen() {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }

  function dismiss() {
    setVisible(false);
    markSeen();
  }

  const submitEmail = async (emailToSubmit: string) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToSubmit, company, trackingSlug: TRACKING_SLUG }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? "Something went wrong, please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      markSeen();
      try {
        localStorage.setItem(OPTIN_KEY, "1");
      } catch {}
    } catch {
      setErrorMsg("Something went wrong, please try again.");
      setStatus("error");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitEmail(email);
  };

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className="no-print"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,20,15,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fs-popup-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, var(--fs-dark) 0%, var(--fs-green) 100%)",
          color: "#fff",
          borderRadius: 18,
          padding: "2.25rem 1.85rem 1.75rem",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.12)",
            border: "none",
            color: "#fff",
            width: 28,
            height: 28,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: "28px",
          }}
        >
          ✕
        </button>

        {status === "success" ? (
          <>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.6rem" }}>📬</div>
            <h2
              id="fs-popup-title"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                margin: "0 0 0.6rem",
              }}
            >
              Please Check Your Inbox!
            </h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
              You&apos;re on the list. We just sent you a welcome email, take a look.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔥</div>
            <h2
              id="fs-popup-title"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                margin: "0 0 0.85rem",
              }}
            >
              Faith, Delivered to Your Inbox
            </h2>

            <ul
              style={{
                listStyle: "none",
                margin: "0 0 1.4rem",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                textAlign: "left",
              }}
            >
              {HIGHLIGHTS.map((h) => (
                <li
                  key={h.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  <span>{h.icon}</span>
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "none",
                  borderRadius: 10,
                  padding: "0.75rem 1rem",
                  fontSize: "0.92rem",
                  fontFamily: "inherit",
                  color: "var(--fs-dark)",
                }}
              />

              {/* Honeypot — hidden from real users, bots tend to fill every field */}
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: -9999, width: 0, height: 0, opacity: 0 }}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="optin-btn"
                style={{ width: "100%", fontSize: "0.95rem", padding: "0.75rem 1rem" }}
              >
                {status === "loading" ? "Joining…" : "Subscribe Free"}
              </button>

              {status === "error" && (
                <p style={{ color: "#ffd7d7", fontSize: "0.78rem", margin: 0 }}>{errorMsg}</p>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", margin: "0.15rem 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <GoogleSignInButton onEmail={submitEmail} disabled={status === "loading"} />
              </div>
            </form>

            <button
              type="button"
              onClick={dismiss}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.78rem",
                marginTop: "0.9rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
