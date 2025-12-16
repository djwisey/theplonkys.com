import Link from 'next/link';
import { SocialLinks } from './SocialLinks';
import { getBand } from '@/lib/content';

export function Footer() {
  const band = getBand();
  return (
    <footer className="border-t border-white/5 bg-[#0a1624] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl text-white">The Plonkys</p>
          <p className="mt-3 text-slate-300 max-w-xl">
            Coastal folk/indie from Shetland. Stories, tides, and strings in motion.
          </p>
          <div className="mt-4">
            <SocialLinks socials={band.socials} />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-seaglass">Explore</h3>
          <div className="mt-4 flex flex-col gap-2 text-slate-200">
            <Link href="/gigs" className="hover:text-seaglass">
              Gigs
            </Link>
            <Link href="/music" className="hover:text-seaglass">
              Music
            </Link>
            <Link href="/news" className="hover:text-seaglass">
              News
            </Link>
            <Link href="/media" className="hover:text-seaglass">
              Media
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-seaglass">Newsletter</h3>
          <p className="mt-3 text-slate-300">Sign up to hear about gigs, releases, and island dispatches.</p>
          <form className="mt-4 flex flex-col gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-seaglass focus:outline-none"
            />
            <button
              type="button"
              className="rounded-md bg-seaglass px-4 py-2 text-sm font-semibold text-ocean hover:bg-amber focus:outline-none"
            >
              Join the list
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-white/5 pt-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} The Plonkys. Crafted for the North Atlantic nights.
      </div>
    </footer>
  );
}
