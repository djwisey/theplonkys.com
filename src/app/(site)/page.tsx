import Link from 'next/link';
import { Section } from '@/components/Section';
import { CTASection } from '@/components/CTASection';
import { NewsCard } from '@/components/NewsCard';
import { GigCard } from '@/components/GigCard';
import { getBand, getGigs, getNewsPosts } from '@/lib/content';
import { SocialLinks } from '@/components/SocialLinks';

export default function HomePage() {
  const gigs = getGigs();
  const news = getNewsPosts();
  const band = getBand();
  const upcoming = gigs.filter((g) => g.status === 'upcoming').slice(0, 3);
  const latestNews = news.slice(0, 2);

  return (
    <div className="space-y-12">
      <Section className="pt-20 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.25em] text-seaglass">Shetland folk / indie</p>
            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">The Plonkys</h1>
            <p className="text-lg text-slate-200 max-w-2xl">
              Tidal melodies, windswept strings, and songs crafted on the edge of the North Sea.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/gigs"
                className="rounded-full bg-seaglass px-6 py-3 text-sm font-semibold text-ocean shadow-lg shadow-seaglass/30 hover:bg-amber"
              >
                See upcoming gigs
              </Link>
              <Link
                href="/music"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:border-seaglass hover:text-seaglass"
              >
                Listen
              </Link>
            </div>
            <div className="text-slate-300">
              <SocialLinks socials={band.socials} />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ocean-gradient p-8 shadow-2xl shadow-black/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(58,166,161,0.15),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(247,178,103,0.15),transparent_40%)]" />
            <div className="relative space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Featured media</p>
              <div className="grid gap-4">
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Spotify</p>
                  <div className="mt-2 aspect-video rounded-lg bg-black/40" />
                  <Link href={band.embeds.spotify} className="mt-2 inline-block text-seaglass hover:text-amber text-sm">
                    Open playlist →
                  </Link>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">YouTube</p>
                  <div className="mt-2 aspect-video rounded-lg bg-black/40" />
                  <Link href={band.embeds.youtube} className="mt-2 inline-block text-seaglass hover:text-amber text-sm">
                    Watch video →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Latest" eyebrow="Stay in the loop">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">Upcoming gigs</h3>
              <Link href="/gigs" className="text-sm text-seaglass hover:text-amber">
                View all
              </Link>
            </div>
            <div className="grid gap-4">
              {upcoming.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
              {upcoming.length === 0 && <p className="text-slate-300">More dates arriving soon.</p>}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">News</h3>
              <Link href="/news" className="text-sm text-seaglass hover:text-amber">
                View all
              </Link>
            </div>
            <div className="grid gap-4">
              {latestNews.map((post) => (
                <NewsCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Who we are" eyebrow="The band">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-slate-200">
            <p>{band.bio}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {band.members.map((member) => (
                <div key={member.name} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-sm text-seaglass">{member.role}</p>
                  <p className="font-display text-xl text-white">{member.name}</p>
                  <p className="text-slate-300 mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
          <CTASection
            title="Book The Plonkys"
            description="Ready for a harbour-side session, a festival stage, or an intimate listening room?"
            primary={{ label: 'Contact for booking', href: '/contact' }}
            secondary={{ label: 'See the EPK', href: '/about#epk' }}
          />
        </div>
      </Section>
    </div>
  );
}
