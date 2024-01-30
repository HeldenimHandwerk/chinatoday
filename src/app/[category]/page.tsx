import React, { Suspense } from 'react'
import { fetchCollectionArticles } from '@/app/action'
import Header from '@/app/utils/Header'
import Footer from '@/app/utils/Footer'
import MostViewed from './components/MostViewed'
import CategoryArticlesLayout from './components/CategoryArticlesLayout'
import Discovery from './components/Discovery'
interface Props {
  params: {
    category: string
  }
}

async function fetchArticles(collection: string) {
  const articles = await fetchCollectionArticles(collection)

  return articles
}

const Page = async ({ params: { category } }: Props) => {
  const categoryCapitalized =
    category.charAt(0).toUpperCase() + category.slice(1)
  const articles = await fetchArticles(categoryCapitalized)
  return (
    <div className="bg-[#FAFAFA] text-gray-900">
      <CategoryArticlesLayout articles={articles} />
      <p>{Date.now()}</p>

      <MostViewed articles={articles} />
      <Suspense fallback={<div>Loading...</div>}>
        <Discovery collection={categoryCapitalized} />
      </Suspense>
    </div>
  )
}

export default Page
