import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Gig, NewsFrontMatter, BandContent } from './types';

const contentDir = path.join(process.cwd(), 'content');

export function getGigs(): Gig[] {
  const gigsPath = path.join(contentDir, 'gigs.json');
  const file = fs.readFileSync(gigsPath, 'utf-8');
  const gigs: Gig[] = JSON.parse(file);
  return gigs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getBand(): BandContent {
  const bandPath = path.join(contentDir, 'band.json');
  const file = fs.readFileSync(bandPath, 'utf-8');
  return JSON.parse(file) as BandContent;
}

export interface NewsPostMeta extends NewsFrontMatter {
  slug: string;
  readingTime: string;
}

export interface NewsPost extends NewsPostMeta {
  content: string;
}

export function getNewsPosts(): NewsPostMeta[] {
  const dir = path.join(contentDir, 'news');
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as NewsFrontMatter;
    return {
      ...frontmatter,
      slug,
      readingTime: readingTime(content).text,
    } satisfies NewsPostMeta;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsPost(slug: string): NewsPost {
  const filePath = path.join(contentDir, 'news', `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as NewsFrontMatter;
  return {
    ...frontmatter,
    slug,
    content,
    readingTime: readingTime(content).text,
  };
}
