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
  const latestPosts = getAllPosts().slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FaithSpark',
      operatingSystem: 'iOS',
      applicationCategory: 'LifestyleApplication',
      description: 'A free Christian faith app with AI devotionals, Bible reader, community prayer board, guided prayer sessions, sleep stories, Scripture Art, and personal AI faith companion Spark.',
      url: 'https://faithspark.app',
      downloadUrl: 'https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Mind Garden Press' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DarkNav />
      <Particles />

      {/* HERO */}
      <section className="hero">
        <div className="flame-wrap">
          <div className="fr fr1" />
          <div className="fr fr2" />
          <div className="fr fr3" />
          <span className="flame-icon">🔥</span>
        </div>
        <p className="eyebrow">Introducing FaithSpark</p>
        <h1 className="hero-title">
          <span className="f">Faith</span><span className="s">Spark</span>
        </h1>
        <p className="hero-tag">Faith That Knows Your Name</p>
        <p className="hero-desc">
          The world&apos;s first faith app with a personal AI companion who truly knows you.
          Personalized devotionals, Bible study, prayer community — and Spark,
          your AI faith companion who grows with you every single day.
        </p>
        <div className="btn-row">
          <a href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724" className="btn-gold">
            🍎 Download on iPhone — Free
          </a>
          <span className="btn-ghost">
            Android &nbsp;<span className="cs-tag">Coming Soon</span>
          </span>
        </div>
        <p className="free-note">Most features are <span>completely free</span> — no credit card needed</p>
      </section>

      {/* VERSE */}
      <section className="verse" style={{ background: '#0d0800' }}>
        <p>&ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;</p>
        <span>— Psalm 119:105</span>
      </section>

      {/* FREE FEATURES */}
      <section className="section" id="features" style={{ background: '#0d0800' }}>
        <p className="sec-eye">What&apos;s Included Free</p>
        <h2 className="sec-title">Everything You Need.<br />Completely Free.</h2>
        <p className="sec-sub">No paywalls on the good stuff. FaithSpark gives you a full, rich faith experience at zero cost.</p>

        <div className="free-grid">
          {[
            { icon: '📖', title: 'Full Bible Reader', desc: 'Complete KJV Bible with read-aloud and scripture search. Carry the entire Word of God in your pocket.' },
            { icon: '🙏', title: 'Community Prayer Board', desc: 'Share prayer requests, pray for others, and build real community with believers around the world.' },
            { icon: '👨‍👩‍👧‍👦', title: '52-Week Family Bible Study', desc: 'A full year of guided family Bible studies to build a lasting legacy of faith in your home.' },
            { icon: '📚', title: 'Bible Courses', desc: 'Deep dive courses on the Life of Jesus, Bible Characters, Prophecy, Addiction Recovery, and Lifestyle plans.' },
            { icon: '✏️', title: 'Faith Journal', desc: 'Write, reflect, and grow. Your personal faith journal to capture thoughts, prayers, and insights every day.' },
            { icon: '🎮', title: 'Bible Games', desc: 'Word Search, Trivia, Sudoku, Fill-in-the-Blank, Faith Dice, and Word Scramble. Learn scripture while having fun.' },
            { icon: '✨', title: 'Daily Devotionals', desc: 'A fresh, personalized devotional every morning to start your day grounded in faith and scripture.' },
            { icon: '📷', title: 'Bible Scanner', desc: 'Point your camera at any printed verse and FaithSpark instantly identifies and opens it for you.' },
            { icon: '⚡', title: 'Instant Prayer', desc: 'Need a prayer right now? Tap once and receive a heartfelt, scripture-backed prayer for your moment.' },
            { icon: '📖', title: 'Bible Reading Plans', desc: '7 complete plans — Life of Jesus, Psalms, Proverbs, New Testament, and more. Day-by-day readings, reflection questions, streaks, and progress tracking.' },
            { icon: '🌅', title: 'Morning & Evening Routines', desc: 'A time-aware card that changes throughout your day — Morning, Midday, Evening, and Bedtime — with quick-action buttons for exactly the right feature at the right moment.' },
            { icon: '🙏', title: 'Guided Prayer Sessions', desc: '8 categories including Morning Prayer, Anxiety & Peace, Grief, and Gratitude. A personal prayer is read aloud with natural pauses and a calming animation.' },
            { icon: '💤', title: 'Sleep Stories & Bedtime Prayers', desc: '10 soothing Bible stories read slowly at bedtime — The Good Shepherd, Cast Your Worries, Peace Like a River, and more. Ultra-dark screen with a breathing animation.' },
            { icon: '🎨', title: 'Scripture Art', desc: 'Turn any of 12 featured verses into a beautiful shareable image. Choose from 5 gradient themes — Flame, Ocean, Forest, Royal, or Dawn — and save or share it instantly.' },
            { icon: '📰', title: 'Christian News', desc: 'Stay connected with the latest news from the Christian world. Fresh content delivered daily.' },
            { icon: '⛪', title: 'Find a Church', desc: 'Discover churches near you right from the app. Search by location and find your faith community.' },
          ].map((f) => (
            <div className="free-card" key={f.title}>
              <span className="free-card-icon">{f.icon}</span>
              <h3 className="free-card-title">{f.title}</h3>
              <p className="free-card-desc">{f.desc}</p>
              <span className="free-badge">Always Free</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPARK */}
      <section className="spark-wrap" id="spark">
        <div className="spark-inner">
          <div className="spark-left">
            <p className="sec-eye">Meet Spark</p>
            <h2 className="sec-title">Your Personal<br /><span style={{ color: '#C8762A' }}>AI Companion</span></h2>
            <p className="sec-sub">Spark is not a chatbot. He is a friend who remembers you, grows with you, and walks beside you every single day.</p>
            <ul className="spark-list">
              <li><span className="sli">🔥</span> Remembers your struggles, prayers, and victories across every conversation</li>
              <li><span className="sli">🔥</span> Ask anything about the Bible, life, relationships, or faith — any time</li>
              <li><span className="sli">🔥</span> Reads your journal and prayer requests to truly know you</li>
              <li><span className="sli">🔥</span> Sends personal check-ins based on what you have been going through</li>
              <li><span className="sli">🔥</span> Available 24/7 — whether you need prayer, guidance, or just a friend</li>
            </ul>
          </div>
          <div className="spark-right">
            <div className="spark-glow">
              <div className="sgr sgr1" />
              <div className="sgr sgr2" />
              <div className="sgr sgr3" />
              <span className="spark-flame-big">🔥</span>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="videos-wrap" id="videos">
        <div className="videos-inner">
          <p className="sec-eye" style={{ textAlign: 'center' }}>See It In Action</p>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Watch FaithSpark<br /><span style={{ color: '#C8762A' }}>Come Alive</span></h2>
          <p className="sec-sub" style={{ textAlign: 'center', margin: '0 auto 56px' }}>Real features. Real faith. See exactly what FaithSpark can do for you.</p>
          <div className="videos-grid">
            {[
              { id: 'olpC7yV8a4Q', title: 'FaithSpark Overview', label: 'Meet FaithSpark', desc: 'See how personalized AI devotionals and Spark work together every day.' },
              { id: '8B7tfej_1DI', title: 'Spark AI Companion', label: 'Spark AI Companion', desc: 'Your personal faith companion who listens, remembers, and grows with you.' },
              { id: 'eowEBVvuFoo', title: 'Bible Reader & Prayer Board', label: 'Bible & Prayer Board', desc: 'Full KJV Bible reader, verse explanations, bookmarks, and community prayer.' },
              { id: 'nig474nbu2Y', title: 'FaithSpark Latest Update', label: "What's New", desc: 'Bible verse explanations, bookmarks, and reading position saved automatically.', badge: true },
            ].map((v) => (
              <div className="video-card" key={v.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="video-card-label">
                  {v.badge && <span className="video-update-badge">Latest Update</span>}
                  <strong>{v.label}</strong>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="pricing-wrap" id="pricing" style={{ background: '#0d0800' }}>
        <p className="sec-eye">Everything You Get</p>
        <h2 className="sec-title">It&apos;s Free.<br />All of It.</h2>
        <p className="sec-sub">No credit card. No trial countdown. No paywall on the good stuff. Download FaithSpark and get all of this — completely free.</p>
        <div className="all-features-grid">
          {[
            { icon: '📖', name: 'Full KJV Bible Reader', desc: 'The complete Word of God with read-aloud, verse search, bookmarks, and reading position saved automatically.' },
            { icon: '📷', name: 'Bible Scanner', desc: 'Point your camera at any printed verse or passage and FaithSpark instantly identifies and opens it in the app.' },
            { icon: '✨', name: 'Daily Devotionals', desc: 'A fresh, personalized devotional every morning to start your day grounded in faith and scripture.' },
            { icon: '⚡', name: 'Instant Prayer', desc: 'Need a prayer right now? Tap once and receive a heartfelt, scripture-backed prayer tailored to your moment.' },
            { icon: '🙏', name: 'Community Prayer Board', desc: 'Share requests, pray for others, and build real community with believers around the world.' },
            { icon: '🔥', name: 'Spark — AI Faith Companion', desc: 'Your personal AI friend who listens, remembers, and walks beside you every day. Ask anything about the Bible, life, or faith.' },
            { icon: '👨‍👩‍👧‍👦', name: '52-Week Family Bible Study', desc: 'A full year of guided family studies to build a lasting legacy of faith in your home.' },
            { icon: '📚', name: 'Bible Courses', desc: 'Deep dive courses on the Life of Jesus, Bible Characters, Prophecy, Addiction Recovery, and Lifestyle plans.' },
            { icon: '✏️', name: 'Faith Journal', desc: 'Write, reflect, and grow. Capture your thoughts, prayers, and spiritual insights every single day.' },
            { icon: '🎮', name: 'Bible Games', desc: 'Word Search, Trivia, Sudoku, Fill-in-the-Blank, Faith Dice, and Word Scramble. Learn scripture while having fun.' },
            { icon: '📖', name: 'Bible Reading Plans', desc: '7 complete plans — Life of Jesus (40 days), Psalms in 30 Days, 7 Days of Peace, Proverbs, New Testament in 90 Days, 14 Days of Gratitude, and Women of the Bible. Day-by-day readings, streaks, and progress tracking.' },
            { icon: '🌅', name: 'Morning & Evening Routines', desc: 'A time-aware card that shifts throughout your day — Morning, Midday, Evening, and Bedtime — surfacing the right feature at exactly the right moment.' },
            { icon: '🙏', name: 'Guided Prayer Sessions', desc: '8 categories including Morning Prayer, Anxiety & Peace, Grief, Gratitude, and Faith & Trust. A personal prayer is generated and read aloud with a calming animated display.' },
            { icon: '💤', name: 'Sleep Stories & Bedtime Prayers', desc: '10 soothing Bible stories read slowly at bedtime. Ultra-dark screen, breathing orb animation, and a gentle pace designed to help you drift off in peace and faith.' },
            { icon: '🎨', name: 'Scripture Art', desc: 'Turn any of 12 featured verses into a stunning shareable image. 5 gradient themes — Flame, Ocean, Forest, Royal, Dawn. Save to your camera roll or share to any app instantly.' },
            { icon: '📰', name: 'Christian News', desc: 'Stay connected with fresh daily news from the Christian world delivered right to your feed.' },
            { icon: '⛪', name: 'Find a Church', desc: 'Discover churches near you and find your faith community — right from inside the app.' },
          ].map((f) => (
            <div className="af-card" key={f.name}>
              <span className="af-icon">{f.icon}</span>
              <div>
                <p className="af-name">{f.name}</p>
                <p className="af-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="pricing-note">No credit card. No expiry. Download and start today — free.</p>
        <p className="premium-whisper">
          * Want to go deeper? A premium plan is available inside the app for those who want unlimited AI devotionals and unlimited Spark conversations.
        </p>
      </section>

      {/* BLOG PREVIEW */}
      <section className="blog-preview-wrap" id="blog">
        <div className="blog-preview-inner">
          <p className="sec-eye">Faith Journal</p>
          <h2 className="sec-title">Articles to Grow<br /><span style={{ color: '#C8762A' }}>Your Faith</span></h2>
          <p className="sec-sub">Real stories and biblical wisdom from a dad, husband, and truck driver still figuring it out — one day at a time.</p>
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
            <p style={{ textAlign: 'center', marginTop: '52px', color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
              Articles coming soon — check back shortly.
            </p>
          )}
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="dl-wrap" id="download">
        <h2 className="dl-title">Ready to Begin<br />Your Journey?</h2>
        <p className="dl-sub">Download FaithSpark free today.<br />Your faith companion is waiting.</p>
        <div className="dl-btns">
          <a href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724" className="store-btn apple">
            <span className="sb-icon">🍎</span>
            <span className="sb-text">
              <span className="sb-sub">Download on the</span>
              <span className="sb-name">App Store</span>
            </span>
          </a>
          <span className="store-btn coming">
            <span className="sb-icon">🤖</span>
            <span className="sb-text">
              <span className="sb-sub">Coming Soon to</span>
              <span className="sb-name">Google Play</span>
            </span>
          </span>
          <span className="store-btn coming">
            <span className="sb-icon">💻</span>
            <span className="sb-text">
              <span className="sb-sub">Coming Soon to</span>
              <span className="sb-name">Desktop</span>
            </span>
          </span>
        </div>
      </section>

      <DarkFooter />
    </div>
  );
}
