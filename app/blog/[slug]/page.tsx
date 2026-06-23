import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';
import BlogCard from '@/components/BlogCard';
import { getAllPosts, getPost } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://faithspark.app/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://faithspark.app/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image || undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Joey',
      description: 'Father of 6, truck driver, Assembly of God believer, and creator of FaithSpark.',
      url: 'https://faithspark.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FaithSpark',
      url: 'https://faithspark.app',
    },
    mainEntityOfPage: `https://faithspark.app/blog/${post.slug}`,
  };

  const faqJsonLd = post.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <div className="blog-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <DarkNav />

      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt={post.imageAlt} className="blog-hero-img" />
      ) : (
        <div className="blog-hero-placeholder">✝️</div>
      )}

      <div className="blog-article-wrap">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{post.title}</span>
        </nav>

        {post.tags?.length > 0 && (
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}

        <h1 className="blog-article-title">{post.title}</h1>

        <div className="blog-article-meta">
          <span>📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>⏱ {post.readingTime}</span>
          <span>✍️ Joey</span>
        </div>

        <article
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Author bio */}
        <div style={{ marginTop: '48px', padding: '28px 32px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/jands.webp"
            alt="Joey — founder of FaithSpark"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(200,118,42,0.6)' }}
          />
          <div>
            <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '17px', color: '#ffffff', marginBottom: '4px', fontWeight: 700 }}>Joey</p>
            <p style={{ fontSize: '13px', color: '#C8762A', marginBottom: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Truck Driver · Dad of 6 · Founder of FaithSpark</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: 0 }}>
              Joey grew up with an alcoholic father and found his way to faith through his grandmother&apos;s church as a teenager. After years on the road, a hard season in his 20s, and a life rebuilt around God, family, and Scripture, he created FaithSpark — a daily devotional app built for real people in real life. He lives in Texas with his wife Stephanie and their six kids.
            </p>
          </div>
        </div>

        {/* Internal links / related posts */}
        {related.length > 0 && (
          <div className="blog-related">
            <h2 className="blog-related-title">You Might Also Like</h2>
            <div className="blog-related-grid">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}

        {post.faqs?.length > 0 && (
          <div className="faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {post.faqs.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-question">{faq.question}</summary>
                  <p className="faq-answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Link href="/blog" className="btn-gold">← Back to All Articles</Link>
        </div>

        <div style={{ marginTop: '60px', padding: '32px', background: 'rgba(200,118,42,0.08)', border: '1px solid rgba(200,118,42,0.25)', borderRadius: '20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '18px', color: '#ffffff', marginBottom: '12px' }}>Want a Faith Companion in Your Pocket?</p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7' }}>
            FaithSpark gives you daily devotionals, guided prayer, a full Bible reader, and Spark — your personal AI faith companion. All free.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://apps.apple.com/app/faithspark-ai-daily-devotional/id6761655724"
              className="btn-gold"
            >
              🍎 Download FaithSpark — Free
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share"
              className="btn-gold"
            >
              🤖 Get it on Google Play
            </a>
          </div>
        </div>

      </div>

      <DarkFooter />
    </div>
  );
}
