import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://memasevich.ru/', lastModified: new Date('2026-08-30'), changeFrequency: 'monthly', priority: 1 }, { url: 'https://memasevich.ru/en', lastModified: new Date('2026-08-30'), changeFrequency: 'monthly', priority: .7 }];
}
