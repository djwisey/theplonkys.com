import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach The Plonkys for booking, press, or general messages.',
};

async function submitContact(formData: FormData) {
  'use server';
  const honeypot = formData.get('website');
  if (honeypot) return;
  // Placeholder for email service integration.
  console.log('Contact submission', Object.fromEntries(formData));
  revalidatePath('/contact');
}

export default function ContactPage() {
  return (
    <Section title="Contact" eyebrow="Say hello" className="pt-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <form action={submitContact} className="space-y-4 rounded-xl border border-white/5 bg-white/5 p-6 shadow-lg">
          <div>
            <label className="block text-sm text-slate-300">Name</label>
            <input
              required
              name="name"
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-seaglass focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Email</label>
            <input
              required
              type="email"
              name="email"
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-seaglass focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Message</label>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-seaglass focus:outline-none"
            ></textarea>
          </div>
          <div className="hidden">
            <label htmlFor="website">Do not fill</label>
            <input id="website" name="website" />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-seaglass px-5 py-3 text-sm font-semibold text-ocean hover:bg-amber focus:outline-none"
          >
            Send message
          </button>
          <p className="text-xs text-slate-400">No spam. We reply within 2-3 days.</p>
        </form>
        <div className="space-y-4 text-slate-200">
          <p>For bookings, press, or collaborations, reach out and we will respond promptly.</p>
          <div className="space-y-2">
            <p>
              Booking: <a className="text-seaglass" href="mailto:booking@theplonkys.com">booking@theplonkys.com</a>
            </p>
            <p>
              Press: <a className="text-seaglass" href="mailto:press@theplonkys.com">press@theplonkys.com</a>
            </p>
            <p>Based in Shetland · Available for travel.</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <h4 className="font-display text-xl text-white">Booking notes</h4>
            <ul className="mt-2 space-y-1 text-slate-200">
              <li>• PA available upon request.</li>
              <li>• Flexible sets: duo to full band.</li>
              <li>• Travel-friendly schedule from Shetland hubs.</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
