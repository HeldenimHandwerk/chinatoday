import { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/adminhih', '/datenschutz', '/impressum'],
        allow: '/'
      }
    ],
    sitemap: `https://china-today.de/sitemap.xml`
  }
}
