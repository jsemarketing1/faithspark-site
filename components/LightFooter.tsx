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
    </footer>
  );
}
