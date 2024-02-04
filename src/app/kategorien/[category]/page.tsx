import React, { Suspense } from 'react'
import { fetchCollectionArticles } from '@/app/action'
import MostViewed from './components/MostViewed'
import CategoryArticlesLayout from './components/CategoryArticlesLayout'
import Discovery from './components/Discovery'
import type { Metadata } from 'next'

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
    description: `China Today - ${category.charAt(0).toUpperCase() + category.slice(1)}`
  }
}

const Page = async ({ params: { category } }: Props) => {
  const articles = await fetchArticles(category)
  return (
    <div className="bg-[#FAFAFA] text-gray-900">
      <CategoryArticlesLayout articles={articles} />
      <MostViewed articles={articles} />
      <Suspense fallback={<div>Loading...</div>}>
        <Discovery collection={category} />
      </Suspense>
    </div>
  )
}

export default Page
