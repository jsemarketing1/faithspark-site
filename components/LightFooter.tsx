import Link from 'next/link';

export default function LightFooter() {
  return (
    <footer style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '16px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/joey.png" alt="Joey, creator of FaithSpark" style={{ maxWidth: 240, width: '100%' }} />
      </div>
      <p>
        © 2026 Mind Garden Press ·{' '}
        <Link href="/">Home</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </p>
    </footer>
  );
}
