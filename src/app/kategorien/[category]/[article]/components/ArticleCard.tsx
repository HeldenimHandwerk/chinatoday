import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/app/types/Article'
import formatDate from '@/app/utils/formatDate'

interface ArticleCardProps {
  article: Article
  style: any
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, style }) => {
  return (
    <Link
      href={`/kategorien/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
      className={`flex flex-col overflow-hidden rounded-xl  bg-white shadow ${style} `}
    >
      <div className="relative h-64 w-full">
        <Image
          src={article.attributes.image?.data?.attributes?.url}
          alt={article.attributes.image?.data?.attributes?.alt}
          width={article.attributes.image?.data?.attributes?.width}
          height={article.attributes.image?.data?.attributes?.height}
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
        />
      </div>
      <div className="corner-border flex flex-grow flex-col justify-between p-4">
        <h1 className="mb-2 text-2xl font-bold leading-tight text-black transition-colors duration-300 hover:text-red-400 sm:text-lg">
          {article.attributes.title}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: article.attributes.text.slice(0, 100) + '...'
          }}
          className="truncate-3-lines text-base leading-relaxed text-gray-600  sm:text-lg"
        />

        <div className="text-sm text-black">
          {formatDate(article.attributes.updatedAt)}
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
