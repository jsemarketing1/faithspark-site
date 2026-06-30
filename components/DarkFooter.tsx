import Link from 'next/link';

export default function DarkFooter() {
  return (
    <footer style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ marginBottom: '24px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/joey.png" alt="Joey, creator of FaithSpark" style={{ maxWidth: 240, width: '100%' }} />
      </div>
      <Link href="/" className="ft-logo">
        <span className="f">Faith</span><span className="s">Spark</span>
      </Link>
      <ul className="ft-links">
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/download">Download</Link></li>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms of Use</Link></li>
        <li><Link href="/delete-account">Delete Account</Link></li>
        <li><a href="mailto:faithsparkhome@gmail.com">Support</a></li>
      </ul>
      <p className="ft-copy">© 2026 Mind Garden Press. All rights reserved.</p>
    </footer>
  );
}
