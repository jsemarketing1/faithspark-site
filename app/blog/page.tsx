import type { Metadata } from 'next';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';
import BlogCard from '@/components/BlogCard';
import OptinForm from '@/components/OptinForm';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Christian Devotionals Blog — Faith, Scripture & Prayer | FaithSpark',
  description: 'Faith-first devotionals on Scripture, prayer, and real life — written by Joey, creator of FaithSpark. Verse studies, Bible questions answered, and honest reflections from the road.',
  alternates: { canonical: 'https://faithspark.app/blog/' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-index-wrap">
      <DarkNav />
      <div className="blog-index-hero">
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 12, letterSpacing: '0.25em', color: '#C8762A', marginBottom: 16, textTransform: 'uppercase' }}>
          Faith &amp; Devotionals
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: '#1A2B1F', marginBottom: 16, lineHeight: 1.15 }}>
          The FaithSpark Blog
        </h1>
        <p style={{ color: '#6B7B6E', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          Personal devotionals, Psalm studies, prayer guides, and faith reflections — written from the road and the Word.
        </p>
      </div>

      <div className="optin-wrap" style={{ padding: '0 24px 32px' }}>
        <OptinForm />
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: '#6B7B6E' }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>✝️</p>
          <p style={{ fontSize: 16 }}>Articles coming soon.</p>
        </div>
      ) : (
        <div className="blog-index-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <DarkFooter showOptin={false} />
    </div>
  );
}
