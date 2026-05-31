import Link from 'next/link';

export default function DarkFooter() {
  return (
    <footer>
      <Link href="/" className="ft-logo">
        <span className="f">Faith</span><span className="s">Spark</span>
      </Link>
      <ul className="ft-links">
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms of Use</Link></li>
        <li><Link href="/delete-account">Delete Account</Link></li>
        <li><a href="mailto:faithsparkhome@gmail.com">Support</a></li>
      </ul>
      <p className="ft-copy">© 2026 Mind Garden Press. All rights reserved.</p>
      <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/joey.png" alt="Joey, creator of FaithSpark" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(200,118,42,0.5)' }} />
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Made with faith by <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Joey</strong><br />
          Father, truck driver &amp; creator of FaithSpark
        </p>
      </div>
    </footer>
  );
}
