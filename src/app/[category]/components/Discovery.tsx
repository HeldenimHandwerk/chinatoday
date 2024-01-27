import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article as ArticleType } from '../../types/Article'
import { fetchArticles } from '@/app/action'
import ArticleText from '@/app/utils/ArticleText'
const Discovery = async (category: any) => {
  let collections = [
    'Politik',
    'Wirtschaft',
    'Kultur',
    'Greenenergy',
    'Mobilität',
    'Sport',
    'Reisen'
  ]
  if (category) {
    collections = collections.filter(
      c => c.toLowerCase() !== category.collection.toLowerCase()
    )
  }

  let displayedArticles: ArticleType[] = []

  for (const collection of collections) {
    const articlesInCollection = await fetchArticles(
      `filters[collection][name][$eq]=${collection}&filters[CategoryBreaking][$eq]=true`
    )

    // Get the first (newest) article from each sorted collection
    // If the collection has articles, select a random article
    if (articlesInCollection.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * articlesInCollection.length
      )
      displayedArticles.push(articlesInCollection[randomIndex])
    }
  }

  return (
    <section className="bg-[#FAFAFA] pb-10 pt-20 lg:pb-20 lg:pt-10">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black">Entdecken</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Erkunden Sie eine Vielzahl von Themen und Einsichten aus unseren
            neuesten Artikeln.
          </p>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
          {displayedArticles.map((article: ArticleType) => (
            <SingleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Discovery

interface ArticleProps {
  article: ArticleType
}

const SingleCard: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Link
      href={`/${article?.attributes?.collection?.data.attributes.slug}/${article.attributes.slug}`}
      className="w-full p-4 sm:w-1/2"
    >
      <div className="flex h-full transform flex-col overflow-hidden rounded-lg bg-white shadow-lg duration-300 hover:-translate-y-1 hover:shadow-xl lg:flex-row">
        <div className="relative h-60 w-full overflow-hidden rounded-md lg:h-auto lg:w-1/2">
          <Image
            src={article?.attributes.image?.data?.attributes?.url}
            alt={article?.attributes?.title}
            width={article?.attributes.image?.data?.attributes?.width}
            height={article?.attributes?.image?.data?.attributes?.height}
            className="h-full w-full object-cover opacity-90 transition-all duration-500 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-4 sm:w-1/2">
          <div>
            <h1 className="mb-2 text-lg font-semibold text-black hover:text-red-500">
              {article?.attributes?.title}
            </h1>
            <ArticleText
              text={article?.attributes?.text}
              className="lg:text-md truncate-3-lines text-sm text-gray-600"
            />

            <span className="text-xs text-gray-500 lg:text-sm">
              {article?.attributes?.updatedAt}
            </span>
          </div>
          <div className="mt-2">
            <span className="lg:text-md rounded-full bg-red-500 px-3 py-1 text-sm text-white">
              {article.attributes?.collection?.data?.attributes?.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
