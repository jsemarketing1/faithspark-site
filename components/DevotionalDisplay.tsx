import Link from 'next/link';
import type { DevotionalEntry } from '@/lib/devotionals';
import DevotionalShareButton from './DevotionalShareButton';

type Props = {
  devotional: DevotionalEntry | null;
};

export default function DevotionalDisplay({ devotional }: Props) {
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!devotional) {
    return (
      <main className="devotional-wrap">
        <div className="devotional-hero">
          <p className="devotional-hero-date">{todayLabel}</p>
          <h1 className="devotional-hero-title">Daily Devotional</h1>
        </div>
        <div className="devotional-body">
          <p className="devotional-empty">Today&apos;s devotional could not be loaded. Please try again shortly.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="devotional-wrap">
      <div className="devotional-hero">
        <div className="devotional-hero-top">
          <Link href="/" className="devotional-back">← Home</Link>
          <DevotionalShareButton devotional={devotional} />
        </div>
        <p className="devotional-hero-date">{devotional.date} · {todayLabel}</p>
        <h1 className="devotional-hero-title">{devotional.title}</h1>
        <p className="devotional-hero-scripture">{devotional.scripture}</p>
      </div>

      <div className="devotional-body">
        <blockquote className="devotional-verse">
          &ldquo;{devotional.verse}&rdquo;
        </blockquote>

        <div className="devotional-divider" />

        <div className="devotional-content">
          {devotional.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {devotional.prayer && (
          <section className="devotional-section">
            <h2 className="devotional-section-title">🙏 Prayer</h2>
            <p>{devotional.prayer}</p>
          </section>
        )}

        {devotional.reflection && (
          <section className="devotional-section devotional-reflection">
            <h2 className="devotional-section-title">✨ Reflection</h2>
            <p>{devotional.reflection}</p>
          </section>
        )}

        <div className="devotional-cta">
          <p>Want a devotional written just for you?</p>
          <a
            href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724"
            className="devotional-cta-btn"
          >
            Get FaithSpark Free
          </a>
        </div>
      </div>
    </main>
  );
}