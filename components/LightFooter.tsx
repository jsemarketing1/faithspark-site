import Link from 'next/link';

export default function LightFooter() {
  return (
    <footer>
      <p>
        © 2026 Mind Garden Press ·{' '}
        <Link href="/">Home</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </p>
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/joey.png" alt="Joey, creator of FaithSpark" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(200,118,42,0.4)' }} />
        <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>
          Made with faith by <strong style={{ color: '#555' }}>Joey</strong><br />
          Father, truck driver &amp; creator of FaithSpark
        </p>
      </div>
    </footer>
  );
}
