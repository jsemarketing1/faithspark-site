import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Christian Rehab | Faith-Based Addiction Recovery and Daily Support',
  description: 'Looking for Christian rehab or faith-based addiction help? FaithSpark offers Christ-centered recovery courses, daily Scripture, and guided prayer to support your journey. Free.',
  alternates: { canonical: 'https://faithspark.app/christian-rehab/' },
  openGraph: {
    title: 'Christian Rehab | Faith-Based Addiction Recovery and Daily Support',
    description: 'Looking for Christian rehab or faith-based addiction help? FaithSpark offers Christ-centered recovery courses, daily Scripture, and guided prayer to support your journey. Free.',
    url: 'https://faithspark.app/christian-rehab/',
    images: [{ url: '/Faithspark1200x630.jpg', width: 1200, height: 630, alt: 'FaithSpark Christian Rehab Support' }],
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
          name: 'What is a Christian rehab center?',
          acceptedAnswer: { '@type': 'Answer', text: 'A Christian rehab center is a residential or outpatient addiction treatment facility that integrates Christian faith, Scripture, and prayer into the recovery process. Unlike secular rehab, Christian rehab centers address the spiritual dimension of addiction alongside medical and behavioral treatment.' },
        },
        {
          '@type': 'Question',
          name: 'How do I find Christian rehab near me?',
          acceptedAnswer: { '@type': 'Answer', text: 'To find Christian rehab centers near you, search directories like SAMHSA\'s treatment locator (findtreatment.gov) and filter by faith-based programs. Celebrate Recovery chapters also connect people to faith-based support groups nationwide. FaithSpark can serve as a daily faith companion to support your recovery before, during, and after any treatment program.' },
        },
        {
          '@type': 'Question',
          name: 'Is Christian drug rehabilitation more effective than secular rehab?',
          acceptedAnswer: { '@type': 'Answer', text: 'Research suggests that spiritual belief and faith-based community are strong predictors of long-term recovery success. Christian drug rehabilitation adds the dimension of spiritual accountability, Scripture, prayer, and the belief that transformation is possible through Christ — which can be especially powerful for people whose faith is central to their identity.' },
        },
        {
          '@type': 'Question',
          name: 'What can I do between rehab sessions to support my faith-based recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'Daily faith practices matter enormously in recovery. FaithSpark gives you a daily devotional, guided prayer, Christ-centered recovery courses, and a prayer community — all free. These daily touchpoints keep your spiritual foundation strong between sessions, meetings, or appointments.' },
        },
        {
          '@type': 'Question',
          name: 'Does FaithSpark replace Christian rehab?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. FaithSpark is a daily faith companion — it does not replace professional medical or psychiatric treatment for addiction. If you or someone you love needs Christian rehab, please pursue that first. FaithSpark is designed to work alongside professional treatment as a daily spiritual support tool.' },
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
  warningBox: { background: 'rgba(200,118,42,0.08)', border: '1px solid rgba(200,118,42,0.2)', borderRadius: 12, padding: '20px 24px', margin: '32px 0', fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 },
  blockquote: { borderLeft: '3px solid #C8762A', paddingLeft: 24, margin: '32px 0', fontStyle: 'italic' as const, color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7 },
  courseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, margin: '32px 0' },
  courseCard: { background: 'rgba(200,118,42,0.08)', border: '1px solid rgba(200,118,42,0.25)', borderRadius: 12, padding: '24px 20px' },
  courseName: { fontFamily: 'var(--font-cinzel)', fontSize: 15, fontWeight: 700, color: '#C8762A', marginBottom: 8 },
  courseSub: { fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 },
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

