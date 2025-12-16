import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        ocean: '#0b1b2b',
        seaglass: '#3aa6a1',
        amber: '#f7b267',
      },
      backgroundImage: {
        'grain-dark': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        'ocean-gradient': 'linear-gradient(135deg, rgba(10,22,38,0.95) 0%, rgba(12,28,48,0.9) 50%, rgba(6,18,30,0.95) 100%)',
      },
      boxShadow: {
        glow: '0 10px 50px rgba(58,166,161,0.2)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
