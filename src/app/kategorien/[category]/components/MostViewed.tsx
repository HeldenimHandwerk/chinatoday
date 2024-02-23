// MostViewed.jsx or MostViewed.tsx
import React from 'react'
import { Article } from '@/app/types/Article'
import Image from 'next/image'
import Link from 'next/link'
import formatDate from '@/app/utils/formatDate'
import Carousel from './Carousel'

export default function Toplist({ articles }: { articles: Article[] }) {
  const filteredArticles = articles.filter(
    (article: Article) => article.attributes.CategoryBreaking !== true
  )

  // Most Viewed Articles
  const mostViewedArticles = filteredArticles
    .sort((a, b) => b.attributes.view - a.attributes.view)
    .slice(0, Math.min(5, filteredArticles.length))

  const mostViewedArticleIds = new Set(
    mostViewedArticles.map(article => article.id)
  )

  // Editor's Picks: Assuming you have a way to identify these articles
  const editorsPicks = filteredArticles
    .filter(
      article =>
        !mostViewedArticleIds.has(
          article.id
        ) /* && some condition for editor's pick */
    )
    .slice(0, Math.min(5, filteredArticles.length - mostViewedArticles.length))

  const editorsPicksIds = new Set(editorsPicks.map(article => article.id))

  // Swiper Articles: Remaining articles, excluding Most Viewed and Editor's Picks
  const swiperArticles = filteredArticles
    .filter(
      article =>
        !mostViewedArticleIds.has(article.id) &&
        !editorsPicksIds.has(article.id)
    )
    .sort(() => 0.5 - Math.random()) // Random sort
    .slice(
      0,
      Math.min(
        10,
        filteredArticles.length -
          mostViewedArticles.length -
          editorsPicks.length
      )
    )

  return (
    <>
      {/* Carousel */}
      <Carousel articles={swiperArticles} />

      {/* Most Viewed and Editor's Picks */}

      <section className="bg-gray-100 py-10 lg:mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Editors Picks Section */}
            <div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                Unsere Auswahl
              </h3>
              {editorsPicks.slice(0, 5).map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Most Viewed Section */}
            <div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                Meist gesehen
              </h3>
              {mostViewedArticles.slice(0, 5).map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, updatedAt: published } = article.attributes
  const imageUrl = article.attributes.image?.data?.attributes?.url
  const imageAlt = article.attributes.image?.data?.attributes?.alt

  return (
    <Link
      href={`/kategorien/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
      className="mb-8 block w-full"
    >
      <div className="flex flex-wrap items-center">
        <div className="w-full lg:mb-0 lg:w-6/12  xl:w-6/12">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="h-[200px] w-full rounded-md object-cover"
            width={600}
            height={400}
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-6/12">
          <div className="pl-4">
            <span className="text-sm text-gray-600">
              {formatDate(published)}
            </span>
            <h1 className="mb-2 text-xl font-semibold text-gray-800  transition-colors duration-300 hover:text-red-400">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  )
}