export default function ChristianRehabPage() {
  return (
    <div style={S.page}>
      <Script id="pillar-schema-rehab" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DarkNav />

      <section style={S.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blog/christian-rehab.jpg" alt="Sunrise over a city skyline — hope for Christian recovery and rehab" style={S.heroImg} />
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <p style={S.tag}>Christian Rehab & Recovery</p>
          <h1 style={S.h1}>Christian Rehab —<br />Faith Is What Makes It Last</h1>
          <p style={S.sub}>Professional treatment matters. So does what happens every single day after you leave. FaithSpark is the daily faith companion that keeps your recovery rooted in Christ — for free, on your phone, wherever you are.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 Download FaithSpark Free</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Get it on Google Play</a>
          </div>
        </div>
      </section>

      <article style={S.body}>

        <div style={S.warningBox}>
          <strong style={{ color: '#C8762A' }}>Important:</strong> If you or someone you love is in crisis or needs medical detox, please call SAMHSA&apos;s National Helpline: <strong>1-800-662-4357</strong> (free, confidential, 24/7). FaithSpark is a daily spiritual support tool, not a substitute for professional medical treatment.
        </div>

        <h2 style={{...S.h2, marginTop: 32}}>What Christian Rehab Actually Means</h2>
        <p style={S.p}>Christian rehabilitation centers offer the same core services as any quality addiction treatment program — medical supervision, counseling, group therapy, aftercare planning. What makes them different is the foundation. Faith-based rehab doesn&apos;t just treat the addiction. It addresses the spiritual wound underneath it.</p>
        <p style={S.p}>I never went to an inpatient facility. My road to recovery was messier than that. But I&apos;ve talked to people who have, and the ones who stuck with it long-term almost always say the same thing: the program gave them tools, but their faith gave them a reason to use them. That&apos;s what a Christian rehabilitation center can provide — and what FaithSpark tries to reinforce every single day after you leave.</p>

        <blockquote style={S.blockquote}>
          &quot;He heals the brokenhearted and binds up their wounds.&quot; — Psalm 147:3
        </blockquote>

        <h2 style={S.h2}>What Happens After Christian Rehab</h2>
        <p style={S.p}>The hardest part of recovery isn&apos;t the 30-day program. It&apos;s the Tuesday night six months later when you&apos;re alone and the old voices come back. That&apos;s where daily faith practice becomes the difference between relapse and resilience.</p>
        <p style={S.p}>FaithSpark is built for exactly that gap. Not as a replacement for your sponsor, your counselor, or your church. As a daily tool that keeps God&apos;s Word and prayer active in your life every morning — and every night.</p>

        <h2 style={S.h2}>Christ-Centered Recovery Courses Inside FaithSpark</h2>
        <p style={S.p}>Whether you&apos;re in a Christian rehab program, just out of one, or navigating recovery on your own, FaithSpark&apos;s five recovery courses give you structured, Scripture-based content to work through at your own pace:</p>

        <div style={S.courseGrid}>
          {courses.map(c => (
            <div key={c.name} style={S.courseCard}>
              <p style={S.courseName}>{c.name}</p>
              <p style={S.courseSub}>{c.sub}</p>
            </div>
          ))}
        </div>

        <p style={S.p}>All five courses are free and available inside the app and at <a href="https://app.faithspark.app/explore?tab=addiction" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>app.faithspark.app</a>.</p>

        <h2 style={S.h2}>Daily Faith Support for Your Recovery</h2>

        <h3 style={S.h3}>Daily Scripture Devotionals</h3>
        <p style={S.p}>Every morning, FaithSpark delivers a personalized devotional built from Scripture and tailored to your situation. It&apos;s 10 minutes that can set the tone for your entire day — reminding you whose you are before the world tells you who you&apos;re not.</p>

        <h3 style={S.h3}>Guided Prayer for Temptation and Struggle</h3>
        <p style={S.p}>Spark walks you through prayer in the moments when you need it most — when temptation hits, when shame creeps in, when you need to hand something over to God and don&apos;t know how to say it out loud. No script required.</p>

        <h3 style={S.h3}>Community Prayer Board</h3>
        <p style={S.p}>Post prayer requests inside FaithSpark and have real believers pray for you. Recovery can be isolating. The community inside FaithSpark makes sure you&apos;re never praying alone.</p>

        <h2 style={S.h2}>Finding Christian Rehab Centers</h2>
        <p style={S.p}>If you&apos;re looking for Christian drug rehabilitation or a Christian rehab center near you, here are some places to start:</p>
        <ul style={{ paddingLeft: 24, color: 'rgba(255,255,255,0.8)', lineHeight: 2, fontSize: 16, marginBottom: 20 }}>
          <li><strong>SAMHSA Treatment Locator:</strong> findtreatment.gov — filter by faith-based programs</li>
          <li><strong>Celebrate Recovery:</strong> celebraterecovery.com — faith-based support groups in churches nationwide</li>
          <li><strong>Teen Challenge:</strong> teenchallengeusa.com — long-term Christian residential programs</li>
          <li><strong>Your local church:</strong> Many churches have recovery ministries or can refer you to one</li>
        </ul>
        <p style={S.p}>And for daily faith support at every stage of the journey, download FaithSpark. You can also read the <Link href="/blog/psalm-34-devotional-taste-and-see" style={{ color: '#C8762A' }}>Psalm 34 devotional</Link> and the <Link href="/blog/john-16-33-devotional" style={{ color: '#C8762A' }}>John 16:33 devotional</Link> on the <Link href="/blog" style={{ color: '#C8762A' }}>FaithSpark blog</Link>.</p>

        <h2 style={S.h2}>Questions About Christian Rehab</h2>
        <div>
          {(schema['@graph'][1] as { mainEntity: Array<{name: string; acceptedAnswer: {text: string}}> }).mainEntity.map((item) => (
            <div key={item.name} style={S.faqItem}>
              <p style={S.faqQ}>{item.name}</p>
              <p style={S.faqA}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={S.ctaBox}>
          <p style={S.ctaH}>Keep Your Faith Active Every Day in Recovery</p>
          <p style={S.ctaP}>Download FaithSpark free — daily devotionals, guided prayer, and five Christ-centered recovery courses, all in one app.</p>
          <div style={S.btnRow}>
            <a href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724" style={S.btnApple}>📱 App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" style={S.btnPlay}>🤖 Google Play</a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 16 }}>Also available on the web at <a href="https://app.faithspark.app" target="_blank" rel="noopener noreferrer" style={{ color: '#C8762A' }}>app.faithspark.app</a></p>
        </div>
      </article>

      <hr style={S.divider} />
      <DarkFooter />
    </div>
  );
}
