import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Daily Prayer App | Guided Christian Prayer | Free iOS and Android',
  description: 'FaithSpark is the best daily prayer app for Christians. Guided audio prayer, morning prayer routines, prayer list, and a companion that prays with you out loud. Free.',
  alternates: { canonical: 'https://faithspark.app/daily-prayer-app/' },
  openGraph: {
    title: 'Daily Prayer App | Guided Christian Prayer | Free iOS and Android',
    description: 'FaithSpark is the best daily prayer app for Christians. Guided audio prayer, morning prayer routines, prayer list, and a companion that prays with you out loud. Free.',
    url: 'https://faithspark.app/daily-prayer-app/',
    images: [{ url: '/Faithspark1200x630.jpg', width: 1200, height: 630, alt: 'FaithSpark Daily Prayer App' }],
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
          name: 'What is the best daily prayer app for Christians?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark is one of the best daily prayer apps for Christians because it doesn\'t just remind you to pray — it prays with you. Spark, your AI faith companion, leads guided audio prayer sessions that feel personal, not scripted. It\'s free on iOS and Android.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a free prayer app?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark is a free Christian prayer app available on the App Store and Google Play. The daily prayer, guided prayer sessions, morning prayer routines, and prayer list are all free features.' },
        },
        {
          '@type': 'Question',
          name: 'What is a guided prayer app?',
          acceptedAnswer: { '@type': 'Answer', text: 'A guided prayer app leads you through prayer step by step — speaking aloud so you can follow along or pray silently. FaithSpark\'s guided prayer feature uses Spark, a personal AI faith companion, to lead you through morning prayer, evening prayer, or prayer for specific struggles.' },
        },
        {
          '@type': 'Question',
          name: 'How do I build a morning prayer routine?',
          acceptedAnswer: { '@type': 'Answer', text: 'Start small. FaithSpark makes it easy with a morning prayer reminder that opens a guided session you can complete in 5 minutes. You can also build a prayer list inside the app so you\'re praying consistently for the same people every day.' },
        },
        {
          '@type': 'Question',
          name: 'Can I use a prayer list app to track who I\'m praying for?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark has a built-in prayer list where you can save names and specific requests. You\'ll be reminded to pray for each person, and you can mark answers to prayer when God moves.' },
        },
      ],
    },
  ],
};

