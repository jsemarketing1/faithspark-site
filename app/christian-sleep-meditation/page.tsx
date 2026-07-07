import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Christian Sleep Meditation | Faith-Based Bedtime Stories and Prayer',
  description: 'FaithSpark offers Christian sleep meditation, bedtime prayer, and faith-based sleep stories to help you rest in God\'s peace. Free on iOS and Android.',
  alternates: { canonical: 'https://faithspark.app/christian-sleep-meditation/' },
  openGraph: {
    title: 'Christian Sleep Meditation | Faith-Based Bedtime Stories and Prayer',
    description: 'FaithSpark offers Christian sleep meditation, bedtime prayer, and faith-based sleep stories to help you rest in God\'s peace. Free on iOS and Android.',
    url: 'https://faithspark.app/christian-sleep-meditation/',
    images: [{ url: '/Faithspark1200x630.jpg', width: 1200, height: 630, alt: 'FaithSpark Christian Sleep Meditation' }],
  },
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
      url: 'https://faithspark.app',
      downloadUrl: 'https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Christian sleep meditation?',
          acceptedAnswer: { '@type': 'Answer', text: 'Christian sleep meditation is the practice of quieting your mind at night using Scripture, prayer, and faith-based reflection — rather than mindfulness techniques rooted in other traditions. It helps you release the day\'s worries to God and rest in His peace. FaithSpark\'s sleep stories and bedtime prayer features are built on this approach.' },
        },
        {
          '@type': 'Question',
          name: 'Are there Christian bedtime stories for adults?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark includes Christian bedtime stories for adults — faith-based narratives rooted in Scripture that help calm your mind and draw your thoughts toward God as you fall asleep. These are not children\'s stories — they\'re written for grown-up faith and grown-up struggles.' },
        },
        {
          '@type': 'Question',
          name: 'Is Christian sleep meditation biblical?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Psalm 4:8 says "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety." Scripture repeatedly connects rest with trust in God. Christian sleep meditation is simply a way of practicing that trust — letting Scripture and prayer replace the anxious thoughts that often keep us awake.' },
        },
        {
          '@type': 'Question',
          name: 'What is the best app for Christian sleep music or meditation?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark combines Christian sleep meditation, bedtime prayer, and faith-based sleep stories in one free app. Rather than just ambient Christian sleep music, FaithSpark guides you through prayer and Scripture to help your mind settle in God\'s presence before sleep.' },
        },
        {
          '@type': 'Question',
          name: 'Can sleep stories help with anxiety?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sleep stories — especially faith-based ones that anchor your thoughts in Scripture — can significantly reduce nighttime anxiety by redirecting your mind from worry to peace. FaithSpark\'s Christian sleep stories pair narrative with gentle prayer to help you release the day\'s stress to God.' },
        },
      ],
    },
  ],
};

