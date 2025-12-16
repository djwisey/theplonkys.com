import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

const baseUrl = 'https://theplonkys.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'The Plonkys | Shetland folk/indie',
    template: '%s | The Plonkys',
  },
  description:
    'Modern folk/indie band from Shetland. Listen, find upcoming gigs, and catch the latest news from The Plonkys.',
  openGraph: {
    title: 'The Plonkys',
    description: 'Modern folk/indie band from Shetland with sea-soaked soundscapes.',
    url: baseUrl,
    siteName: 'The Plonkys',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'The Plonkys logo over a Shetland-inspired gradient',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Plonkys',
    description: 'Modern folk/indie band from Shetland. New music and gig dates.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable} font-sans bg-ocean text-slate-100 min-h-screen gradient-sheen`}> 
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-seaglass focus:text-ocean"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
