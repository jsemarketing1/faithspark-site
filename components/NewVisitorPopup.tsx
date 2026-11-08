"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { usePathname } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";

// ── Config ────────────────────────────────────────────────────────────────
const TRACKING_SLUG = "faithspark-popup";
const CLICK_URL = `https://mindgardenpress.com/go/${TRACKING_SLUG}/`; // records a click (engagement) in Tracking Links
const VIEW_URL = "https://mindgardenpress.com/api/track-view/"; // records a view (popup shown)
const SUBSCRIBE_URL = "/api/subscribe/"; // proxies to mindgardenpress.com
const SUBSCRIBE_SOURCE = "faithspark_site";
const GUIDES_URL = "https://mindgardenpress.com/faithspark-app/downloads/";
const FONT_HEADING = "var(--font-playfair), serif";
const COLOR_DARK = "var(--fs-dark)";
const COLOR_GREEN = "var(--fs-green)";
const COLOR_GOLD = "#C8762A";

const SHOWN_KEY = "fs_popup_shown_at_v2"; // timestamp of the last time it was shown
const SUBSCRIBED_KEY = "fs_optin_done"; // shared with OptinForm
const PAGEVIEWS_KEY = "fs_pv"; // sessionStorage page counter
const RESHOW_AFTER_DAYS = 30;

// Triggers (whichever comes first). Waiting for real interest instead of
// popping up on arrival converts better and avoids Google's mobile
// "intrusive interstitial" penalty.
const TIME_TRIGGER_MS = 30_000; // 30s on the site
const SECOND_PAGE_DELAY_MS = 4_000; // 4s into their 2nd page
const SCROLL_TRIGGER = 0.5; // scrolled halfway down a page
const MIN_MS_BEFORE_SCROLL_OR_EXIT = 6_000; // don't fire on a fast first scroll/flick

// Pages where a "join our list" popup would be redundant or unwelcome.
const EXCLUDED_PREFIXES = ["/app", "/delete-account"];

const PERKS = [
  "Family Bible Study & Sunday School printables",
  "Free coloring pages & family activities",
  "One encouraging devotional email a week",
];

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function safeSet(store: Storage | undefined, key: string, value: string) {
  try {
    store?.setItem(key, value);
  } catch {}
}
function gaEvent(name: string) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, { popup: TRACKING_SLUG });
  } catch {}
}

/**
 * New-visitor popup promoting the email list with a concrete free gift (the
 * printable guides the welcome email links to). Shown when the visitor shows
 * interest: 2nd page, half-page scroll, 30s on site, or exit intent on desktop.
 * At most once every 30 days per browser, never after subscribing. Phones get
 * a short bottom sheet instead of a full-screen modal.
 *
 * Tracking (mindgardenpress.com admin → Tracking Links, slug "faithspark-popup"):
 *   views   = popup shown          (POST mindgardenpress.com/api/track-view)
 *   clicks  = started signing up   (GET mindgardenpress.com/go/faithspark-popup, on first tap of the form)
 *   signups = successful subscribe (trackingSlug passed through /api/subscribe)
 */
