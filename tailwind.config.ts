import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C8762A',
        'gold-light': '#E8943A',
        dark: '#0d0800',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
