import type { Metadata } from 'next';
import { Cinzel, Lato, Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-cinzel', display: 'swap' });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-lato', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://faithspark.app'),
  title: {
    default: 'FaithSpark — Faith That Knows Your Name',
    template: '%s | FaithSpark',
  },
  description: 'The most personal faith app ever built. AI devotionals, community prayer, Bible reader, guided prayer sessions, Scripture Art, and your own AI faith companion Spark — all free.',
  openGraph: {
    type: 'website',
    siteName: 'FaithSpark',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${lato.variable} ${playfair.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
