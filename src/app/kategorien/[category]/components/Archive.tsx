'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Article } from '@/app/types/Article'
import Link from 'next/link'

interface ArchiveProps {
  articles: Article[]
}

const Archive: React.FC<ArchiveProps> = ({ articles }) => {
  const [showArticles, setShowArticles] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  return (
    <section className="h-full  sm:p-10">
      {/* Modern "Show Articles" Button with Red-400 Theme */}
      <div className="p-5">
        <button
          className=" flex w-full items-center justify-center rounded-md bg-red-400 px-4 py-3 text-lg font-bold text-white shadow-md transition duration-300 ease-in-out sm:container hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={() => setShowArticles(!showArticles)}
        >
          {showArticles ? 'Archivartikel ausblenden' : 'Archivartikel anzeigen'}
        </button>
      </div>

      {/* Animated Articles Container with Modern Transitions */}
      {showArticles && (
        <div
          className={`m-5 flex-grow-0 origin-top transform  overflow-hidden transition-all duration-500`}
        >
          <div className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentArticles.map((article, index) => (
              <Link
                key={index}
                className="rounded-lg bg-white p-4 shadow-lg "
                href={`/kategorien/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
                title={article.attributes.title + '- China Today'}
              >
                <Image
                  src={article.attributes.image.data.attributes.url}
                  width={article.attributes.image.data.attributes.width}
                  height={article.attributes.image.data.attributes.height}
                  alt={
                    article.attributes.image.data.attributes.alternativeText ||
                    article.attributes.title
                  }
                  className="h-64 w-full rounded-t-lg object-cover"
                />
                <h1 className="text-md mb-2 p-5  font-bold text-black transition-colors duration-300 hover:text-red-400 lg:text-xl">
                  {article.attributes.title}
                </h1>
              </Link>
            ))}
          </div>
          <div className="mb-20 mt-4 flex justify-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="mx-2 rounded-lg bg-red-400 px-4 py-2 font-bold text-white shadow transition duration-300 ease-in-out hover:bg-red-500 disabled:opacity-50"
            >
              Zurück
            </button>
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="mx-2 rounded-lg bg-red-400 px-4 py-2 font-bold text-white shadow transition duration-300 ease-in-out hover:bg-red-500 disabled:opacity-50"
            >
              Nächste
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Archive
