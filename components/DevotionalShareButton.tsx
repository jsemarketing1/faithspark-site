'use client';

import type { DevotionalEntry } from '@/lib/devotionals';

type Props = { devotional: DevotionalEntry };

export default function DevotionalShareButton({ devotional }: Props) {
  const shareText = [
    devotional.title,
    '',
    `"${devotional.verse}"`,
    `— ${devotional.scripture}`,
    '',
    devotional.content,
    devotional.prayer ? `\nPrayer: ${devotional.prayer}` : '',
  ].filter(Boolean).join('\n');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: devotional.title, text: shareText });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard!');
    } catch {
      /* ignore */
    }
  };

  return (
    <button type="button" className="devotional-share-btn" onClick={handleShare} aria-label="Share devotional">
      Share
    </button>
  );
}