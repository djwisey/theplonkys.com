import { GigList } from '@/components/GigList';
import { Section } from '@/components/Section';
import { getGigs } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gigs',
  description: 'Upcoming and past shows for The Plonkys.',
};

export default function GigsPage() {
  const gigs = getGigs();
  return (
    <Section title="Gigs" eyebrow="Live" className="pt-16">
      <GigList gigs={gigs} />
    </Section>
  );
}
