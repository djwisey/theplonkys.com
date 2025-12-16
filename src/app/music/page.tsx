import Link from 'next/link';
import { Section } from '@/components/Section';
import { getBand } from '@/lib/content';
import type { Metadata } from 'next';

const releases = [
  {
    title: 'Salt & Strings',
    description: 'An EP of windswept folk textures with modern edges.',
    cover: '/placeholder-cover-1.png',
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com' },
      { label: 'Apple Music', url: 'https://music.apple.com' },
    ],
  },
  {
    title: 'Harbour Lights (Live)',
    description: 'Live session captured on a long midsummer night.',
    cover: '/placeholder-cover-2.png',
    links: [
      { label: 'Bandcamp', url: 'https://bandcamp.com' },
      { label: 'YouTube', url: 'https://youtube.com' },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Music',
  description: 'Listen to The Plonkys and explore recent releases.',
};

export default function MusicPage() {
  const band = getBand();
  return (
    <div className="space-y-12">
      <Section title="Music" eyebrow="Listen" className="pt-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stream</h3>
            <div className="grid gap-4">
              <MediaEmbed title="Spotify" url={band.embeds.spotify} />
              <MediaEmbed title="Apple Music" url={band.embeds.appleMusic || 'https://music.apple.com'} />
              <MediaEmbed title="YouTube" url={band.embeds.youtube} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Releases</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {releases.map((release) => (
                <div key={release.title} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-seaglass/30 to-amber/30" />
                  <h4 className="mt-3 font-display text-xl text-white">{release.title}</h4>
                  <p className="text-slate-200">{release.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    {release.links.map((link) => (
                      <Link key={link.url} href={link.url} className="rounded-full border border-white/10 px-3 py-1 text-white hover:border-seaglass">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Press downloads" eyebrow="Promo">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h4 className="font-display text-xl text-white">High-quality audio</h4>
            <p className="text-slate-300 mt-2">Request WAVs and stems by emailing our team.</p>
            <Link href="/contact" className="mt-3 inline-block text-seaglass hover:text-amber">
              Contact us →
            </Link>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h4 className="font-display text-xl text-white">Tech + rider</h4>
            <p className="text-slate-300 mt-2">Download the latest tech spec and stage plot.</p>
            <Link href="/about#epk" className="mt-3 inline-block text-seaglass hover:text-amber">
              View EPK →
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

function MediaEmbed({ title, url }: { title: string; url: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
      <p className="text-sm text-slate-300">{title}</p>
      <div className="mt-2 aspect-video rounded-lg bg-black/40" />
      <Link href={url} className="mt-2 inline-block text-seaglass hover:text-amber text-sm">
        Open in {title} →
      </Link>
    </div>
  );
}
