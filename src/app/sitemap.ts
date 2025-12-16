import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://theplonkys.com';
  const routes = ['', '/gigs', '/music', '/news', '/media', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  return routes;
}
