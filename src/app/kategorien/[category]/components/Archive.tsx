import React, { useState } from 'react'
import Image from 'next/image'
import { Article } from '@/app/types/Article'

interface ArchiveProps {
  articles: Article[]
}

const Archive: React.FC<ArchiveProps> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6 // Adjust as needed

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

  const totalPages = Math.ceil(articles.length / articlesPerPage)

  const goToNextPage = () =>
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentArticles.map((article, index) => (
          <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
            <Image
              src={article.attributes.image.data.attributes.url}
              width={article.attributes.image.data.attributes.width}
              height={article.attributes.image.data.attributes.height}
              alt={article.attributes.title}
              className="h-60 w-full rounded-t-lg object-cover"
            />
            <h1 className="text-md mb-2 flex items-center justify-center font-bold text-black transition-colors duration-300 hover:text-red-400 lg:text-xl">
              {article?.attributes.title}
            </h1>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Archive
