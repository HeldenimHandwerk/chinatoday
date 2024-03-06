// ArticleComponent.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article as ArticleType } from '@/app/types/Article'
import formatDate from '@/app/utils/formatDate'
import sanitizeHtml from 'sanitize-html'
const updateOldestArticle = async (oldestArticle: ArticleType) => {
  // Make an API request to update the 'Breaking' status of the oldest article.
  const response = await fetch(
    `https://chinatoday-strapi-cusbi.ondigitalocean.app/api/articles/${oldestArticle.id}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        cache: 'no-store',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
      },
      next: { revalidate: 1 },

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

export default async function CategoryArticlesLayout({
  articles
}: {
  articles: ArticleType[]
}) {
  // Sort articles by 'updatedAt' descending
  articles.sort(
    (a: ArticleType, b: ArticleType) =>
      new Date(b.attributes.dateOfPublish).getTime() -
      new Date(a.attributes.dateOfPublish).getTime()
  )

  const featureArticles = articles.filter(
    (article: ArticleType) => article.attributes.CategoryBreaking === true
  )

  if (featureArticles.length > 6) {
    // Find the oldest article without modifying the original order
    const oldestArticle = featureArticles[featureArticles.length - 1]
    await updateOldestArticle(oldestArticle) // Assuming this correctly updates the article's status
    //set it locally to false
    oldestArticle.attributes.CategoryBreaking = false
    featureArticles.slice(0, 6)
  }

  return (
    <div className="flex h-full flex-col justify-between gap-4 px-4 py-4 md:flex-row md:overflow-hidden md:px-10">
      {/* Mobile view */}
      <div className="flex w-full flex-col gap-4 overflow-auto md:hidden">
        {/* Render highlighted articles first */}

        {/* Then render the rest of the articles */}
        {featureArticles.map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ minHeight: '40vh' }}
            imageStyle={{ objectPosition: 'center' }}
            isHighlighted={false}
            key={`rest-${index}`}
          />
        ))}
      </div>

      {/* Desktop view: Original three columns */}
      {/* First Column */}
      <div className="hidden w-1/4 flex-col gap-4 md:flex">
        {featureArticles.slice(0, 2).map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ height: '50%' }}
            imageStyle={{ objectPosition: 'top' }}
            key={index}
          />
        ))}
      </div>
      {/* Second Column */}
      <div className="hidden w-1/2 flex-col gap-4 md:flex">
        <ArticleComponent
          article={featureArticles[2]}
          style={{ height: '60%' }}
          imageStyle={{ objectPosition: 'center' }}
          isHighlighted={true}
        />
        {featureArticles.length > 3 && (
          <ArticleComponent
            article={featureArticles[3]}
            style={{ height: '40%' }}
            imageStyle={{ objectPosition: 'top' }}
            isHighlighted={true}
          />
        )}
      </div>
      {/* Third Column */}
      <div className="hidden w-1/4 flex-col gap-4 md:flex">
        {featureArticles.slice(4).map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ height: '50%' }}
            imageStyle={{ objectPosition: 'top' }}
            key={index + 4}
          />
        ))}
      </div>
    </div>
  )
}

interface ArticleComponentProps {
  article: ArticleType
  style: React.CSSProperties
  imageStyle: React.CSSProperties
  isHighlighted?: boolean
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  style,
  imageStyle,
  isHighlighted
}) => (
  <main
    className={'relative h-full overflow-hidden rounded-lg shadow-lg'}
    style={style}
  >
    <Link
      title={article?.attributes.title + ' - China Today'}
      href={`/kategorien/${article?.attributes.collection.data.attributes.slug}/${article?.attributes.slug}`}
    >
      <div className="block h-full">
        <div
          className={` w-full ${isHighlighted ? 'h-full ' : 'relative h-48'}`}
        >
          <Image
            src={article?.attributes?.image?.data?.attributes.url}
            alt={
              article.attributes.image?.data?.attributes?.alternativeText ||
              article.attributes.title
            }
            fill
            className="h-full object-cover  transition-all duration-500 hover:scale-105"
            style={imageStyle}
          />
          {isHighlighted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
              <h1 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-red-400 lg:text-3xl">
                {article?.attributes.title}
              </h1>

              {/* <div
                className=" mb-4 text-lg text-white"
                dangerouslySetInnerHTML={{
                  __html: article.attributes.text.slice(0, 50) + '...'
                }}
              /> */}

              <div className="text-xs text-white sm:text-sm md:text-base">
                gepostet: {formatDate(article?.attributes.dateOfPublish)}
              </div>
            </div>
          )}
        </div>
        {/* Text Section for Non-Highlighted Article */}
        {!isHighlighted && (
          <div className="flex h-48 flex-col justify-between bg-white p-2">
            {' '}
            {/* Allocate remaining space for text */}
            <h2
              className={`p-2 font-bold text-black ${
                article?.attributes.title.length > 150
                  ? 'sm:text-base md:text-sm'
                  : 'xl:text-lg'
              }`}
            >
              {article?.attributes.title}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: truncateHtml(article.attributes.text, 50)
              }}
              className=" leading-relaxed text-gray-600  sm:text-base"
            />
            <span className="mt-1 text-xs text-gray-500">
              Gepostet: {formatDate(article?.attributes.dateOfPublish)}
            </span>
          </div>
        )}
      </div>
    </Link>
  </main>
)
