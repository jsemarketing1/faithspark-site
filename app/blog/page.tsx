export const dynamic = 'force-static';

import type { Metadata } from 'next';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Faith Blog — Real Stories, Biblical Wisdom',
  description: 'A faith blog written from the heart — first-person stories about prayer, Scripture, family, and finding God in everyday life as a dad, husband, and truck driver.',
  alternates: { canonical: 'https://faithspark.app/blog' },
  openGraph: {
    title: 'FaithSpark Blog — Real Faith. Real Life.',
    description: 'First-person stories about prayer, Scripture, family, and trusting God from a dad, husband, and truck driver still figuring it out.',
    url: 'https://faithspark.app/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-index-wrap">
      <DarkNav />
      <div className="blog-index-hero">
        <p className="sec-eye">Faith Journal</p>
        <h1 className="sec-title">Real Faith.<br /><span style={{ color: '#C8762A' }}>Real Life.</span></h1>
        <p className="sec-sub">
          First-person stories about prayer, Scripture, family, and trusting God —
          written by a dad, husband, and truck driver who is still figuring it out one day at a time.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="blog-index-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <p>Articles coming soon — check back shortly.</p>
        </div>
      )}

      <DarkFooter />
    </div>
  );
}
