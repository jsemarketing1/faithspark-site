import Link from 'next/link';

export default function DarkNav() {
  return (
    <nav>
      <Link href="/" className="logo">
        <span className="f">Faith</span><span className="s">Spark</span>
      </Link>
      <div className="nav-right">
        <Link href="/#features">Features</Link>
        <Link href="/#videos">Videos</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#download" className="nav-btn">Download Free</Link>
      </div>
    </nav>
  );
}
