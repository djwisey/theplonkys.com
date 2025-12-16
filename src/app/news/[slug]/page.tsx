import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Section } from '@/components/Section';
import { getNewsPost, getNewsPosts } from '@/lib/content';
import { formatDateDisplay } from '@/lib/utils';

export async function generateStaticParams() {
  return getNewsPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getNewsPosts().find((p) => p.slug === params.slug);
  if (!post) return { title: 'News' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = getNewsPost(params.slug);
  if (!post) return notFound();

  return (
    <Section className="pt-16">
      <article className="prose prose-invert max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-seaglass">{formatDateDisplay(post.date)}</p>
        <h1 className="font-display text-4xl text-white">{post.title}</h1>
        <p className="text-slate-400">{post.readingTime} • Share: <a className="text-seaglass" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://theplonkys.com/news/${post.slug}`}>Twitter</a> · <a className="text-seaglass" href={`https://www.facebook.com/sharer/sharer.php?u=https://theplonkys.com/news/${post.slug}`}>Facebook</a></p>
        <MDXRemote source={post.content} components={{}} />
      </article>
    </Section>
  );
}
