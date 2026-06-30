import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download FaithSpark — Free Faith App for iPhone',
  description: 'Download FaithSpark free on the App Store. AI devotionals, community prayer, Bible reader, guided prayer sessions, Scripture Art, and your personal AI faith companion.',
  alternates: { canonical: 'https://faithspark.app/download' },
};

export default function DownloadPage() {
  return (
    <div className="dl-page">
      <div className="dl-flame" />
      <div className="dl-badge">🔥 Now Available</div>
      <h1>Download FaithSpark</h1>
      <p>The most personal faith app ever built. AI devotionals written just for you, community prayer board, Bible reader, guided prayer, Scripture Art, sleep stories, and more.</p>
      <div className="dl-buttons">
        <a
          href="https://apps.apple.com/us/app/faithspark-ai-daily-devotional/id6761655724"
          className="dl-btn dl-btn-apple"
        >
          📱 Download on the App Store
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.mindgardenpress.faithspark&pcampaignid=web_share" className="dl-btn dl-btn-google">
          🤖 Get it on Google Play
        </a>
      </div>
      <p className="dl-note">Free to download · No credit card required</p>
    </div>
  );
}
