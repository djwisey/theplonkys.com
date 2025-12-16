import Link from 'next/link';
import { NewsPostMeta } from '@/lib/content';
import { formatDateDisplay } from '@/lib/utils';

export function NewsCard({ post }: { post: NewsPostMeta }) {
  return (
    <article className="rounded-xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-black/10">
      <p className="text-sm text-seaglass uppercase tracking-[0.15em]">{formatDateDisplay(post.date)}</p>
      <h3 className="mt-2 font-display text-2xl text-white">
        <Link href={`/news/${post.slug}`} className="hover:text-amber">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-slate-200">{post.excerpt}</p>
      <p className="mt-4 text-sm text-slate-400">{post.readingTime} read</p>
    </article>
  );
}
