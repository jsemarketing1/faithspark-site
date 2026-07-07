import Link from 'next/link';

export default function DarkFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="ft-grid">
        {/* Brand */}
        <div>
          <Link href="/" className="ft-brand-name">
            Faith<span className="s">Spark</span>
          </Link>
          <p className="ft-tagline">
            A free Christian faith app built by a truck driver from Texas — daily devotionals,
            guided prayer, Bible reader, and a personal AI faith companion.
          </p>
          <div className="ft-social">
            <a href="https://www.instagram.com/faithspark.app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.62c-.79.31-1.46.72-2.13 1.39-.67.67-1.08 1.34-1.39 2.13-.28.76-.49 1.64-.55 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.55 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.28 1.64.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.55.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.28-.76.49-1.64.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.55-2.91-.31-.79-.72-1.46-1.39-2.13-.67-.67-1.34-1.08-2.13-1.39-.76-.28-1.64-.49-2.91-.55C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>
            </a>
            <a href="https://www.pinterest.com/faithsparkhome/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.41.22-.93 1.41-5.94 1.41-5.94s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.56-1 3.99-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.39 2.13.89 2.73a.36.36 0 0 1 .08.34c-.09.38-.29 1.2-.33 1.36-.05.21-.17.26-.39.16-1.46-.68-2.37-2.8-2.37-4.51 0-3.67 2.67-7.04 7.69-7.04 4.04 0 7.18 2.88 7.18 6.72 0 4.01-2.53 7.23-6.04 7.23-1.18 0-2.29-.61-2.67-1.34l-.73 2.77c-.26 1.01-.97 2.28-1.44 3.05A12 12 0 1 0 12 0z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61589242152209" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
            </a>
          </div>
        </div>

        {/* Daily Faith */}
        <div>
          <p className="ft-col-title">Daily Faith</p>
          <ul className="ft-col-links">
            <li><Link href="/daily-bible-verse-app">Bible Verse App</Link></li>
            <li><Link href="/daily-prayer-app">Prayer App</Link></li>
            <li><Link href="/daily-devotional-app">Devotional App</Link></li>
            <li><Link href="/christian-sleep-meditation">Sleep Meditation</Link></li>
          </ul>
        </div>

        {/* Recovery */}
        <div>
          <p className="ft-col-title">Recovery</p>
          <ul className="ft-col-links">
            <li><Link href="/christian-recovery">Christian Recovery</Link></li>
            <li><Link href="/aa-daily-reflections">AA Daily Reflections</Link></li>
            <li><Link href="/christian-rehab">Christian Rehab</Link></li>
          </ul>
        </div>

        {/* Site */}
        <div>
          <p className="ft-col-title">Site</p>
          <ul className="ft-col-links">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/download">Download</Link></li>
            <li><a href="https://app.faithspark.app" target="_blank" rel="noopener noreferrer">Web App</a></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Use</Link></li>
            <li><a href="mailto:faithsparkhome@gmail.com">Support</a></li>
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© {year} Mind Garden Press. All rights reserved.</span>
        <span>Built with faith 🔥</span>
      </div>
    </footer>
  );
}
