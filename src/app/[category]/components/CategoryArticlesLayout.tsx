// ArticleComponent.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article as ArticleType } from '../../types/Article'
import formatDate from '@/app/utils/formatDate'
import ArticleText from '@/app/utils/ArticleText'
const updateOldestArticle = async (oldestArticle: ArticleType) => {
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
    // Assuming the last one in filteredArticles is the oldest
    const oldestArticle = featureArticles.reverse()[0]
    await updateOldestArticle(oldestArticle) // Now awaited
    featureArticles.pop()
  }

  // Extract the highlighted articles (3rd and 4th if they exist)
  const highlightedArticles = featureArticles.slice(2, 4)

  // Prepare the rest of the articles for mobile view
  const restOfTheArticles = [
    ...featureArticles.slice(0, 2), // First two articles
    ...featureArticles.slice(4) // Articles after the 4th
  ]

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
        {articles.length > 3 && (
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
    className={'relative overflow-hidden rounded-lg shadow-lg '}
    style={style}
  >
    <Link
      href={`/${article?.attributes.collection.data.attributes.slug}/${article?.attributes.slug}`}
    >
      <div className="block h-full">
        <div
          className={` w-full ${isHighlighted ? 'h-full ' : 'relative h-48'}`}
        >
          <Image
            src={article?.attributes?.image?.data?.attributes.url}
            alt={article?.attributes.title}
            fill
            className="object-cover object-center transition-all duration-500 hover:scale-105"
          />
          {isHighlighted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
              <h1 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-red-500">
                {article?.attributes.title}
              </h1>
              <ArticleText
                text={article?.attributes.text}
                className="mb-4 truncate text-lg text-white"
              />

              <div className="text-xs text-white">
                Updated: {formatDate(article?.attributes.updatedAt)}
              </div>
            </div>
          )}
        </div>
        {!isHighlighted && (
          <div className="p-4">
            <h1 className="mb-2 line-clamp-2 text-lg font-bold text-black transition-colors duration-300 hover:text-red-500">
              {article?.attributes.title}
            </h1>
            <ArticleText
              text={article?.attributes.text}
              className="text-md mb-4 truncate text-gray-600"
            />

            <div className="text-xs text-gray-500">
              Updated: {formatDate(article?.attributes.updatedAt)}
            </div>
          </div>
        )}
      </div>
    </Link>
  </div>
)
