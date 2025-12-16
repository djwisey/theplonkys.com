import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Gallery } from '@/components/Gallery';
import { getBand } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Media',
  description: 'Photos, videos, and press quotes from The Plonkys.',
};

export default function MediaPage() {
  const band = getBand();
  return (
    <div className="space-y-12">
      <Section title="Media" eyebrow="Gallery" className="pt-16">
        <Gallery images={band.gallery} />
      </Section>

      <Section title="Video" eyebrow="Watch">
        <div className="grid gap-6 md:grid-cols-2">
          {band.videos.map((video) => (
            <div key={video.url} className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-sm text-slate-300">{video.title}</p>
              <div className="mt-2 aspect-video rounded-lg bg-black/40" />
              <a href={video.url} className="mt-2 inline-block text-seaglass hover:text-amber" target="_blank" rel="noreferrer">
                Watch on YouTube →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Press quotes" eyebrow="What they say">
        <div className="grid gap-4 md:grid-cols-3">
          {band.quotes.map((quote, idx) => (
            <div key={idx} className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-slate-200">“{quote.quote}”</p>
              <p className="mt-2 text-sm text-seaglass">— {quote.source}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
