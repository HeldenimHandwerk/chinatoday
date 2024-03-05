import React, { Suspense } from 'react'
import { fetchCollectionArticles } from '@/app/action'
import MostViewed from './components/MostViewed'
import CategoryArticlesLayout from './components/CategoryArticlesLayout'
import Discovery from './components/Discovery'
import type { Metadata } from 'next'
import Archive from './components/Archive'

interface Props {
  params: {
    category: string
  }
}

async function fetchArticles(collection: string) {
  const articles = await fetchCollectionArticles(collection)

  return articles
}

export const generateMetadata = async ({
  params: { category }
}: {
  params: { category: string }
}): Promise<Metadata> => {
  return {
    title: `China Today - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    description: `Entdecken Sie mit China Today die neuesten Nachrichten, tiefgreifende Analysen und bahnbrechende Geschichten in ${category.charAt(0).toUpperCase() + category.slice(1)}. Von neuen Trends bis hin zu umfassenden Berichten bietet unsere Rubrik ${category.charAt(0).toUpperCase() + category.slice(1)} eine einzigartige Perspektive auf die wichtigsten Themen. Bleiben Sie mit den Experten von China Today informiert und der Zeit voraus. `
  }
}

const Page = async ({ params: { category } }: Props) => {
  const articles = await fetchArticles(category)
  return (
    <div className="h-full bg-[#FAFAFA] text-gray-900">
      <CategoryArticlesLayout articles={articles} />
      <Suspense fallback={<div>Loading...</div>}>
        <MostViewed articles={articles} />
        <Discovery collection={category} />
        <Archive articles={articles} />
      </Suspense>
    </div>
  )
}

export default Page
