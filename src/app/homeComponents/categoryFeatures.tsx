import Image from 'next/image'
import Link from 'next/link'
import { fetchCollectionArticles } from '@/app/action'
import { Article } from '../types/Article'
import sanitizeHtml from 'sanitize-html'

async function fetchArticles(collection: string) {
  let articles = await fetchCollectionArticles(collection)

  var filteredArticles = articles.filter(
    (article: Article) =>
      article.attributes.CategoryBreaking === true &&
      (article.attributes.Headline === false ||
        article.attributes.Headline === null) &&
      (article.attributes.HeroBreaking === false ||
        article.attributes.HeroBreaking === null)
  )

  return filteredArticles.slice(0, 4) // Return up to 4 articles
}

const updateOldestArticle = async (oldestArticle: Article) => {
  // Make an API request to update the 'Breaking' status of the oldest article.
  const response = await fetch(
    `https://chinatoday-strapi-cusbi.ondigitalocean.app/api/articles/${oldestArticle.id}`,
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

function truncateHtml(html: any, maxLength: number) {
  // First, remove HTML tags to get plain text
  const plainText = sanitizeHtml(html, {
    allowedTags: [], // No tags allowed, effectively converting HTML to plain text
    allowedAttributes: {} // No attributes allowed
  })

  // Then, truncate the plain text
  if (plainText.length <= maxLength) return html // Return original HTML if within maxLength
  const truncatedText = plainText.slice(0, maxLength) + '...'

  // Optionally, return the truncated text wrapped in a tag if needed
  return `<p>${truncatedText}</p>`
}
export default async function CategoryFeatures({
  collection
}: {
  collection: string
}) {
  const articles = await fetchArticles(collection)

  return (
    <section className="corner-border container mx-auto mb-8 rounded-lg bg-gray-100 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between bg-red-200 p-4 text-red-800  shadow">
        <span className="text-xl font-bold uppercase">
          {collection === 'mobilitaet' ? 'Mobalität' : collection}
        </span>
        <Link
          href={`/kategorien/${collection.toLowerCase()}`}
          className="bg-red-600 px-4 py-2 text-white shadow transition duration-300 ease-in-out  hover:bg-red-700"
        >
          Mehr Lesen
        </Link>
      </div>
      {/* Large Image with Text Overlay */}
      {articles.length > 0 && (
        <Link
          href={`/kategorien/${articles[0].attributes.collection.data.attributes.slug}/${articles[0].attributes.slug}`}
        >
          <div className="relative mb-8 h-[500px] w-full rounded-lg shadow-lg">
            {/* Enhanced shadow */}
            <div className="absolute inset-0 h-full w-full  overflow-hidden opacity-100 transition-all duration-500 group-hover:scale-105">
              <Image
                src={articles[0].attributes.image?.data?.attributes?.url}
                alt={
                  articles[0].attributes.image?.data?.attributes
                    ?.alternativeText || articles[0].attributes.title
                }
                fill
                className="h-full object-cover object-center opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black via-black/80 to-transparent p-4 ">
              <h2 className="mb-2 text-3xl font-bold text-white transition-colors duration-300 hover:text-red-400 sm:text-4xl">
                {articles[0].attributes.title}
              </h2>
            </div>
          </div>
        </Link>
      )}
      {/* Grid of Smaller Images */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {articles.slice(1, 4).map((article: Article, index: number) => (
          <Link
            href={`/kategorien/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
            key={index}
            className="flex transform flex-col overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:scale-105"
          >
            <div className="relative h-64 w-full">
              <Image
                src={article.attributes.image?.data?.attributes?.url}
                alt={
                  article.attributes.image?.data?.attributes?.alternativeText
                }
                width={article.attributes.image?.data?.attributes?.width}
                height={article.attributes.image?.data?.attributes?.height}
                className="h-full w-full object-cover "
              />
            </div>
            <div className="flex flex-grow flex-col justify-between p-4">
              <h2 className="mb-2 text-lg font-bold leading-tight text-black transition-colors duration-300 hover:text-red-400">
                {article.attributes.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: truncateHtml(article.attributes.text, 100)
                }}
                className="  text-base leading-relaxed text-gray-600  sm:text-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
