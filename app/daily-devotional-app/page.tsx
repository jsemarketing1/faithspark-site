import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Daily Devotional App — AI-Personalized Faith, Free on iOS & Android',
  description: 'FaithSpark is the best daily devotional app for men and women — AI-personalized devotionals written for your life, not a one-size-fits-all template. Free download.',
  alternates: { canonical: 'https://faithspark.app/daily-devotional-app' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'FaithSpark',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'LifestyleApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '120' },
      url: 'https://faithspark.app',
      downloadUrl: 'https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best daily devotional app?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark is one of the best daily devotional apps because it personalizes your devotional to your name, your season of life, and what you\'re going through — instead of sending everyone the same generic reading. It\'s free on iOS and Android.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a good daily devotional app for women?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark is a strong daily devotional app for women because it knows your name and tailors the content to your specific season of life — whether you\'re a mom, a woman in recovery, someone dealing with anxiety, or simply someone who wants to grow deeper in faith.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a good daily devotional app for men?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark has content built for men — devotionals that deal with leadership, family, temptation, and real-life struggle without being preachy. It\'s the kind of devotional that a guy who isn\'t naturally drawn to sitting still can actually stick with.' },
        },
        {
          '@type': 'Question',
          name: 'What makes an AI devotional different from a regular devotional?',
          acceptedAnswer: { '@type': 'Answer', text: 'A regular devotional is the same reading for everyone. An AI devotional knows who you are — your name, your situation, what you\'re praying for — and writes something just for you. FaithSpark\'s AI companion Spark creates a devotional that speaks directly to your day, not just a general audience.' },
        },
        {
          '@type': 'Question',
          name: 'Is FaithSpark a free daily devotional app?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark is a free daily devotional app available on the App Store and Google Play. The daily AI devotional, Scripture reading, and faith companion features are all free to access.' },
        },
      ],
    },
  ],
};

