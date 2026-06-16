'use client';
import { useEffect, useState } from 'react';

export default function MobileSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#0d0800',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 28px',
      textAlign: 'center',
    }}>

      {/* Flame */}
      <div style={{ position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{ position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'rgba(200,118,42,0.12)', animation: 'pulse 2.5s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 66, height: 66, borderRadius: '50%', background: 'rgba(200,118,42,0.22)', animation: 'pulse 2.5s ease-in-out infinite', animationDelay: '0.35s' }} />
        <div style={{ position: 'absolute', width: 44, height: 44, borderRadius: '50%', background: 'rgba(200,118,42,0.38)', animation: 'pulse 2.5s ease-in-out infinite', animationDelay: '0.7s' }} />
        <span style={{ fontSize: 36, position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 12px rgba(255,120,0,1))' }}>🔥</span>
      </div>

      {/* Logo */}
      <h1 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 36, fontWeight: 700, marginBottom: 6, lineHeight: 1 }}>
        <span style={{ color: '#ffffff', fontWeight: 400 }}>Faith</span>
        <span style={{ color: '#C8762A' }}>Spark</span>
      </h1>

      {/* Tagline */}
      <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', marginBottom: 10 }}>
        Faith That Knows Your Name
      </p>

      {/* Description */}
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 300, marginBottom: 36 }}>
        Free devotionals, Bible reader, guided prayer, and your personal AI faith companion — all in one app.
      </p>

      {/* Apple button */}
      <a
        href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          maxWidth: 300,
          padding: '16px 24px',
          borderRadius: 50,
          background: 'linear-gradient(135deg,#C8762A,#E8943A)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 16,
          textDecoration: 'none',
          boxShadow: '0 8px 28px rgba(200,118,42,0.45)',
          marginBottom: 12,
        }}
      >
        🍎 Download on the App Store
      </a>

      {/* Google Play */}
      <a
        href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          maxWidth: 300,
          padding: '16px 24px',
          borderRadius: 50,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 700,
          textDecoration: 'none',
          marginBottom: 36,
        }}
      >
        🤖 Download on Google Play
      </a>

      {/* More info link */}
      <button
        onClick={() => setVisible(false)}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 13,
          cursor: 'pointer',
          textDecoration: 'underline',
          textDecorationColor: 'rgba(255,255,255,0.2)',
          padding: 0,
        }}
      >
        For more information about FaithSpark tap here →
      </button>

    </div>
  );
}
