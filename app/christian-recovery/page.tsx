import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Christian Recovery — Faith-Based Recovery Programs & Daily Support',
  description: 'FaithSpark offers Christ-centered recovery courses for addiction, anger, and more — plus daily devotionals and prayer to support your faith-based recovery journey. Free download.',
  alternates: { canonical: 'https://faithspark.app/christian-recovery' },
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
          name: 'What is a faith-based recovery program?',
          acceptedAnswer: { '@type': 'Answer', text: 'A faith-based recovery program integrates Christian belief, Scripture, and prayer into the recovery process — addressing not just the behavior but the spiritual root beneath it. FaithSpark offers five Christ-centered recovery courses covering addiction, anger, self-harm, pornography, and gambling, available free in the app.' },
        },
        {
          '@type': 'Question',
          name: 'What Christian recovery programs are available?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark includes five Christ-centered recovery courses: Freedom (addiction recovery), From Rage to Peace (anger), Healing From the Inside Out (self-harm), Pure Freedom (pornography), and All In for God (gambling). Each course is available in the app at app.faithspark.app or through the iOS and Android apps.' },
        },
        {
          '@type': 'Question',
          name: 'Does the Bible support faith-based recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Scripture is full of stories of people who were transformed through encounter with God — from the prodigal son to Paul on the road to Damascus. Faith-based recovery is rooted in the belief that lasting change comes through Christ, not just willpower. 2 Corinthians 5:17 says "If anyone is in Christ, the new creation has come: The old has gone, the new is here!"' },
        },
        {
          '@type': 'Question',
          name: 'Can an app help with Christian recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — as a daily companion. FaithSpark won\'t replace a sponsor, a counselor, or a recovery group. But it gives you daily devotionals, guided prayer, Scripture reminders, and Christ-centered course content that keeps your faith active every day — not just at meetings.' },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Christian recovery and secular recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'Secular recovery programs focus on behavior, coping mechanisms, and community support. Christian recovery includes all of that — but adds the belief that God is the source of genuine healing, that confession and forgiveness matter, and that Scripture provides a foundation that willpower alone cannot. Faith-based recovery programs work with the whole person: body, mind, and spirit.' },
        },
      ],
    },
  ],
};

const S = {
  page: { background: '#0d0800', color: '#fff', fontFamily: 'var(--font-lato), sans-serif', fontWeight: 300 } as React.CSSProperties,
  hero: { position: 'relative' as const, minHeight: 480, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '120px 24px 80px' },
  heroImg: { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const, opacity: 0.25 },
  heroOverlay: { position: 'absolute' as const, inset: 0, background: 'linear-gradient(to bottom, rgba(13,8,0,0.5) 0%, rgba(13,8,0,0.88) 100%)' },
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
  courseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, margin: '32px 0' },
  courseCard: { background: 'rgba(200,118,42,0.08)', border: '1px solid rgba(200,118,42,0.25)', borderRadius: 12, padding: '24px 20px' },
  courseName: { fontFamily: 'var(--font-cinzel)', fontSize: 15, fontWeight: 700, color: '#C8762A', marginBottom: 8 },
  courseSub: { fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 },
  blockquote: { borderLeft: '3px solid #C8762A', paddingLeft: 24, margin: '32px 0', fontStyle: 'italic' as const, color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7 },
  faqItem: { borderTop: '1px solid rgba(200,118,42,0.2)', paddingTop: 24, marginTop: 24 },
  faqQ: { fontFamily: 'var(--font-cinzel)', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 },
  faqA: { fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' },
  ctaBox: { background: 'rgba(200,118,42,0.1)', border: '1px solid rgba(200,118,42,0.3)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' as const, marginTop: 64 },
  ctaH: { fontFamily: 'var(--font-cinzel)', fontSize: 26, fontWeight: 700, marginBottom: 16 },
  ctaP: { color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 16, lineHeight: 1.7 },
  divider: { borderColor: 'rgba(200,118,42,0.15)', margin: '0' },
};

const courses = [
  { name: 'Freedom', sub: 'A Christ-Centered Journey to Recovery' },
  { name: 'From Rage to Peace', sub: 'A Christ-Centered Path Through Anger' },
  { name: 'Healing From the Inside Out', sub: 'A Christ-Centered Path Through Self-Harm' },
  { name: 'Pure Freedom', sub: 'A Christ-Centered Path Through Pornography Addiction' },
  { name: 'All In for God', sub: 'A Christ-Centered Path Through Gambling Addiction' },
];

