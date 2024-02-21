import { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/admin', '/privacy'],
        allow: '/'
      }
    ],
    sitemap: `https://chinatoday.de/sitemap.xml`
  }
}
