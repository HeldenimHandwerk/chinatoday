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
  //filter out the category undefined
  const categoryData = categories.filter(
    (category: { attributes: { slug: string } }) =>
      category.attributes.slug !== 'uncategorized'
  )

  // Check if a date is valid
  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date))
  }

  // Dynamic paths from articles
  const dynamicArticlesPaths: MetadataRoute.Sitemap = articles.map(
    (article: Article) => ({
      url: `https://www.china-today.de/kategorien/${article.attributes?.collection?.data?.attributes?.slug}/${article?.attributes?.slug}`,
      lastModified: isValidDate(article?.attributes?.dateOfPublish)
        ? new Date(article?.attributes?.dateOfPublish).toISOString()
        : undefined,
      changeFrequency: 'daily', // Specified as a literal type
      priority: 0.7
    })
  )

  // Dynamic paths from categories
  const dynamicCategoriesPaths: MetadataRoute.Sitemap = categoryData.map(
    (category: Article) => ({
      url: `https://www.china-today.de/kategorien/${category.attributes.slug}`,
      lastModified: isValidDate(category.attributes.dateOfPublish)
        ? new Date(category.attributes.dateOfPublish).toISOString()
        : undefined,
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
      priority: 1.0
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
      priority: 0.2
    },

    ...dynamicCategoriesPaths,
    ...dynamicArticlesPaths
  ]
}