const S = {
  page: { background: '#1a1208', color: '#fff', fontFamily: 'var(--font-lato), sans-serif', fontWeight: 300 } as React.CSSProperties,
  hero: { position: 'relative' as const, minHeight: 480, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '120px 24px 80px' },
  heroImg: { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const, opacity: 0.28 },
  heroOverlay: { position: 'absolute' as const, inset: 0, background: 'linear-gradient(to bottom, rgba(13,8,0,0.45) 0%, rgba(13,8,0,0.88) 100%)' },
  heroInner: { position: 'relative' as const, zIndex: 1, maxWidth: 760, margin: '0 auto' },
  tag: { fontFamily: 'var(--font-cinzel)', fontSize: 11, letterSpacing: '0.28em', color: '#C8762A', marginBottom: 16, textTransform: 'uppercase' as const },
  h1: { fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 },
  sub: { fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' },
  btnRow: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const },
  btnApple: { background: '#fff', color: '#1a1208', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' },
  btnPlay: { background: '#C8762A', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' },
  body: { maxWidth: 800, margin: '0 auto', padding: '72px 24px' },
  h2: { fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 700, color: '#C8762A', marginBottom: 20, marginTop: 56 },
  h3: { fontFamily: 'var(--font-cinzel)', fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12, marginTop: 32 },
  p: { fontSize: 17, lineHeight: 1.85, color: 'rgba(255,255,255,0.8)', marginBottom: 20 },
  blockquote: { borderLeft: '3px solid #C8762A', paddingLeft: 24, margin: '32px 0', fontStyle: 'italic' as const, color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7 },
  faqItem: { borderTop: '1px solid rgba(200,118,42,0.2)', paddingTop: 24, marginTop: 24 },
  faqQ: { fontFamily: 'var(--font-cinzel)', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 },
  faqA: { fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' },
  ctaBox: { background: 'rgba(200,118,42,0.1)', border: '1px solid rgba(200,118,42,0.3)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' as const, marginTop: 64 },
  ctaH: { fontFamily: 'var(--font-cinzel)', fontSize: 26, fontWeight: 700, marginBottom: 16 },
  ctaP: { color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 16, lineHeight: 1.7 },
  divider: { borderColor: 'rgba(200,118,42,0.15)', margin: '0' },
};

export default function ChristianSleepMeditationPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-sleep" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/sleep-meditation.jpg" alt="Starry night sky over mountains — Christian sleep meditation" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>Christian Sleep Meditation</p>
          <h1 style={S.h1}>Rest in God&apos;s Peace —<br />Christian Sleep Meditation &amp; Bedtime Prayer</h1>
          <p style={S.sub}>I used to lie in bed at 2am with a mind that wouldn&apos;t shut off. Faith-based sleep stories and bedtime prayer changed that. FaithSpark brings it all into one free app.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download on App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      <article style={S.body}>
        <h2 style={{...S.h2, marginTop: 0}}>Why I Needed Christian Sleep Meditation</h2>
        <p style={S.p}>Driving a truck puts a lot of miles on your mind. I&apos;d pull into a rest stop at midnight, exhausted, and then just lie there staring at the ceiling of my cab for two hours. The thoughts wouldn&apos;t stop. Stuff from the day. Worry about the family. Things I said wrong. Things I should have said.</p>
        <p style={S.p}>I tried a couple of popular sleep apps. They helped a little. But something felt off about meditating on &quot;just breathe&quot; when what I actually needed was to hand my anxieties to God. I needed something that acknowledged why I was worried and then pointed me to the One who actually has it under control.</p>
        <p style={S.p}>That&apos;s the gap FaithSpark fills. Christian sleep meditation isn&apos;t just breathing exercises with a cross on them. It&apos;s prayer. It&apos;s Scripture. It&apos;s telling the truth about your day to God and then trusting Him with it before you close your eyes.</p>

        <blockquote style={S.blockquote}>
          &quot;In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.&quot; — Psalm 4:8
        </blockquote>

        <h2 style={S.h2}>What FaithSpark Offers for Christian Sleep</h2>

        <h3 style={S.h3}>Christian Bedtime Stories for Adults</h3>
        <p style={S.p}>These aren&apos;t children&apos;s stories. FaithSpark&apos;s Christian bedtime stories for adults are faith-based narratives — some rooted in Scripture, some in the experiences of ordinary people walking through hard things — told in a calm, unhurried voice that helps your mind settle. Think of them as the kind of story a wise older believer might tell you to help you put the day down.</p>

        <h3 style={S.h3}>Bedtime Prayer</h3>
        <p style={S.p}>Spark leads you through a short bedtime prayer that helps you hand the day to God before you sleep. It covers gratitude, releasing worry, and trusting God with the things you can&apos;t control. For a lot of people, this is the most impactful 5 minutes of their day — because it&apos;s honest, and because it actually ends the day with God instead of with a phone screen.</p>

        <h3 style={S.h3}>Christian Sleep Meditations</h3>
        <p style={S.p}>FaithSpark&apos;s sleep meditations use Scripture as the anchor. Instead of clearing your mind of all thought, they guide your mind toward a specific promise — peace, safety, provision — and let you rest in that truth. The difference between secular meditation and Christian sleep meditation is simple: one asks you to empty your mind, the other asks you to fill it with what&apos;s actually true.</p>

        <h2 style={S.h2}>Sleep and Scripture — What the Bible Says About Rest</h2>
        <p style={S.p}>The Bible has a lot to say about sleep and rest. Psalm 127:2 says God &quot;grants sleep to those he loves.&quot; Matthew 11:28 is Jesus inviting the heavy-burdened to come to Him. Philippians 4:6-7 promises a peace that &quot;passes all understanding&quot; when we bring our worries to God in prayer.</p>
        <p style={S.p}>Christian sleep meditation is just a practical way to do what Scripture already calls us to — cast our cares on Him, rest in His presence, and trust that the morning is in His hands. Read more in the <Link href="/blog/john-14-27-devotional" style={{ color: '#C8762A' }}>John 14:27 devotional</Link> and the <Link href="/blog/cast-all-your-anxiety-on-him" style={{ color: '#C8762A' }}>1 Peter 5:7 devotional</Link> on the <Link href="/blog" style={{ color: '#C8762A' }}>FaithSpark blog</Link>.</p>

        <h2 style={S.h2}>Questions About Christian Sleep Meditation</h2>
        <div>
          {(schema['@graph'][1] as { mainEntity: Array<{name: string; acceptedAnswer: {text: string}}> }).mainEntity.map((item) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={S.ctaBox}>
          <p style={S.ctaH}>End Tonight in God&apos;s Peace</p>
          <p style={S.ctaP}>Download FaithSpark free and open the sleep section tonight. A bedtime prayer and faith story are waiting.</p>
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
