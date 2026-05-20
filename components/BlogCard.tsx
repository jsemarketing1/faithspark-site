import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card-dark">
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt={post.title} className="blog-card-img" />
      ) : (
        <div className="blog-card-img-placeholder">✝️</div>
      )}
      <div className="blog-card-body">
        {post.tags?.[0] && <span className="blog-card-tag">{post.tags[0]}</span>}
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-desc">{post.description}</p>
        <div className="blog-card-meta">
          <span>📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>⏱ {post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
