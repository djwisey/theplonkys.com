import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { CTASection } from '@/components/CTASection';
import { SocialLinks } from '@/components/SocialLinks';
import { getBand } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet The Plonkys from Shetland and explore the story behind the songs.',
};

export default function AboutPage() {
  const band = getBand();
  return (
    <div className="space-y-12">
      <Section title="About" eyebrow="Origin" className="pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4 text-slate-200">
            <p>
              The Plonkys weave coastal folk textures with indie energy, writing songs that carry the hush of sea mist and the spark of
              harbor lights. Based in Shetland, the band pairs fiddle, guitar, and rich harmonies with modern production touches.
            </p>
            <p>
              Whether in intimate listening rooms or festival stages, The Plonkys keep things warm, human, and alive. Every set feels like
              a conversation with friends beside the shore.
            </p>
            <SocialLinks socials={band.socials} />
          </div>
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-white">Band members</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {band.members.map((member) => (
                <div key={member.name} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-seaglass">{member.role}</p>
                      <p className="font-display text-xl text-white">{member.name}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-seaglass/40 to-amber/40" aria-hidden />
                  </div>
                  <p className="mt-2 text-slate-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="What we play" eyebrow="Sound">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h4 className="font-display text-xl text-white">Setlist themes</h4>
            <ul className="mt-3 space-y-2 text-slate-200">
              <li>• Original songs inspired by island light and North Atlantic weather.</li>
              <li>• Reimagined folk tunes with rhythmic drive and vocal harmony.</li>
              <li>• Atmospheric instrumentals built for dusk and dawn.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h4 className="font-display text-xl text-white">For booking</h4>
            <p className="mt-2 text-slate-300">Available for festivals, listening rooms, and coastal events.</p>
            <Link href="/contact" className="mt-3 inline-block text-seaglass hover:text-amber">
              Get in touch →
            </Link>
          </div>
        </div>
      </Section>

      <Section id="epk" title="EPK" eyebrow="Press kit">
        <div className="grid gap-6 md:grid-cols-3">
          <DownloadCard title="Press photos" href={band.epk.pressPhotos} />
          <DownloadCard title="Logo pack" href={band.epk.logo} />
          <DownloadCard title="Tech rider" href={band.epk.techRider} />
        </div>
        <CTASection
          className="mt-6"
          title="Need something specific?"
          description="Tell us about your coverage, show, or podcast. We'll get you the right assets."
          primary={{ label: 'Email the team', href: 'mailto:hello@theplonkys.com' }}
        />
      </Section>
    </div>
  );
}

function DownloadCard({ title, href }: { title: string; href: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-5">
      <h4 className="font-display text-xl text-white">{title}</h4>
      <p className="text-slate-300 mt-2">Download assets for press use.</p>
      <Link href={href} className="mt-3 inline-block text-seaglass hover:text-amber">
        Download →
      </Link>
    </div>
  );
}