export default function NewVisitorPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);
  const engagedRef = useRef(false);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const excluded = EXCLUDED_PREFIXES.some((p) => pathname === p || pathname?.startsWith(p + "/"));

  const show = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    safeSet(typeof window !== "undefined" ? localStorage : undefined, SHOWN_KEY, String(Date.now()));
    setVisible(true);
    fetch(VIEW_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ slug: TRACKING_SLUG }),
      keepalive: true,
    }).catch(() => {});
    gaEvent("popup_view");
  }, []);

  // Count pages viewed this session (client-side navigations included).
  useEffect(() => {
    const n = Number(safeGet(sessionStorage, PAGEVIEWS_KEY) ?? "0") + 1;
    safeSet(sessionStorage, PAGEVIEWS_KEY, String(n));
  }, [pathname]);

  useEffect(() => {
    if (excluded) {
      setVisible(false);
      return;
    }
    if (shownRef.current) return;

    if (safeGet(localStorage, SUBSCRIBED_KEY)) return;
    const lastShown = Number(safeGet(localStorage, SHOWN_KEY) ?? "0");
    if (lastShown && Date.now() - lastShown < RESHOW_AFTER_DAYS * 86_400_000) return;
    // If storage is blocked entirely, stay quiet rather than popping up on every load.
    try {
      localStorage.getItem("x");
    } catch {
      return;
    }

    const pageStart = Date.now();
    const timers: ReturnType<typeof setTimeout>[] = [];
    const pageviews = Number(safeGet(sessionStorage, PAGEVIEWS_KEY) ?? "1");
    timers.push(setTimeout(show, pageviews >= 2 ? SECOND_PAGE_DELAY_MS : TIME_TRIGGER_MS));

    const onScroll = () => {
      if (Date.now() - pageStart < MIN_MS_BEFORE_SCROLL_OR_EXIT) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable > 200 && window.scrollY / scrollable >= SCROLL_TRIGGER) show();
    };
    const onMouseOut = (e: MouseEvent) => {
      // Exit intent: cursor leaves through the top of the window (desktop only).
      if (e.relatedTarget || e.clientY > 0) return;
      if (Date.now() - pageStart < MIN_MS_BEFORE_SCROLL_OR_EXIT) return;
      show();
    };
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;

    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) document.addEventListener("mouseout", onMouseOut);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname, excluded, show]);

  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  function trackEngage() {
    if (engagedRef.current) return;
    engagedRef.current = true;
    fetch(CLICK_URL, { method: "GET", mode: "no-cors", keepalive: true }).catch(() => {});
    gaEvent("popup_engage");
  }

  const submitEmail = async (emailToSubmit: string) => {
    trackEngage();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToSubmit,
          company,
          source: SUBSCRIBE_SOURCE,
          trackingSlug: TRACKING_SLUG,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? "Something went wrong, please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      safeSet(localStorage, SUBSCRIBED_KEY, "1");
      gaEvent("popup_signup");
    } catch {
      setErrorMsg("Something went wrong, please try again.");
      setStatus("error");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitEmail(email);
  };

  if (!visible || excluded) return null;

  return (
    <div className="nvp-backdrop no-print" onClick={dismiss}>
      <style>{`
        .nvp-backdrop { position: fixed; inset: 0; background: rgba(10,20,15,0.6); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 1.25rem;
          animation: nvp-fade .25s ease-out; }
        .nvp-card { background: linear-gradient(135deg, ${COLOR_DARK} 0%, ${COLOR_GREEN} 100%); color: #fff;
          border-radius: 18px; padding: 1.6rem 1.5rem 1.15rem; max-width: 400px; width: 100%;
          text-align: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.35);
          animation: nvp-pop .3s ease-out; max-height: calc(100dvh - 1.5rem); overflow-y: auto;
          scrollbar-width: none; }
        .nvp-card::-webkit-scrollbar { display: none; }
        .nvp-close { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.14); border: none;
          color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem; line-height: 32px; }
        .nvp-badge { display: inline-block; background: ${COLOR_GOLD}; color: #fff; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.65rem; border-radius: 999px; margin-bottom: 0.6rem; }
        .nvp-title { font-family: ${FONT_HEADING}; font-size: 1.25rem; font-weight: 700; line-height: 1.25; margin: 0 0 0.4rem; padding: 0 1.25rem; }
        .nvp-sub { font-size: 0.86rem; color: rgba(255,255,255,0.88); line-height: 1.45; margin: 0 0 0.8rem; }
        .nvp-perks { list-style: none; margin: 0 0 0.9rem; padding: 0; display: flex; flex-direction: column;
          gap: 0.28rem; text-align: left; }
        .nvp-perks li { display: flex; gap: 0.5rem; font-size: 0.82rem; color: rgba(255,255,255,0.92); }
        .nvp-perks li::before { content: "✓"; color: #8FE3B0; font-weight: 700; }
        .nvp-form { display: flex; flex-direction: column; gap: 0.5rem; }
        .nvp-input { width: 100%; box-sizing: border-box; border: none; border-radius: 10px; padding: 0.7rem 1rem;
          font-size: 16px; font-family: inherit; color: ${COLOR_DARK}; }
        .nvp-submit { width: 100%; border: none; border-radius: 10px; background: ${COLOR_GOLD}; color: #fff;
          font-weight: 700; font-size: 0.95rem; padding: 0.75rem 1rem; cursor: pointer; font-family: inherit;
          transition: transform .15s, filter .15s; }
        .nvp-submit:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .nvp-submit:disabled { opacity: 0.7; cursor: default; transform: none; }
        .nvp-fine { font-size: 0.7rem; color: rgba(255,255,255,0.6); margin: 0; }
        .nvp-or { display: flex; align-items: center; gap: 0.6rem; margin: 0; }
        .nvp-or div { flex: 1; height: 1px; background: rgba(255,255,255,0.2); }
        .nvp-or span { font-size: 0.72rem; color: rgba(255,255,255,0.6); }
        .nvp-google { display: flex; justify-content: center; }
        .nvp-google > div { width: 100%; }
        .nvp-no { background: none; border: none; color: rgba(255,255,255,0.6); font-size: 0.76rem; margin-top: 0.55rem;
          cursor: pointer; text-decoration: underline; padding: 0.2rem; }
        .nvp-cta { display: inline-block; margin-top: 1rem; background: ${COLOR_GOLD}; color: #fff; text-decoration: none;
          font-weight: 700; padding: 0.7rem 1.2rem; border-radius: 10px; }
        @keyframes nvp-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes nvp-pop { from { opacity: 0; transform: translateY(12px) scale(.98) } to { opacity: 1; transform: none } }
        @keyframes nvp-up { from { transform: translateY(100%) } to { transform: none } }
        @media (max-width: 560px) {
          .nvp-backdrop { align-items: flex-end; padding: 0; background: rgba(10,20,15,0.45); }
          .nvp-card { border-radius: 18px 18px 0 0; max-width: none; padding: 1.4rem 1.15rem calc(1rem + env(safe-area-inset-bottom));
            animation: nvp-up .3s ease-out; }
          .nvp-title { font-size: 1.15rem; }
          .nvp-sub { font-size: 0.86rem; margin-bottom: 0.85rem; }
          .nvp-perks { display: none; }
          .nvp-badge { margin-bottom: 0.55rem; }
          .nvp-no { margin-top: 0.4rem; }
        }
        @media (max-height: 720px) {
          .nvp-perks, .nvp-fine { display: none; }
          .nvp-card { padding-top: 1.2rem; }
          .nvp-title { font-size: 1.12rem; }
          .nvp-sub { font-size: 0.82rem; margin-bottom: 0.65rem; }
          .nvp-input, .nvp-submit { padding-top: 0.6rem; padding-bottom: 0.6rem; }
        }
      `}</style>

      <div
        className="nvp-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nvp-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={dismiss} aria-label="Close" className="nvp-close">
          ✕
        </button>

        {status === "success" ? (
          <>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>🎁</div>
            <h2 id="nvp-title" className="nvp-title">
              Your Free Guides Are on the Way!
            </h2>
            <p className="nvp-sub" style={{ marginBottom: 0 }}>
              Check your inbox for an email from FaithSpark. If you don&apos;t see it in a minute, look in your
              Promotions or Spam folder.
            </p>
            <a href={GUIDES_URL} className="nvp-cta" onClick={dismiss} target="_blank" rel="noopener noreferrer">
              Browse the Free Guides Now →
            </a>
          </>
        ) : (
          <>
            <span className="nvp-badge">🎁 Free Gift</span>
            <h2 id="nvp-title" className="nvp-title">
              Free Printable Bible Study Guides for Your Family
            </h2>
            <p className="nvp-sub">
              Enter your email and we&apos;ll send them to you right now, free.
            </p>

            <ul className="nvp-perks">
              {PERKS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <form
              onSubmit={handleSubmit}
              className="nvp-form"
              onFocusCapture={trackEngage}
              onPointerDownCapture={trackEngage}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                autoComplete="email"
                inputMode="email"
                className="nvp-input"
              />

              {/* Honeypot: hidden from real users, bots tend to fill every field */}
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: -9999, width: 0, height: 0, opacity: 0 }}
              />

              <button type="submit" disabled={status === "loading"} className="nvp-submit">
                {status === "loading" ? "Sending…" : "Send Me the Free Guides"}
              </button>

              {status === "error" && (
                <p style={{ color: "#ffd7d7", fontSize: "0.78rem", margin: 0 }}>{errorMsg}</p>
              )}

              <p className="nvp-fine">100% free. No spam, unsubscribe anytime.</p>

              <div className="nvp-or">
                <div />
                <span>or</span>
                <div />
              </div>
              <div className="nvp-google">
                <GoogleSignInButton onEmail={submitEmail} disabled={status === "loading"} />
              </div>
            </form>

            <button type="button" onClick={dismiss} className="nvp-no">
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