const S = {
  page: { background: '#1a1208', color: '#fff', fontFamily: 'var(--font-lato), sans-serif', fontWeight: 300 } as React.CSSProperties,
  hero: { position: 'relative' as const, minHeight: 480, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '120px 24px 80px' },
  heroImg: { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const, opacity: 0.25 },
  heroOverlay: { position: 'absolute' as const, inset: 0, background: 'linear-gradient(to bottom, rgba(13,8,0,0.5) 0%, rgba(13,8,0,0.85) 100%)' },
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
  faqItem: { borderTop: '1px solid rgba(200,118,42,0.2)', paddingTop: 24, marginTop: 24 },
  faqQ: { fontFamily: 'var(--font-cinzel)', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 },
  faqA: { fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' },
  ctaBox: { background: 'rgba(200,118,42,0.1)', border: '1px solid rgba(200,118,42,0.3)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' as const, marginTop: 64 },
  ctaH: { fontFamily: 'var(--font-cinzel)', fontSize: 26, fontWeight: 700, marginBottom: 16 },
  ctaP: { color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 16, lineHeight: 1.7 },
  divider: { borderColor: 'rgba(200,118,42,0.15)', margin: '0' },
};

export default function DailyPrayerAppPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-prayer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/prayer-app.jpg" alt="Woman praying with folded hands — daily prayer app" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>Daily Prayer App</p>
          <h1 style={S.h1}>A Daily Prayer App That Prays<br />With You — Not Just At You</h1>
          <p style={S.sub}>I used to say the same three sentences every morning and call it prayer. FaithSpark changed that. Spark leads you through guided prayer that feels like a real conversation with God.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download on App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      <article style={S.body}>
        <h2 style={{...S.h2, marginTop: 0}}>Why I Needed a Different Kind of Prayer App</h2>
        <p style={S.p}>For years my prayer life looked like this: wake up, say a quick &quot;God, help me today,&quot; and go back to scrolling my phone. I&apos;d feel guilty about it. I&apos;d promise myself I&apos;d do better. Then repeat the same cycle the next morning. I knew I was supposed to pray more, I just didn&apos;t know how to make it feel real.</p>
        <p style={S.p}>That&apos;s what led me to build the guided prayer feature inside FaithSpark. Not a timer app. Not a Bible quote generator. Something that actually leads you through prayer — morning prayer, evening prayer, prayer for specific struggles — out loud, with you, like a conversation.</p>
        <p style={S.p}>I wanted my kids to grow up knowing how to pray. Not just reciting something they memorized, but actually talking to God like He&apos;s in the room. FaithSpark is the tool I built to help make that happen for my family — and for yours.</p>

        <h2 style={S.h2}>Everything Inside FaithSpark&apos;s Daily Prayer App</h2>

        <h3 style={S.h3}>Guided Prayer Sessions</h3>
        <p style={S.p}>Spark — your personal AI faith companion — leads you through guided prayer sessions that cover praise, confession, thanksgiving, and requests. You can follow along silently or pray out loud with Spark. It&apos;s the best free prayer app I know of because it doesn&apos;t just remind you to pray. It actually helps you do it.</p>

        <h3 style={S.h3}>Morning Prayer Routine</h3>
        <p style={S.p}>A consistent morning prayer routine changed my life more than any other habit I&apos;ve built. FaithSpark makes it easy — open the app, tap the morning prayer, and you&apos;re guided through a 5-minute session that sets the tone for the whole day. Driving a truck at 3am, I&apos;d run the morning prayer through my earbuds before I even hit the interstate.</p>

        <h3 style={S.h3}>Prayer List — Never Forget Who You&apos;re Praying For</h3>
        <p style={S.p}>I used to say &quot;I&apos;ll pray for you&quot; and then forget within the hour. FaithSpark&apos;s prayer list saves every name and request. You get reminders to pray for each person, and you can mark when God answers. It&apos;s a simple thing but it completely changed how I pray for the people in my life.</p>

        <h3 style={S.h3}>Christian Prayer Community</h3>
        <p style={S.p}>Inside FaithSpark you can post prayer requests to a community board and have other believers pray for you. Real people, real faith. I&apos;ve seen some powerful things happen through that board — and I don&apos;t say that lightly.</p>

        <h2 style={S.h2}>Building a Prayer Life That Actually Sticks</h2>
        <p style={S.p}>Prayer isn&apos;t complicated — but starting is. The best daily prayer app is the one you actually open every morning. FaithSpark makes it the first thing you want to reach for because it meets you right where you are, whether you&apos;ve been walking with God for 30 years or you&apos;re just getting started.</p>
        <p style={S.p}>If you want to go deeper on what Scripture says about prayer, read the <Link href="/blog/philippians-4-6-devotional" style={{ color: '#C8762A' }}>Philippians 4:6 devotional</Link> or the <Link href="/blog/matthew-11-28-devotional" style={{ color: '#C8762A' }}>Matthew 11:28 devotional</Link> on the <Link href="/blog" style={{ color: '#C8762A' }}>FaithSpark blog</Link>.</p>

        <h2 style={S.h2}>Questions About Daily Prayer Apps</h2>
        <div>
          {(schema['@graph'][1] as { mainEntity: Array<{name: string; acceptedAnswer: {text: string}}> }).mainEntity.map((item) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={S.ctaBox}>
          <p style={S.ctaH}>Ready to Build a Real Prayer Life?</p>
          <p style={S.ctaP}>Download FaithSpark free and let Spark lead your first guided prayer session today.</p>
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
