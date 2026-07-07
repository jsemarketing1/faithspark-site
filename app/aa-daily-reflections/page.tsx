import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'AA Daily Reflections — A Faith-Based Approach for Today',
  description: 'Looking for a Christian take on AA daily reflections? Joey, author of the faith-based AA Daily Reflections book, shares how FaithSpark supports your recovery with Scripture and prayer. Free app.',
  alternates: { canonical: 'https://faithspark.app/aa-daily-reflections' },
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
      '@type': 'Book',
      name: 'AA Daily Reflections: A Faith-Based Approach',
      author: { '@type': 'Person', name: 'Joey' },
      url: 'https://www.amazon.com/AA-Daily-Reflections-Book-Faith-Based-ebook/dp/B0DHFV6R5N',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are AA daily reflections?',
          acceptedAnswer: { '@type': 'Answer', text: 'AA daily reflections are short daily readings designed to support sobriety by encouraging reflection, honesty, and a connection to a higher power. The official AA Daily Reflections book is published by Alcoholics Anonymous. A faith-based companion to that content — written from a Christian perspective — is available in book form and through the FaithSpark app.' },
        },
        {
          '@type': 'Question',
          name: 'Is there a faith-based AA daily reflections app?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. FaithSpark is a daily reflections app with a Christian faith angle — daily devotionals, guided prayer, and Christ-centered recovery courses that complement your AA daily reading with Scripture and prayer. It\'s free on iOS and Android.' },
        },
        {
          '@type': 'Question',
          name: 'What is the AA Daily Reflections faith-based book?',
          acceptedAnswer: { '@type': 'Answer', text: 'The AA Daily Reflections faith-based book by Joey pairs each day\'s reading with a Christian perspective — Scripture, prayer, and reflection from a believer who has walked the road of recovery personally. It\'s available on Amazon as an ebook.' },
        },
        {
          '@type': 'Question',
          name: 'Can I use AA and be a Christian?',
          acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Many Christians are in AA and find that their faith deepens their recovery. AA\'s concept of a higher power is intentionally non-specific — as a Christian, that higher power is Jesus. The faith-based perspective simply names what many believers already know: that God is the source of lasting recovery.' },
        },
        {
          '@type': 'Question',
          name: 'How does FaithSpark support AA recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'FaithSpark supports AA recovery as a daily faith companion — not a replacement for meetings, sponsors, or the AA program. It provides daily Scripture devotionals, guided prayer for specific struggles, Christ-centered recovery courses, and a prayer community. Think of it as what happens between meetings — every single day.' },
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
  bookCard: { background: 'rgba(200,118,42,0.1)', border: '1px solid rgba(200,118,42,0.3)', borderRadius: 12, padding: '28px 24px', margin: '32px 0', display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' as const },
  bookTitle: { fontFamily: 'var(--font-cinzel)', fontSize: 18, fontWeight: 700, color: '#C8762A', marginBottom: 8 },
  bookDesc: { fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 },
  bookLink: { color: '#C8762A', fontWeight: 700, fontSize: 14, textDecoration: 'none' },
  blockquote: { borderLeft: '3px solid #C8762A', paddingLeft: 24, margin: '32px 0', fontStyle: 'italic' as const, color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7 },
  faqItem: { borderTop: '1px solid rgba(200,118,42,0.2)', paddingTop: 24, marginTop: 24 },
  faqQ: { fontFamily: 'var(--font-cinzel)', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 },
  faqA: { fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' },
  ctaBox: { background: 'rgba(200,118,42,0.1)', border: '1px solid rgba(200,118,42,0.3)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' as const, marginTop: 64 },
  ctaH: { fontFamily: 'var(--font-cinzel)', fontSize: 26, fontWeight: 700, marginBottom: 16 },
  ctaP: { color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: 16, lineHeight: 1.7 },
  divider: { borderColor: 'rgba(200,118,42,0.15)', margin: '0' },
};

export default function AaDailyReflectionsPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-aa" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/aa-daily-reflections.jpg" alt="Journal and coffee by a window — daily reflections for recovery" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>AA Daily Reflections</p>
          <h1 style={S.h1}>AA Daily Reflections<br />With a Faith-Based Perspective</h1>
          <p style={S.sub}>If you&apos;re in AA and your higher power has a name — Jesus — I wrote this for you. Daily reflection, Scripture, and prayer to carry your faith into your recovery, every single day.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download FaithSpark Free</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      <article style={S.body}>
        <h2 style={{...S.h2, marginTop: 0}}>When Your Higher Power Has a Name</h2>
        <p style={S.p}>I sat in AA rooms for a long time feeling a little out of place. Not because I didn&apos;t belong there — I belonged there. But because every time we talked about a &quot;higher power,&quot; I wanted to say: I know who mine is. His name is Jesus. He&apos;s not a vague spiritual force or a concept I invented to get sober. He&apos;s a person. And He&apos;s the reason I&apos;m still here.</p>
        <p style={S.p}>I wrote the AA Daily Reflections faith-based book because I needed something that met me where I was — inside AA, committed to the program, and deeply Christian at the same time. You don&apos;t have to choose between AA and your faith. They can work together. This book, and the FaithSpark app, are built to help you do exactly that.</p>

        <blockquote style={S.blockquote}>
          &quot;Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!&quot; — 2 Corinthians 5:17
        </blockquote>

        <h2 style={S.h2}>The Faith-Based AA Daily Reflections Book</h2>
        <div style={S.bookCard}>
          <div>
            <p style={S.bookTitle}>AA Daily Reflections: A Faith-Based Approach</p>
            <p style={S.bookDesc}>Written by Joey — a believer in recovery who spent years in AA rooms wanting a Christian lens on the daily reflection. This book pairs each day&apos;s reading with Scripture, prayer, and honest reflection from someone who has lived it.</p>
            <a href="https://www.amazon.com/AA-Daily-Reflections-Book-Faith-Based-ebook/dp/B0DHFV6R5N" target="_blank" rel="noopener noreferrer" style={S.bookLink}>📖 Read it on Amazon →</a>
          </div>
        </div>

        <h2 style={S.h2}>FaithSpark — Your Daily Reflections App for AA</h2>
        <p style={S.p}>The book is for your meetings and your morning quiet time. FaithSpark is for every day in between. Here&apos;s what&apos;s inside the app for people in recovery:</p>

        <h3 style={S.h3}>Daily AA Reflections With Scripture</h3>
        <p style={S.p}>Every morning FaithSpark gives you a personalized faith reflection — built around Scripture, honest about struggle, and designed to carry you through the day. It&apos;s not the official AA daily reading, but it&apos;s a Christian companion to it that brings your faith front and center in your recovery.</p>

        <h3 style={S.h3}>Guided Prayer for Recovery</h3>
        <p style={S.p}>The hardest moment in recovery is often the one you face alone, when a craving hits and the meeting is two days away. FaithSpark&apos;s guided prayer feature is built for those moments. Spark walks you through prayer for strength, for forgiveness, for the specific thing you&apos;re carrying today.</p>

        <h3 style={S.h3}>Five Christ-Centered Recovery Courses</h3>
        <p style={S.p}>FaithSpark includes five complete recovery courses covering addiction, anger, self-harm, pornography, and gambling — all Christ-centered and built for people who want more than a behavior change. They&apos;re available free in the app and at <a href="https://app.faithspark.app/explore?tab=addiction" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>app.faithspark.app</a>.</p>

        <h3 style={S.h3}>A Community Praying for Your Sobriety</h3>
        <p style={S.p}>Post a prayer request inside FaithSpark and believers from around the country will pray for you. You don&apos;t have to share your story. Just your request. Sometimes knowing someone is praying is enough to get you through the next hour.</p>

        <h2 style={S.h2}>AA and Christian Faith — They Work Together</h2>
        <p style={S.p}>AA doesn&apos;t ask you to leave your faith at the door. The steps are compatible with Christian belief. Step 3 — turning your will over to a higher power — is just the AA language for what Christians call surrender. Step 11 — prayer and meditation — is what we&apos;d call spending time with God.</p>
        <p style={S.p}>The faith-based daily reflection and the AA program can absolutely live together. That&apos;s the whole point. Read more on the <Link href="/blog" style={{ color: '#C8762A' }}>FaithSpark blog</Link> — especially the <Link href="/blog/genesis-22-devotional" style={{ color: '#C8762A' }}>Genesis 22 devotional</Link> on trust when the path is hard.</p>

        <h2 style={S.h2}>Questions About AA Daily Reflections and Faith</h2>
        <div>
          {schema['@graph'][2].mainEntity.map((item: {name: string; acceptedAnswer: {text: string}}) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={S.ctaBox}>
          <p style={S.ctaH}>Carry Your Faith Into Your Recovery</p>
          <p style={S.ctaP}>Download FaithSpark free — your daily Christian reflection, guided prayer, and recovery courses are all inside. Free on iOS and Android.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Google Play</a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 16 }}>Or read the book: <a href="https://www.amazon.com/AA-Daily-Reflections-Book-Faith-Based-ebook/dp/B0DHFV6R5N" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>AA Daily Reflections: A Faith-Based Approach on Amazon</a></p>
        </div>
      </article>

      <hr style={S.divider} />
      <DarkFooter />
    </div>
  );
}
