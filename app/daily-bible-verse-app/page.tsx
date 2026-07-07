import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Daily Bible Verse App — Scripture That Sticks With You',
  description: 'FaithSpark is the best daily Bible verse app with a live verse scanner, memorization tools, and plain-English explanations. Free on iOS and Android.',
  alternates: { canonical: 'https://faithspark.app/daily-bible-verse-app' },
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
          name: 'What is the best daily Bible verse app?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark is one of the best daily Bible verse apps because it does more than deliver a verse — it explains what the passage means in plain English, lets you scan printed Bibles with your camera, and helps you memorize Scripture over time. It\'s free on iOS and Android.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a Bible verse app with explanations?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark gives you a plain-English explanation for every verse — no seminary required. It breaks down the context, the original meaning, and what it means for your life today.' },
        },
        {
          '@type': 'Question',
          name: 'What is a Bible verse scanner app?',
          acceptedAnswer: { '@type': 'Answer', text: 'A Bible verse scanner app lets you point your phone camera at any printed Bible and instantly pulls up the verse, explanation, and related passages in the app. FaithSpark has this feature built in.' },
        },
        {
          '@type': 'Question',
          name: 'How do I memorize Bible verses using an app?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark uses spaced repetition and daily reminders to help you memorize Scripture without it feeling like homework. You save verses, get review prompts, and build a personal library of passages that actually stick.' },
        },
        {
          '@type': 'Question',
          name: 'Is FaithSpark free to download?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — FaithSpark is free to download on the App Store and Google Play. The daily Bible verse, scanner, and explanations are all available at no cost.' },
        },
      ],
    },
  ],
};

const S = {
  page: { background: '#0d0800', color: '#fff', fontFamily: 'var(--font-lato), sans-serif', fontWeight: 300 } as React.CSSProperties,
  hero: { position: 'relative' as const, minHeight: 480, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '120px 24px 80px' },
  heroImg: { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const, opacity: 0.22 },
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

export default function DailyBibleVerseAppPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-bible-verse" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      {/* HERO */}
      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/bible-verse-daily-app.jpg" alt="Open Bible with sunlight — daily Bible verse app" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>Bible Verse App</p>
          <h1 style={S.h1}>The Daily Bible Verse App<br />That Actually Explains the Verse</h1>
          <p style={S.sub}>I built FaithSpark because I kept reading verses I didn&apos;t fully understand. Now every verse comes with a plain-English explanation — and you can scan your printed Bible to find any passage in seconds.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download on App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article style={S.body}>
        <h2 style={{...S.h2, marginTop: 0}}>Why I Built a Daily Bible Verse App</h2>
        <p style={S.p}>I&apos;ve been in church most of my life. Assembly of God, raised by my grandma who dragged me to the pew every Sunday whether I wanted to go or not. But for a long time, I&apos;d hear a verse quoted in a sermon and walk out of church with no idea what it really meant. I&apos;d look it up later and still feel like I was reading something in a foreign language.</p>
        <p style={S.p}>That&apos;s why I made the daily Bible verse app inside FaithSpark different. It doesn&apos;t just drop a verse in your notification bar and call it a day. It explains it. Plain English. What was happening in the story. Who wrote it. What it was saying to the original readers. And what it means for you right now — driving a truck at 4am, raising four kids, trying to hold it together.</p>
        <p style={S.p}>If you&apos;re someone who loves Scripture but sometimes feels lost in it, this is the app I built for you.</p>

        <h2 style={S.h2}>What Makes This Bible Verse App Different</h2>

        <h3 style={S.h3}>Bible Verse of the Day — With Context</h3>
        <p style={S.p}>Every morning you get a new verse. But unlike other Bible verse of the day apps, FaithSpark gives you the &quot;why&quot; behind the passage. Who wrote it, when, and what they were going through. The verse lands different when you know the story behind it.</p>

        <h3 style={S.h3}>The Bible Verse Scanner</h3>
        <p style={S.p}>This is the feature I&apos;m most proud of. You can point your phone camera at any printed Bible — your study Bible, grandma&apos;s old King James on the shelf — and FaithSpark instantly finds the passage, explains it, and saves it to your personal library. It was one of those features I built because I needed it myself.</p>

        <h3 style={S.h3}>Bible Verse Explanation in Plain English</h3>
        <p style={S.p}>Every verse in FaithSpark comes with a plain-English explanation. No seminary required. I wanted something my kids could read and actually understand, and something I could share with someone who&apos;s brand new to the Bible without it feeling like homework.</p>

        <h3 style={S.h3}>Bible Verse Memorization Tools</h3>
        <p style={S.p}>The best Bible verse memorization app doesn&apos;t feel like flashcards. FaithSpark uses reminders and spaced repetition to surface verses you&apos;ve saved at the right moment — in the morning, before bed, whenever you set it. Scripture starts to stick in a way it never did for me with paper and highlighters.</p>

        <h2 style={S.h2}>Who This App Is For</h2>
        <p style={S.p}>I built FaithSpark for people like me — people who are serious about their faith but not theologians. Truck drivers, moms, people in recovery, people who go to church on Sunday but feel like the Bible is hard to access Monday through Saturday. You don&apos;t need a commentary. You don&apos;t need a study group. You just need an app that meets you where you are and helps you connect with God&apos;s Word every single day.</p>
        <p style={S.p}>If you want to go deeper with specific passages, check out the <Link href="/blog/matthew-6-33-devotional" style={{ color: '#C8762A' }}>Matthew 6:33 devotional</Link> or the <Link href="/blog/psalm-139-devotional" style={{ color: '#C8762A' }}>Psalm 139 devotional</Link> on the FaithSpark <Link href="/blog" style={{ color: '#C8762A' }}>devotional blog</Link>.</p>

        {/* FAQ */}
        <h2 style={S.h2}>Common Questions About Daily Bible Verse Apps</h2>
        <div>
          {(schema['@graph'][1] as { mainEntity: Array<{name: string; acceptedAnswer: {text: string}}> }).mainEntity.map((item) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={S.ctaBox}>
          <p style={S.ctaH}>Start Your Daily Bible Verse Habit Today</p>
          <p style={S.ctaP}>Free to download. No credit card. Just open the app, get your verse, and let God do the rest.</p>
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
