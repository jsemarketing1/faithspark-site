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
      <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/joey.png" alt="Joey, creator of FaithSpark" style={{ maxWidth: 260, width: '100%' }} />
      </div>
    </footer>
  );
}
