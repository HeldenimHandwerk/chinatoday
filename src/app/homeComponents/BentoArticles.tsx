import Image from 'next/image'
import { fetchArticles } from '@/app/action'
import Link from 'next/link'
import { Article } from '../types/Article'
import ArticleText from '../utils/ArticleText'

const fetchHomeArticles = async (): Promise<Article[]> => {
  const articles = await fetchArticles(`filters[HeroBreaking][$eq]=true`)

  // Sort articles by 'updatedAt' descending
  articles.sort(
    (a: Article, b: Article) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
  )

  // Identify the old and new headlines
  const headlineArticles = articles.filter(
    (article: { attributes: { Headline: any } }) => article.attributes.Headline
  )

  // If there's more than one headline, update the older one
  if (headlineArticles.length > 1) {
    await updateHeadlineStatus(headlineArticles[1].id) // Remove headline status from the old headline
    headlineArticles[1].attributes.Headline = false // Update local state
  }

  // Re-sort to ensure the headline is first
  articles.sort(
    (a: Article, b: Article) =>
      Number(b.attributes.Headline) - Number(a.attributes.Headline)
  )

  // Remove the oldest non-headline article if count exceeds 5
  if (articles.length > 6) {
    // Find the oldest non-headline article
    const oldestNonHeadlineIndex = articles
      .slice()
      .reverse()
      .findIndex(
        (article: { attributes: { Headline: any } }) =>
          !article.attributes.Headline
      )
    const actualIndex =
      oldestNonHeadlineIndex >= 0
        ? articles.length - 1 - oldestNonHeadlineIndex
        : -1
    if (actualIndex !== -1) {
      await updateHeroBreakingStatus(articles[actualIndex].id)
      articles.splice(actualIndex, 1)
    }
  }

  return articles.slice(0, 6) // Return top 5 articles
}

// Update the headline status
const updateHeadlineStatus = async (articleId: number) => {
  const updatedData = { data: { Headline: false } }
  await updateArticle(articleId, updatedData)
}

// Update the HeroBreaking status
const updateHeroBreakingStatus = async (articleId: number) => {
  const updatedData = { data: { HeroBreaking: false, CategoryBreaking: true } }
  await updateArticle(articleId, updatedData)
}

// General function to update an article
const updateArticle = async (articleId: number, updatedData: object) => {
  const response = await fetch(
    `https://jellyfish-app-qw7fr.ondigitalocean.app/api/articles/${articleId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
      },
      body: JSON.stringify(updatedData)
    }
  )

  if (!response.ok) {
    // You might want to log more details here
    console.error('Failed to update article', response.statusText)
    throw new Error(`Error: ${response.status}`)
  }
}

export default async function BentoArticles() {
  const articles = await fetchHomeArticles()

  return (
    <div className="container mx-auto my-5">
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Link
            href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
            key={article.id}
            className={`group relative overflow-hidden rounded-lg shadow-lg ${
              index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
            }`}
            style={{
              minHeight: index === 0 ? '400px' : '230px'
            }}
          >
            <div className="absolute inset-0 w-full  overflow-hidden transition-all duration-500 group-hover:scale-105 ">
              <Image
                src={article.attributes.image?.data?.attributes?.url}
                alt={article.attributes.title}
                width={article.attributes.image?.data?.attributes?.width}
                height={article.attributes.image?.data?.attributes?.height}
                className="h-full w-full object-cover opacity-90 transition-all duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
              <h1
                className={`text-xl ${
                  index === 0 ? 'sm:text-2xl' : 'sm:text-md'
                } mb-2 font-bold leading-tight text-white transition-colors duration-300 hover:text-red-500`}
              >
                {article.attributes.title}
              </h1>
              <ArticleText
                text={article.attributes.text}
                className="truncate text-base leading-relaxed text-white sm:text-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
