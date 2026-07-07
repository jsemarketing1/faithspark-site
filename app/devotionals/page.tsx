import type { Metadata } from 'next';
import DarkNav from '@/components/DarkNav';
import DarkFooter from '@/components/DarkFooter';
import DevotionalDisplay from '@/components/DevotionalDisplay';
import { getTodaysDevotional } from '@/lib/devotionals';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const devotional = await getTodaysDevotional();
  const title = devotional?.title ?? "Today's Devotional";
  const description = devotional
    ? `${devotional.title} — ${devotional.scripture}. A free daily Scripture devotional from FaithSpark.`
    : 'A free daily Scripture devotional from FaithSpark.';

  return {
    title,
    description,
    alternates: { canonical: 'https://faithspark.app/devotionals/' },
    openGraph: {
      title: `${title} | FaithSpark`,
      description,
      url: 'https://faithspark.app/devotionals/',
      type: 'article',
    },
  };
}

export default async function DevotionalsPage() {
  const devotional = await getTodaysDevotional();

  const jsonLd = devotional ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: devotional.title,
    description: devotional.content.slice(0, 200),
    datePublished: new Date().toISOString().slice(0, 10),
    author: { '@type': 'Organization', name: 'FaithSpark', url: 'https://faithspark.app' },
    publisher: { '@type': 'Organization', name: 'FaithSpark', url: 'https://faithspark.app' },
    mainEntityOfPage: 'https://faithspark.app/devotionals',
  } : null;

  return (
    <div className="blog-wrap">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <DarkNav />
      <DevotionalDisplay devotional={devotional} />
      <DarkFooter />
    </div>
  );
}