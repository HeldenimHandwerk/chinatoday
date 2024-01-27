import Image from 'next/image'
import Link from 'next/link'
import { fetchCollectionArticles } from '@/app/action'
import { Article } from '../types/Article'
import ArticleText from '../utils/ArticleText'

async function fetchArticles(collection: string) {
  let articles = await fetchCollectionArticles(collection)

  articles.sort(
    (a: Article, b: Article) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
  )

  var filteredArticles = articles.filter(
    (article: Article) => article.attributes.CategoryBreaking === true
  )
  // Check the length after filtering
  if (filteredArticles.length > 6) {
    // Assuming the last one in filteredArticles is the oldest
    const oldestArticle = filteredArticles.reverse()[0]
    await updateOldestArticle(oldestArticle) // Now awaited
    filteredArticles.pop() // Remove the oldest article from the array
  }

  return filteredArticles.slice(0, 4) // Return up to 4 articles
}

const updateOldestArticle = async (oldestArticle: Article) => {
  // Make an API request to update the 'Breaking' status of the oldest article.
  const response = await fetch(
    `https://jellyfish-app-qw7fr.ondigitalocean.app/api/articles/${oldestArticle.id}`,
    {
      method: 'PUT',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({
        data: { CategoryBreaking: false }
      })
    }
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
}

export default async function CategoryFeatures({
  collection
}: {
  collection: string
}) {
  const articles = await fetchArticles(collection)

  return (
    <div className="corner-border container mx-auto mb-8 rounded-lg bg-gray-100 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between bg-red-200 p-4 text-red-800  shadow">
        <span className="text-xl font-bold uppercase">{collection}</span>
        <Link
          href={`/${collection.toLowerCase()}`}
          className="bg-red-600 px-4 py-2 text-white shadow transition duration-300 ease-in-out  hover:bg-red-700"
        >
          Mehr Lesen
        </Link>
      </div>
      {/* Large Image with Text Overlay */}
      {articles.length > 0 && (
        <Link
          href={`/${articles[0].attributes.collection.data.attributes.slug}/${articles[0].attributes.slug}`}
        >
          <div className="relative mb-8 h-[500px] w-full rounded-lg shadow-lg">
            {/* Enhanced shadow */}
            <div className="absolute inset-0 w-full  overflow-hidden opacity-100 transition-all duration-500 group-hover:scale-105">
              <Image
                src={articles[0].attributes.image?.data?.attributes?.url}
                alt={articles[0].attributes.title}
                fill
                className="object-cover object-center opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black via-black/80 to-transparent p-4 ">
              <h2 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-red-500">
                {articles[0].attributes.title}
              </h2>
              <p className="truncate-3-lines text-white">
                {articles[0].attributes.text}
              </p>
            </div>
          </div>
        </Link>
      )}
      {/* Grid of Smaller Images */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {articles.slice(1, 4).map((article: Article, index: number) => (
          <Link
            href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
            key={index}
            className="flex transform flex-col overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:scale-105"
          >
            <div className="relative h-64 w-full">
              <Image
                src={article.attributes.image?.data?.attributes?.url}
                alt={article.attributes.title}
                width={article.attributes.image?.data?.attributes?.width}
                height={article.attributes.image?.data?.attributes?.height}
                className="h-full w-full object-cover "
              />
            </div>
            <div className="flex flex-grow flex-col justify-between p-4">
              <h1 className="mb-2 text-2xl font-bold leading-tight text-black transition-colors duration-300 hover:text-red-500 sm:text-lg">
                {article.attributes.title}
              </h1>
              <ArticleText
                text={article.attributes.text}
                className="truncate-3-lines text-base leading-relaxed text-gray-600 shadow-sm sm:text-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
