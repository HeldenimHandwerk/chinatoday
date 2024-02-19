import { MetadataRoute } from 'next'
import { Article } from '@/app/types/Article'
import { fetchArticles } from '@/app/action'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchArticles('')
  const fetchCategories = await fetch(
    `https://chinatoday-strapi-cusbi.ondigitalocean.app/api/collections`,
    {
      headers: {
        cache: 'force-cache',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
      }
    }
  )
  const { data: categories } = await fetchCategories.json()
  // Dynamic paths from articles
  const dynamicArticlesPaths: MetadataRoute.Sitemap = articles.map(
    (article: Article) => ({
      url: `https://www.china-today.de/kategorien/${article.attributes?.collection?.data?.attributes?.slug}/${article?.attributes?.slug}`,
      lastModified: new Date(article?.attributes?.updatedAt).toISOString(),
      changeFrequency: 'daily', // Specified as a literal type
      priority: 0.7
    })
  )

  // Dynamic paths from categories
  const dynamicCategoriesPaths: MetadataRoute.Sitemap = categories.map(
    (category: Article) => ({
      url: `https://www.china-today.de/kategorien/${category.attributes.slug}`,
      lastModified: new Date(category.attributes.updatedAt).toISOString(),
      changeFrequency: 'daily', // Specified as a literal type
      priority: 0.7
    })
  )

  // Static paths
  return [
    {
      url: `https://www.china-today.de`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily', // Specified as a literal type
      priority: 0.7
    },
    {
      url: `https://www.china-today.de/search`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily', // Specified as a literal type
      priority: 0.7
    },
    {
      url: `https://www.china-today.de/datenschutz`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily', // Specified as a literal type
      priority: 0.7
    },

    ...dynamicCategoriesPaths,
    ...dynamicArticlesPaths
  ]
}
