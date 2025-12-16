import type { Metadata } from 'next';
import { NewsCard } from '@/components/NewsCard';
import { Section } from '@/components/Section';
import { getNewsPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'News',
  description: 'Updates from The Plonkys: gigs, releases, and stories from Shetland.',
};

export default function NewsPage() {
  const posts = getNewsPosts();
  return (
    <Section title="News" eyebrow="Dispatches" className="pt-16">
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
