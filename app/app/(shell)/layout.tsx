"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkNav from "@/components/DarkNav";
import RequireAuth from "@/components/app/RequireAuth";
import AppProviders from "@/app/app/providers";

// Touches Firestore on mount — loaded client-only so it never runs during
// Next.js static prerendering (same pattern as everywhere else Firebase
// gets used in this app section).
const SidebarBookmarks = dynamic(() => import("@/components/app/SidebarBookmarks"), { ssr: false });

const NAV_ITEMS = [
  { href: "/app/", icon: "🏠", label: "Home", live: true },
  { href: "/app/devotionals/", icon: "📖", label: "Devotionals", live: true },
  { href: "/app/bible-reader/", icon: "📕", label: "Bible Reader", live: true },
  { href: "/app/reading-plans/", icon: "🗺️", label: "Reading Plans", live: true },
  { href: "/app/prayer-board/", icon: "🙏", label: "Prayer Board", live: true },
  { href: "/app/journal/", icon: "📝", label: "Journal", live: true },
  { href: "/app/bible-study/", icon: "👨‍👩‍👧", label: "Bible Study", live: true },
  { href: "/app/scripture-art/", icon: "🎨", label: "Scripture Art", live: false },
  { href: "/app/explore/", icon: "🌍", label: "Explore", live: false },
  { href: "/app/games/", icon: "🎮", label: "Games & Activities", live: false },
];

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <DarkNav />
      <RequireAuth>
        <AppShell>{children}</AppShell>
      </RequireAuth>
    </AppProviders>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/app/") return pathname === "/app" || pathname === "/app/";
    return pathname?.startsWith(href.replace(/\/$/, ""));
  };

  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
      <Link
        href="/app/"
        onClick={() => setMobileOpen(false)}
        style={{ padding: "20px 18px 18px", borderBottom: "1px solid var(--fs-border)", display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
      >
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #C8762A, #E8943A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
          🔥
        </div>
        <span style={{ fontSize: 19, fontWeight: 800, fontFamily: "var(--font-cinzel), serif", color: "var(--fs-dark)", letterSpacing: "-0.2px" }}>
          Faith<span style={{ color: "var(--fs-green)" }}>Spark</span>
        </span>
      </Link>

      <nav style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
        {NAV_ITEMS.map(({ href, icon, label, live }) => {
          const active = isActive(href);
          if (!live) {
            return (
              <div
                key={href}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, marginBottom: 2, fontSize: "0.88rem", fontWeight: 500, color: "var(--fs-dim)" }}
              >
                <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0, opacity: 0.5 }}>{icon}</span>
                {label}
                <span style={{ marginLeft: "auto", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fs-dim)", border: "1px solid var(--fs-border)", borderRadius: 6, padding: "2px 6px" }}>
                  Soon
                </span>
              </div>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 10, marginBottom: 2,
                textDecoration: "none", fontSize: "0.88rem", fontWeight: active ? 700 : 500,
                color: active ? "var(--fs-green)" : "var(--fs-muted)",
                background: active ? "rgba(45,106,79,0.08)" : "transparent",
                borderLeft: active ? "3px solid var(--fs-green)" : "3px solid transparent",
              }}
            >
              <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              {label}
            </Link>
          );
        })}

        <SidebarBookmarks onNavigate={() => setMobileOpen(false)} />
      </nav>

      <div style={{ borderTop: "1px solid var(--fs-border)", padding: "12px 14px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--fs-muted)", fontSize: "0.82rem", fontWeight: 500 }}>
          <span>←</span>
          <span>Back to FaithSpark</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="fs-app-shell">
      <aside style={{ position: "fixed", top: "var(--site-nav-height)", left: 0, height: "calc(100vh - var(--site-nav-height))", width: 220, borderRight: "1px solid var(--fs-border)", zIndex: 20 }} className="fs-sidebar">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", top: "var(--site-nav-height)", left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", zIndex: 30 }}
        />
      )}

      <aside
        style={{
          position: "fixed", top: "var(--site-nav-height)", left: 0,
          height: "calc(100vh - var(--site-nav-height))", width: 240, zIndex: 40,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease", boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
        }}
        className="fs-mobile-drawer"
      >
        {sidebarContent}
      </aside>

      <div className="fs-main-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 1rem", height: 52, background: "#fff", borderBottom: "1px solid var(--fs-border)", flexShrink: 0 }} className="fs-topbar">
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "var(--fs-dark)", padding: "4px 6px" }} aria-label="Open menu">
            ☰
          </button>
          <Link href="/app/" style={{ fontSize: 16, fontWeight: 800, fontFamily: "var(--font-cinzel), serif", color: "var(--fs-dark)", textDecoration: "none" }}>
            Faith<span style={{ color: "var(--fs-green)" }}>Spark</span>
          </Link>
        </div>

        <main style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>{children}</main>
      </div>
    </div>
  );
}