export default function ChristianRecoveryPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-recovery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/christian-recovery.jpg" alt="Person walking through a forest path — Christian recovery journey" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>Christian Recovery</p>
          <h1 style={S.h1}>Faith-Based Recovery<br />That Goes to the Root</h1>
          <p style={S.sub}>I know what it&apos;s like to try to get clean on willpower alone. It doesn&apos;t work. What works is letting God into the parts of you that you&apos;ve been hiding. FaithSpark has five Christ-centered recovery courses built for exactly that.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download on App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      <article style={S.body}>
        <h2 style={{...S.h2, marginTop: 0}}>My Story With Recovery</h2>
        <p style={S.p}>I spent most of my twenties in a fog — drugs, alcohol, bad decisions, worse company. I knew I needed to change. I tried a few times. Failed more than I care to count. The thing that actually stuck wasn&apos;t a program or a pill. It was the day I finally stopped pretending I had it handled and asked God to take it instead.</p>
        <p style={S.p}>I&apos;m not anti-program. Programs save lives. But the programs that worked for me were the ones built on the truth that lasting recovery isn&apos;t about willpower — it&apos;s about surrender. Faith-based recovery programs understand that. They don&apos;t just ask you to change your behavior. They ask God to change your heart.</p>
        <p style={S.p}>That&apos;s the foundation behind every recovery course inside FaithSpark.</p>

        <blockquote style={S.blockquote}>
          &quot;If anyone is in Christ, the new creation has come: The old has gone, the new is here.&quot; — 2 Corinthians 5:17
        </blockquote>

        <h2 style={S.h2}>Five Christ-Centered Recovery Courses Inside FaithSpark</h2>
        <p style={S.p}>When you download FaithSpark and create a free account, you get access to five complete recovery courses — available in the app and on the web at <a href="https://app.faithspark.app/explore?tab=addiction" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>app.faithspark.app</a>.</p>

        <div style={S.courseGrid}>
          {courses.map(c => (
            <div key={c.name} style={S.courseCard}>
              <p style={S.courseName}>{c.name}</p>
              <p style={S.courseSub}>{c.sub}</p>
            </div>
          ))}
        </div>

        <h2 style={S.h2}>How FaithSpark Supports Your Recovery Daily</h2>

        <h3 style={S.h3}>Daily Devotionals Anchored in Scripture</h3>
        <p style={S.p}>Recovery isn&apos;t just a program you complete — it&apos;s a daily practice. FaithSpark gives you a personalized devotional every morning that meets you where you are in your journey. Scripture, reflection, prayer — in 10 minutes or less.</p>

        <h3 style={S.h3}>Guided Prayer for Recovery</h3>
        <p style={S.p}>Some of the hardest moments in recovery are the ones where you&apos;re alone and tempted and don&apos;t know what to say to God. Spark leads you through guided prayer for those moments — honest, direct, and grounded in what the Bible actually says about freedom and transformation.</p>

        <h3 style={S.h3}>A Faith Community Praying For You</h3>
        <p style={S.p}>You can post prayer requests to the FaithSpark community board and have real believers pray for you — anonymously if you need. Recovery is hard enough without doing it alone. The community inside FaithSpark is there for the 2am moments when you need someone praying on your behalf.</p>

        <h2 style={S.h2}>Christian Recovery and the AA Daily Reflections Book</h2>
        <p style={S.p}>If you&apos;re in AA or another 12-step program and want to bring your Christian faith into it, I also wrote a book specifically for you: <a href="https://www.amazon.com/AA-Daily-Reflections-Book-Faith-Based-ebook/dp/B0DHFV6R5N" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>AA Daily Reflections: A Faith-Based Approach</a>, available on Amazon. The book and FaithSpark work together — the book for your meetings, the app for every day in between.</p>
        <p style={S.p}>You can also read the <Link href="/blog/genesis-37-devotional" style={{ color: '#C8762A' }}>Genesis 37 devotional</Link> on suffering and purpose, or the <Link href="/blog/romans-8-28-devotional" style={{ color: '#C8762A' }}>Romans 8:28 devotional</Link> on God working all things together, on the <Link href="/blog" style={{ color: '#C8762A' }}>FaithSpark blog</Link>.</p>

        <h2 style={S.h2}>Questions About Faith-Based Recovery Programs</h2>
        <div>
          {(schema['@graph'][1] as { mainEntity: Array<{name: string; acceptedAnswer: {text: string}}> }).mainEntity.map((item) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={S.ctaBox}>
          <p style={S.ctaH}>Start Your Recovery With Faith Today</p>
          <p style={S.ctaP}>Download FaithSpark free and access all five Christ-centered recovery courses — plus daily devotionals, guided prayer, and a community that will pray for you.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Google Play</a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 16 }}>Also available on the web at <a href="https://app.faithspark.app/explore?tab=addiction" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>app.faithspark.app</a></p>
        </div>
      </article>

      <hr style={S.divider} />
      <DarkFooter />
    </div>
  );
}
