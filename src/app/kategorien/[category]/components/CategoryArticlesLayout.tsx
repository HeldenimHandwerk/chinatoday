// ArticleComponent.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article as ArticleType } from '@/app/types/Article'
import formatDate from '@/app/utils/formatDate'
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

export default async function CategoryArticlesLayout({
  articles
}: {
  articles: ArticleType[]
}) {
  // Sort articles by 'updatedAt' descending
  articles.sort(
    (a: ArticleType, b: ArticleType) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
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
            key={index}
          />
        ))}
      </div>
      {/* Second Column */}
      <div className="hidden w-1/2 flex-col gap-4 md:flex">
        <ArticleComponent
          article={featureArticles[2]}
          style={{ height: '60%' }}
          isHighlighted={true}
        />
        {featureArticles.length > 3 && (
          <ArticleComponent
            article={featureArticles[3]}
            style={{ height: '40%' }}
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
  isHighlighted?: boolean
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  style,
  isHighlighted
}) => (
  <div
    className={'relative h-full overflow-hidden rounded-lg shadow-lg'}
    style={style}
  >
    <Link
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
            className="object-cover object-center transition-all duration-500 hover:scale-105"
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
                gepostet: {formatDate(article?.attributes.updatedAt)}
              </div>
            </div>
          )}
        </div>
        {/* Text Section for Non-Highlighted Article */}
        {!isHighlighted && (
          <div className="flex h-48 flex-col justify-between bg-white p-2">
            {' '}
            {/* Allocate remaining space for text */}
            <h1 className="xl:text-md p-2  font-bold text-black sm:text-base md:text-sm  2xl:text-2xl ">
              {article?.attributes.title}
            </h1>
            <span className="mt-1 text-xs text-gray-500">
              Gepostet: {formatDate(article?.attributes.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </Link>
  </div>
)
