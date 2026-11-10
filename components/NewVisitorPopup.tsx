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
const LINK_BASE = "https://mindgardenpress.com"; // free resources live on mindgardenpress.com
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

// Everything the welcome email links to, so the popup promises exactly what they get.
const PERKS = [
  { icon: "📄", title: "Printable Guides", desc: "Family Bible Study & Sunday School", href: "/faithspark-app/downloads/" },
  { icon: "📖", title: "Daily Devotionals", desc: "A fresh reading every day", href: "/faithspark-app/devotionals/?view=daily" },
  { icon: "🎧", title: "Bible in a Year", desc: "Narrated aloud, day by day", href: "/faithspark-app/bible-in-a-year/" },
  { icon: "🎨", title: "Coloring Pages", desc: "Free printables for kids", href: "/faithspark-app/activities/coloring/" },
  { icon: "📱", title: "Try the FaithSpark App Free", desc: "Devotionals, Bible reader, prayer journal & more", href: "/faithspark-app/" },
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
          border-radius: 18px; padding: 2rem 1.75rem 1.5rem; max-width: 420px; width: 100%;
          text-align: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.35);
          animation: nvp-pop .3s ease-out; max-height: calc(100vh - 2.5rem); overflow-y: auto; }
        .nvp-close { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.14); border: none;
          color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem; line-height: 32px; }
        .nvp-badge { display: inline-block; background: ${COLOR_GOLD}; color: #fff; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; padding: 0.3rem 0.7rem; border-radius: 999px; margin-bottom: 0.8rem; }
        .nvp-title { font-family: ${FONT_HEADING}; font-size: 1.4rem; font-weight: 700; line-height: 1.25; margin: 0 0 0.55rem; }
        .nvp-sub { font-size: 0.9rem; color: rgba(255,255,255,0.88); line-height: 1.55; margin: 0 0 1rem; }
        .nvp-perks { list-style: none; margin: 0 0 1rem; padding: 0; display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.45rem; text-align: left; }
        .nvp-perk { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.14); border-radius: 10px; padding: 0.5rem 0.6rem;
          color: #fff; text-decoration: none; }
        a.nvp-perk:hover { background: rgba(255,255,255,0.16); }
        .nvp-perk-icon { font-size: 1.2rem; line-height: 1; flex-shrink: 0; }
        .nvp-perk-title { display: block; font-size: 0.8rem; font-weight: 700; line-height: 1.2; }
        .nvp-perk-desc { display: block; font-size: 0.7rem; color: rgba(255,255,255,0.72); line-height: 1.25; margin-top: 1px; }
        .nvp-perk-wide { grid-column: 1 / -1; border-color: ${COLOR_GOLD}; background: rgba(200,118,42,0.18); }
        .nvp-form { display: flex; flex-direction: column; gap: 0.6rem; }
        .nvp-input { width: 100%; box-sizing: border-box; border: none; border-radius: 10px; padding: 0.8rem 1rem;
          font-size: 16px; font-family: inherit; color: ${COLOR_DARK}; }
        .nvp-submit { width: 100%; border: none; border-radius: 10px; background: ${COLOR_GOLD}; color: #fff;
          font-weight: 700; font-size: 1rem; padding: 0.85rem 1rem; cursor: pointer; font-family: inherit;
          transition: transform .15s, filter .15s; }
        .nvp-submit:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .nvp-submit:disabled { opacity: 0.7; cursor: default; transform: none; }
        .nvp-fine { font-size: 0.72rem; color: rgba(255,255,255,0.6); margin: 0.1rem 0 0; }
        .nvp-or { display: flex; align-items: center; gap: 0.6rem; margin: 0.1rem 0; }
        .nvp-or div { flex: 1; height: 1px; background: rgba(255,255,255,0.2); }
        .nvp-or span { font-size: 0.72rem; color: rgba(255,255,255,0.6); }
        .nvp-google { display: flex; justify-content: center; }
        .nvp-no { background: none; border: none; color: rgba(255,255,255,0.6); font-size: 0.78rem; margin-top: 0.8rem;
          cursor: pointer; text-decoration: underline; }
        .nvp-cta { display: inline-block; margin-top: 1rem; background: ${COLOR_GOLD}; color: #fff; text-decoration: none;
          font-weight: 700; padding: 0.7rem 1.2rem; border-radius: 10px; }
        @media (max-height: 760px) { .nvp-perk-desc { display: none; } .nvp-perk-wide .nvp-perk-desc { display: block; } }
        @keyframes nvp-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes nvp-pop { from { opacity: 0; transform: translateY(12px) scale(.98) } to { opacity: 1; transform: none } }
        @keyframes nvp-up { from { transform: translateY(100%) } to { transform: none } }
        @media (max-width: 560px) {
          .nvp-backdrop { align-items: flex-end; padding: 0; background: rgba(10,20,15,0.45); }
          .nvp-card { border-radius: 18px 18px 0 0; max-width: none; padding: 1.4rem 1.15rem calc(1rem + env(safe-area-inset-bottom));
            animation: nvp-up .3s ease-out; }
          .nvp-title { font-size: 1.2rem; padding: 0 1.5rem; }
          .nvp-sub { font-size: 0.86rem; margin-bottom: 0.85rem; }
          .nvp-perks { gap: 0.35rem; margin-bottom: 0.8rem; }
          .nvp-perk { padding: 0.4rem 0.5rem; }
          .nvp-perk-desc { display: none; }
          .nvp-perk-wide .nvp-perk-desc { display: block; }
          .nvp-badge { margin-bottom: 0.55rem; }
          .nvp-no { margin-top: 0.5rem; }
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
              You&apos;re In! Your Free Kit Is on the Way
            </h2>
            <p className="nvp-sub">
              Check your inbox for an email from FaithSpark (peek in Promotions or Spam if you don&apos;t see it).
              Or jump in right now:
            </p>
            <div className="nvp-perks" style={{ marginBottom: 0 }}>
              {PERKS.map((p, i) => (
                <a
                  key={p.title}
                  href={LINK_BASE + p.href}
                  className={`nvp-perk${i === PERKS.length - 1 ? " nvp-perk-wide" : ""}`}
                  onClick={dismiss}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="nvp-perk-icon">{p.icon}</span>
                  <span className="nvp-perk-title">{p.title}</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="nvp-badge">🎁 Free Faith Starter Kit</span>
            <h2 id="nvp-title" className="nvp-title">
              Get All of This Free
            </h2>
            <p className="nvp-sub">
              Join our free newsletter and we&apos;ll email you instant access to everything below.
            </p>

            <ul className="nvp-perks">
              {PERKS.map((p, i) => (
                <li key={p.title} className={`nvp-perk${i === PERKS.length - 1 ? " nvp-perk-wide" : ""}`}>
                  <span className="nvp-perk-icon">{p.icon}</span>
                  <span>
                    <span className="nvp-perk-title">{p.title}</span>
                    <span className="nvp-perk-desc">{p.desc}</span>
                  </span>
                </li>
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
                {status === "loading" ? "Sending…" : "Send Me My Free Kit"}
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
