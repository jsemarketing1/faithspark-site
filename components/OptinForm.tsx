"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const OPTIN_STORAGE_KEY = "fs_optin_done";

const BENEFITS = [
  { icon: "📖", text: "Today's devotional, one tap away" },
  { icon: "✨", text: "A hand-picked read to encourage your week" },
  { icon: "📱", text: "Free access to the FaithSpark app" },
  { icon: "🎨", text: "Free games & printable activities for the family" },
];

export default function OptinForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Starts as "idle" to match the server-rendered HTML, then flips to
  // "success" right after mount if this browser already opted in —
  // so a page refresh doesn't show the signup form again.
  useEffect(() => {
    try {
      if (localStorage.getItem(OPTIN_STORAGE_KEY)) setStatus("success");
    } catch {
      // localStorage unavailable (private browsing, etc.) — just show the form.
    }
  }, []);

  const submitEmail = async (emailToSubmit: string) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToSubmit, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? "Something went wrong, please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      try {
        localStorage.setItem(OPTIN_STORAGE_KEY, "1");
      } catch {
        // localStorage unavailable — the success state just won't persist across a refresh.
      }
    } catch {
      setErrorMsg("Something went wrong, please try again.");
      setStatus("error");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitEmail(email);
  };

  return (
    <div className="optin-box no-print">
      {status === "success" ? (
        <div>
          <p className="optin-success-title">You&apos;re in! 🎉</p>
          <p className="optin-success-desc">Check your email — your welcome gift is on the way.</p>
        </div>
      ) : (
        <div className="optin-inner">
          <div className="optin-left">
            <p className="optin-title">Faith, Delivered to Your Inbox</p>
            <p className="optin-desc">Join our free newsletter for encouragement that actually feels personal.</p>
            <ul className="optin-benefits">
              {BENEFITS.map((b) => (
                <li key={b.text}>
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="optin-right">
            <form onSubmit={handleSubmit} className="optin-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="optin-input"
                aria-label="Email address"
              />
              {/* Honeypot — hidden from real users via CSS, bots tend to fill every field */}
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="optin-honeypot"
              />
              <button type="submit" disabled={status === "loading"} className="optin-btn">
                {status === "loading" ? "Joining…" : "Sign Up Free"}
              </button>
            </form>
            {status === "error" && <p className="optin-error">{errorMsg}</p>}
            <div className="optin-divider">
              <span />
              <em>or</em>
              <span />
            </div>
            <GoogleSignInButton onEmail={submitEmail} disabled={status === "loading"} />
          </div>
        </div>
      )}
    </div>
  );
}