const S = {
  page: { background: '#0d0800', color: '#fff', fontFamily: 'var(--font-lato), sans-serif', fontWeight: 300 } as React.CSSProperties,
  hero: { position: 'relative' as const, minHeight: 480, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '120px 24px 80px' },
  heroImg: { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const, opacity: 0.25 },
  heroOverlay: { position: 'absolute' as const, inset: 0, background: 'linear-gradient(to bottom, rgba(13,8,0,0.5) 0%, rgba(13,8,0,0.85) 100%)' },
  heroInner: { position: 'relative' as const, zIndex: 1, maxWidth: 760, margin: '0 auto' },
  tag: { fontFamily: 'var(--font-cinzel)', fontSize: 11, letterSpacing: '0.28em', color: '#C8762A', marginBottom: 16, textTransform: 'uppercase' as const },
  h1: { fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 },
  sub: { fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' },
  btnRow: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const },
  btnApple: { background: '#fff', color: '#0d0800', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' },
  btnPlay: { background: '#C8762A', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' },
  body: { maxWidth: 800, margin: '0 auto', padding: '72px 24px' },
  h2: { fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 700, color: '#C8762A', marginBottom: 20, marginTop: 56 },
  h3: { fontFamily: 'var(--font-cinzel)', fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12, marginTop: 32 },
  p: { fontSize: 17, lineHeight: 1.85, color: 'rgba(255,255,255,0.8)', marginBottom: 20 },
  faqItem: { borderTop: '1px solid rgba(200,118,42,0.2)', paddingTop: 24, marginTop: 24 },
  faqQ: { fontFamily: 'var(--font-cinzel)', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 },
  faqA: { fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' },
  ctaBox: { background: 'rgba(200,118,42,0.1)', border: '1px solid rgba(200,118,42,0.3)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' as const, marginTop: 64 },
  ctaH: { fontFamily: 'var(--font-cinzel)', fontSize: 26, fontWeight: 700, marginBottom: 16 },
  ctaP: { color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 16, lineHeight: 1.7 },
  divider: { borderColor: 'rgba(200,118,42,0.15)', margin: '0' },
};

export default function DailyDevotionalAppPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-devotional" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/devotional-app.jpg" alt="Open Bible with coffee and journal — daily devotional app" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>Daily Devotional App</p>
          <h1 style={S.h1}>The Daily Devotional App That<br />Knows Your Name</h1>
          <p style={S.sub}>Every other devotional app sends you the same reading it sends everyone else. FaithSpark writes your devotional for you — based on your name, your season, and what you&apos;re walking through right now.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download on App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      <article style={S.body}>
        <h2 style={{...S.h2, marginTop: 0}}>Why I Built a Different Kind of Devotional App</h2>
        <p style={S.p}>I&apos;ve tried a lot of devotional apps over the years. The problem was always the same — they felt like they were written for someone else. Some generic Christian who lives a perfectly organized life with a quiet house and a cup of herbal tea. Not for a truck driver with four kids and a complicated past.</p>
        <p style={S.p}>The best daily devotional app should feel like someone who knows you sat down and wrote something specifically for you this morning. That&apos;s what FaithSpark does. Spark — your AI faith companion — takes your name, your situation, what you&apos;re praying about, and writes a devotional that actually lands. Not a template. Not a canned reading. Something real.</p>
        <p style={S.p}>My wife uses it every morning with her coffee. My daughter opened it and said &quot;how does it know to say that?&quot; That&apos;s when I knew we got it right.</p>

        <h2 style={S.h2}>What&apos;s Inside the FaithSpark Devotional App</h2>

        <h3 style={S.h3}>AI-Personalized Daily Devotional</h3>
        <p style={S.p}>Every morning, FaithSpark generates a devotional written for you. Your name. Your current season. What you&apos;re going through. It pulls from Scripture, connects the passage to your real life, and ends with a prayer that feels like yours — not a copy-paste from somewhere else.</p>

        <h3 style={S.h3}>Best Daily Devotional App for Women</h3>
        <p style={S.p}>My wife told me the thing she loves most is that it doesn&apos;t assume what her life looks like. It asks. Whether you&apos;re a mom homeschooling kids, a woman in the workforce, someone healing from something hard — FaithSpark adjusts to you. It&apos;s one of the best daily devotional apps for women because it actually listens.</p>

        <h3 style={S.h3}>Daily Devotional App for Men</h3>
        <p style={S.p}>Men don&apos;t always like devotionals. Too soft, too vague, too disconnected from real life. FaithSpark&apos;s content for men is honest and direct. It talks about temptation, leadership, family, faith under pressure. The kind of thing a guy can read in his truck before a shift and actually carry with him.</p>

        <h3 style={S.h3}>Free Daily Devotional App</h3>
        <p style={S.p}>Everything I just described is free. No subscription wall for the core devotional. No &quot;free trial ends after 3 days.&quot; Download FaithSpark, open it, and your first personalized devotional is waiting for you within minutes.</p>

        <h2 style={S.h2}>The Devotional App That Grows With You</h2>
        <p style={S.p}>The best free daily devotional app isn&apos;t just a reading — it&apos;s a habit. FaithSpark tracks your devotional streak, gives you a full library of past devotionals, and connects each day&apos;s reading to deeper Bible content if you want to go further.</p>
        <p style={S.p}>For more Scripture-based devotional content, check out the <Link href="/blog/john-3-16-devotional" style={{ color: '#C8762A' }}>John 3:16 devotional</Link> and the <Link href="/blog/romans-8-28-devotional" style={{ color: '#C8762A' }}>Romans 8:28 devotional</Link> on the <Link href="/blog" style={{ color: '#C8762A' }}>FaithSpark blog</Link>.</p>

        <h2 style={S.h2}>Questions About Daily Devotional Apps</h2>
        <div>
          {schema['@graph'][1].mainEntity.map((item: {name: string; acceptedAnswer: {text: string}}) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={S.ctaBox}>
          <p style={S.ctaH}>Get Your First Personalized Devotional Today</p>
          <p style={S.ctaP}>Free to download. Takes 60 seconds to set up. Your devotional will be waiting for you tomorrow morning.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Google Play</a>
          </div>
        </div>
      </article>

      <hr style={S.divider} />
      <DarkFooter />
    </div>
  );
}
