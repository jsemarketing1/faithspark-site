import Link from 'next/link';

export default function LightNav() {
  return (
    <nav>
      <Link href="/" className="nav-logo">
        <div className="lp-flame" />
        FaithSpark
      </Link>
      <Link href="/" className="nav-back">← Back to Home</Link>
    </nav>
  );
}
