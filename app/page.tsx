export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';
import Particles from '@/components/Particles';
import BlogCard from '@/components/BlogCard';
import MobileSplash from '@/components/MobileSplash';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'FaithSpark — Free Christian Faith App | AI Devotionals & Bible Reader',
  description: 'FaithSpark is a free Christian faith app for iPhone with AI devotionals, Bible reader, community prayer board, guided prayer sessions, sleep stories, Scripture Art, and your personal AI faith companion Spark.',
  alternates: { canonical: 'https://faithspark.app' },
  openGraph: {
    title: 'FaithSpark — Free Christian Faith App | AI Devotionals & Bible Reader',
    description: 'Free AI devotionals, full Bible reader, community prayer, guided prayer sessions, sleep stories, Scripture Art, and your personal AI faith companion — all on your iPhone.',
    url: 'https://faithspark.app',
    images: [{ url: '/Faithspark1200x630.jpg', width: 1200, height: 630, alt: 'FaithSpark — Free Christian Faith App' }],
  },
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FaithSpark',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'LifestyleApplication',
      description: 'A free Christian faith app with AI devotionals, Bible reader, community prayer board, guided prayer sessions, sleep stories, Scripture Art, and personal AI faith companion Spark.',
      url: 'https://faithspark.app',
      downloadUrl: 'https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Joey Etheridge' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FaithSpark',
      url: 'https://faithspark.app',
      description: 'Faith app built by Mind Garden Press — AI devotionals, Bible reader, prayer, and personal faith companion.',
      contactPoint: { '@type': 'ContactPoint', email: 'faithsparkhome@gmail.com', contactType: 'customer support' },
    },
  ];

  return (
    <div className="home-wrap">
      <MobileSplash />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DarkNav />
      <Particles />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="flame-wrap">
          <div className="fr fr1" /><div className="fr fr2" /><div className="fr fr3" />
          <span className="flame-icon">🔥</span>
        </div>
        <p className="eyebrow">Introducing FaithSpark</p>
        <h1 className="hero-title">
          <span className="f">Faith</span><span className="s">Spark</span>
        </h1>
        <p className="hero-tag">Faith That Knows Your Name</p>
        <p className="hero-desc">
          The world&apos;s first faith app with a personal AI companion who truly knows you.
          Personalized devotionals, Bible study, prayer community and Spark,
          your AI faith companion who grows with you every single day.
        </p>
        <div className="btn-row">
          <a href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724" className="btn-gold">
            🍎 Download Free on iPhone
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" className="btn-ghost">
            🤖 Download on Android
          </a>
        </div>
        <p className="free-note">Most features are <span>completely free</span>. No credit card needed.</p>
      </section>

      {/* ── VERSE ── */}
      <section className="verse" style={{ background: '#1a1208' }}>
        <p>&ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;</p>
        <span>— Psalm 119:105</span>
      </section>

      {/* ── PILLAR HUB ── */}
      <div id="explore" style={{ background: '#160d04', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <p className="sec-eye">Explore FaithSpark</p>
          <h2 className="sec-title">Your Complete<br /><span style={{ color: '#C8762A' }}>Faith Hub</span></h2>
          <p className="sec-sub" style={{ marginBottom: 52 }}>Tap any topic to go deeper. Download the app and get it all free.</p>

          <p className="hp-cat-label">Daily Faith</p>
          <div className="hp-card-grid" style={{ marginBottom: 48 }}>
            {[
              { href: '/daily-bible-verse-app', icon: '📖', img: '/blog/bible-verse-daily-app.jpg', title: 'Daily Bible Verse App', desc: 'A verse every morning with a plain-English explanation, plus a scanner that reads any printed Bible.' },
              { href: '/daily-prayer-app', icon: '🙏', img: '/blog/prayer-app.jpg', title: 'Daily Prayer App', desc: 'Guided audio prayer, morning routines, a prayer list, and a companion who prays with you out loud.' },
              { href: '/daily-devotional-app', icon: '✨', img: '/blog/devotional-app.jpg', title: 'Daily Devotional App', desc: 'AI-personalized devotionals that know your name, your season, and what you\'re going through right now.' },
              { href: '/christian-sleep-meditation', icon: '💤', img: '/blog/sleep-meditation.jpg', title: 'Christian Sleep Meditation', desc: 'Faith-based sleep stories and bedtime prayer to help you rest in God\'s peace every night.' },
            ].map((p) => (
              <Link href={p.href} key={p.href} className="hp-pillar-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} className="hp-pillar-img" />
                <div className="hp-pillar-overlay" />
                <div className="hp-pillar-body">
                  <span className="hp-pillar-icon">{p.icon}</span>
                  <h3 className="hp-pillar-title">{p.title}</h3>
                  <p className="hp-pillar-desc">{p.desc}</p>
                  <span className="hp-pillar-btn">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>

          <p className="hp-cat-label">Recovery &amp; Healing</p>
          <div className="hp-card-grid hp-card-grid-3" style={{ marginBottom: 48 }}>
            {[
              { href: '/christian-recovery', icon: '🕊️', img: '/blog/christian-recovery.jpg', title: 'Christian Recovery', desc: 'Five Christ-centered recovery courses covering addiction, anger, self-harm, pornography, and gambling. All free in the app.' },
              { href: '/aa-daily-reflections', icon: '📓', img: '/blog/aa-daily-reflections.jpg', title: 'AA Daily Reflections', desc: 'A faith-based take on AA daily reflections written by Joey, who has lived it. Book and app working together.' },
              { href: '/christian-rehab', icon: '🌅', img: '/blog/christian-rehab.jpg', title: 'Christian Rehab Support', desc: 'What happens every day after rehab is as important as the program itself. FaithSpark is your daily faith anchor.' },
            ].map((p) => (
              <Link href={p.href} key={p.href} className="hp-pillar-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} className="hp-pillar-img" />
                <div className="hp-pillar-overlay" />
                <div className="hp-pillar-body">
                  <span className="hp-pillar-icon">{p.icon}</span>
                  <h3 className="hp-pillar-title">{p.title}</h3>
                  <p className="hp-pillar-desc">{p.desc}</p>
                  <span className="hp-pillar-btn">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724" className="btn-gold">🍎 Download Free. All of This Is Inside.</a>
          </div>
        </div>
      </div>

      {/* ── APP FEATURES STRIP (6 items) ── */}
      <section className="section" id="features" style={{ background: '#1a1208' }}>
        <p className="sec-eye">What&apos;s Inside</p>
        <h2 className="sec-title">Everything You Need.<br /><span style={{ color: '#C8762A' }}>Completely Free.</span></h2>
        <p className="sec-sub">No paywalls on the good stuff.</p>
        <div className="hp-features-grid">
          {[
            { icon: '📖', title: 'Full Bible Reader', desc: 'Complete KJV with read-aloud, search, and bookmarks.' },
            { icon: '🙏', title: 'Guided Prayer', desc: '8 categories of guided audio prayer sessions for every moment.' },
            { icon: '✨', title: 'AI Devotionals', desc: 'Personalized daily devotionals written for your name and your life.' },
            { icon: '💤', title: 'Sleep Stories', desc: '10 faith-based sleep stories and bedtime prayers for restful nights.' },
            { icon: '🔥', title: 'Spark Your AI Companion', desc: 'Your personal faith friend who listens, remembers, and walks with you.' },
            { icon: '🎮', title: 'Bible Games & Plans', desc: 'Trivia, word search, reading plans, recovery courses, and more.' },
          ].map((f) => (
            <div className="hp-feature-card" key={f.title}>
              <span className="hp-feature-icon">{f.icon}</span>
              <h3 className="hp-feature-title">{f.title}</h3>
              <p className="hp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPARK ── */}
      <section className="spark-wrap" id="spark">
        <div className="spark-inner">
          <div className="spark-left">
            <p className="sec-eye">Meet Spark</p>
            <h2 className="sec-title">Your Personal<br /><span style={{ color: '#C8762A' }}>AI Companion</span></h2>
            <p className="sec-sub">Spark is not a chatbot. He is a friend who remembers you, grows with you, and walks beside you every single day.</p>
            <ul className="spark-list">
              <li><span className="sli">🔥</span> Remembers your struggles, prayers, and victories across every conversation</li>
              <li><span className="sli">🔥</span> Ask anything about the Bible, life, relationships, or faith at any time</li>
              <li><span className="sli">🔥</span> Reads your journal and prayer requests to truly know you</li>
              <li><span className="sli">🔥</span> Sends personal check-ins based on what you have been going through</li>
              <li><span className="sli">🔥</span> Available 24/7 for prayer, guidance, or just a friend when you need one</li>
            </ul>
          </div>
          <div className="spark-right">
            <div className="spark-glow">
              <div className="sgr sgr1" /><div className="sgr sgr2" /><div className="sgr sgr3" />
              <span className="spark-flame-big">🔥</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="videos-wrap" id="videos">
        <div className="videos-inner">
          <p className="sec-eye" style={{ textAlign: 'center' }}>See It In Action</p>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Watch FaithSpark<br /><span style={{ color: '#C8762A' }}>Come Alive</span></h2>
          <p className="sec-sub" style={{ textAlign: 'center', margin: '0 auto 56px' }}>Real features. Real faith. See exactly what FaithSpark can do for you.</p>
          <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/_sYIsqZkhaM"
                title="FaithSpark — See It In Action"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="blog-preview-wrap" id="blog">
        <div className="blog-preview-inner">
          <p className="sec-eye">Faith Journal</p>
          <h2 className="sec-title">Articles to Grow<br /><span style={{ color: '#C8762A' }}>Your Faith</span></h2>
          <p className="sec-sub">Real stories and biblical wisdom from a dad, husband, and truck driver still figuring it out one day at a time.</p>
          {latestPosts.length > 0 ? (
            <>
              <div className="free-grid" style={{ marginTop: '52px' }}>
                {latestPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '44px' }}>
                <Link href="/blog" className="btn-gold">Read All Articles</Link>
              </div>
            </>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '52px', color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>Articles coming soon.</p>
          )}
        </div>
      </section>

      {/* ── AUTHOR BIO ── */}
      <div style={{ padding: '0 24px 72px', maxWidth: 800, margin: '0 auto' }}>
        <div className="hp-author-bio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/blog/joey.png" alt="Joey Etheridge, creator of FaithSpark" className="hp-author-avatar" loading="lazy" />
          <div>
            <p className="hp-author-name">Joey Etheridge</p>
            <p className="hp-author-role">Founder · FaithSpark · Mind Garden Press</p>
            <p className="hp-author-text">
              I&apos;m a truck driver, husband, and dad of four from Texas who found my faith on the long haul.
              I built FaithSpark because I needed something real. A devotional that felt personal, a prayer life
              that actually happened, and a companion for the quiet hours on the road. Everything in this app
              comes from what I personally needed and couldn&apos;t find anywhere else.
            </p>
          </div>
        </div>
      </div>

      {/* ── APP CTA BOX ── */}
      <div style={{ padding: '0 24px 72px', maxWidth: 800, margin: '0 auto' }}>
        <div className="hp-cta-box">
          <h3 className="hp-cta-title">Take FaithSpark on the Road 🚛</h3>
          <p className="hp-cta-desc">
            AI devotionals written just for you, guided prayer, full Bible reader, sleep stories,
            and five Christ-centered recovery courses — all free. Built by a truck driver who needed it.
          </p>
          <div className="hp-cta-btns">
            <a href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724" className="hp-cta-btn" target="_blank" rel="noopener noreferrer">
              📱 Download on iOS
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" className="hp-cta-btn hp-cta-btn-secondary" target="_blank" rel="noopener noreferrer">
              🤖 Get on Android
            </a>
            <a href="https://app.faithspark.app" className="hp-cta-btn hp-cta-btn-secondary" target="_blank" rel="noopener noreferrer">
              💻 Open Web App
            </a>
          </div>
        </div>
      </div>

      {/* ── SEO CONTENT BLOCK ── */}
      <div style={{ padding: '0 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <div className="hp-seo-block">
          <h2 className="hp-seo-title">A Faith App Built for Every Season of Life</h2>
          <p className="hp-seo-text">
            FaithSpark is the free Christian faith app for people who want their faith to be real every day — not just on Sundays.
            Looking for a <Link href="/daily-bible-verse-app">daily Bible verse app</Link> that explains the verse in plain English?
            Want a <Link href="/daily-prayer-app">daily prayer app</Link> that actually guides you through prayer out loud?
            Need a <Link href="/daily-devotional-app">daily devotional app</Link> that writes something personal to you every morning?
            FaithSpark has all of it free on iOS and Android.
            Struggling to sleep? The <Link href="/christian-sleep-meditation">Christian sleep meditation</Link> and bedtime prayer features
            are built to help you rest in God&apos;s peace.
            Walking through recovery? The <Link href="/christian-recovery">Christian recovery</Link> courses,
            <Link href="/aa-daily-reflections"> AA daily reflections</Link> book, and
            <Link href="/christian-rehab"> Christian rehab</Link> support page are all here for you.
            And for deeper reading, the <Link href="/blog">FaithSpark devotional blog</Link> has over 30 articles
            on Scripture, prayer, and faith for real life.
          </p>
        </div>
      </div>

      <DarkFooter />
    </div>
  );
}
