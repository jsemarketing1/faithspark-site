'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://www.instagram.com/faithspark.app/',
    label: 'Instagram',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://www.pinterest.com/faithsparkhome/',
    label: 'Pinterest',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61589242152209',
    label: 'Facebook',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => setOpen(false);

  const menu = (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 99997,
        }}
        onClick={close}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(300px, 85vw)',
          background: '#1a1208',
          borderLeft: '1px solid rgba(200,118,42,0.25)',
          zIndex: 99998,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '20px 24px 44px',
          textAlign: 'center',
          overflowY: 'auto',
        }}
      >
        {/* X button */}
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            alignSelf: 'flex-end',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            width: 40, height: 40,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: 28,
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={close}
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontSize: 26, textDecoration: 'none',
            marginBottom: 32,
          }}
        >
          <span style={{ color: '#ffffff', fontWeight: 400 }}>Faith</span>
          <span style={{ color: '#C8762A', fontWeight: 700 }}>Spark</span>
        </Link>

        {/* Nav links */}
        <div style={{ width: '100%', marginBottom: 28 }}>
          {[
            { href: '/#features', label: 'Features' },
            { href: '/#videos', label: 'Videos' },
            { href: '/devotionals', label: 'Devotionals' },
            { href: '/blog', label: 'Blog' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontSize: 17,
                letterSpacing: '0.08em',
                padding: '15px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                transition: 'color 0.2s',
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://app.faithspark.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              fontSize: 17,
              letterSpacing: '0.08em',
              padding: '15px 0',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              transition: 'color 0.2s',
            }}
          >
            Web App
          </a>
        </div>

        {/* Download button */}
        <a
          href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724"
          onClick={close}
          style={{
            display: 'block', width: '100%',
            padding: '15px 20px', fontSize: 15, fontWeight: 700,
            borderRadius: 50, marginBottom: 32,
            background: 'linear-gradient(135deg,#C8762A,#E8943A)',
            color: '#ffffff', textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(200,118,42,0.4)',
          }}
        >
          🍎 Download Free
        </a>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: 'rgba(255,255,255,0.6)', display: 'flex' }}
            >
              {s.svg}
            </a>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger button */}
      <button
        className="hamburger-btn"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <span /><span /><span />
      </button>

      {/* Portal renders outside nav so backdrop-filter doesn't trap it */}
      {mounted && open && createPortal(menu, document.body)}
    </>
  );
}
