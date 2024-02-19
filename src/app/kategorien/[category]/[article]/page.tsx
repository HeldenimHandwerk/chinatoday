import { fetchArticles } from '@/app/action'
import Image from 'next/image'
import Link from 'next/link'
import { fetchCollectionArticles } from '@/app/action'
import picture from '../../../../../public/images/Aldi-Banner.jpg'
import ArticleCard from './components/ArticleCard'
import { Article } from '@/app/types/Article'
import TextToSpeechButton from './components/TextToSpeechButton'
import formatDate from '@/app/utils/formatDate'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'

type ArticleData = {
  title: string
  text: string
  image: any
  updatedAt: string
  source: string
}

export const generateMetadata = async ({
  params: { article }
}: {
  params: { article: string }
}): Promise<Metadata> => {
  const { article: articleData } = await fetchArticleData(article)

  return {
    title: `${articleData.title}`,
    description: `${articleData.text}`,
    openGraph: {
      title: `${articleData.title}`,
      description: `${articleData.text}`,
      images: [
        {
          url: `${articleData.image?.data?.attributes?.url}`,
          width: articleData.image?.data?.attributes?.width,
          height: articleData.image?.data?.attributes?.height,
          alt: `${articleData.title}`
        }
      ]
    }
  }
}

const fetchArticleData = async (
  slug: string
): Promise<{ article: ArticleData; relatedArticles: Article[] }> => {
  // Fetch the main article
  const articleResponse = await fetchArticles(`filters[slug][$eq]=${slug}`)
  const articleData = articleResponse[0]?.attributes

  // Fetch related articles based on the article category
  const articleCategory = articleData?.collection.data.attributes.slug
  const relatedResponse = await fetchCollectionArticles(articleCategory)
  const relatedArticles = relatedResponse.slice(0, 3)
  //format the date
  const formattedDate = formatDate(articleData?.updatedAt)
  // Return the main article data and related articles
  console.log(articleData.source)
  return {
    article: {
      title: articleData?.title,
      text: articleData?.text,
      image: articleData?.image,
      updatedAt: formattedDate,
      source: articleData?.source
    },
    relatedArticles
  }
}

const AdImage = () => {
  return (
    <Image
      className="h-92 w-full rounded-lg object-cover object-center py-10"
      src={picture}
      alt={'Ad'}
      height={500}
      width={500}
      quality={100}
    />
  )
}

interface Props {
  params: {
    article: string
  }
}

const Page: React.FC<Props> = async ({ params: { article } }) => {
  const { article: articleData, relatedArticles } =
    await fetchArticleData(article)

  const { title, text, image, updatedAt, source } = articleData

  const insertAdsBasedOnLength = (htmlContent: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = []
    const totalLength = htmlContent.length
    const adPositions = totalLength > 2000 ? [0.5, 0.75] : [0.5] // Example positions

    let lastIndex = 0
    adPositions.forEach((percentage, index) => {
      const position = Math.floor(totalLength * percentage)
      const beforeAd = htmlContent.substring(lastIndex, position)
      lastIndex = position
      elements.push(
        <div
          key={`text-${index}`}
          dangerouslySetInnerHTML={{ __html: beforeAd }}
        />
      )
      elements.push(<AdImage key={`ad-${index}`} />)
    })

    // Add remaining content, if any
    if (lastIndex < totalLength) {
      elements.push(
        <div
          key="text-end"
          dangerouslySetInnerHTML={{ __html: htmlContent.substring(lastIndex) }}
        />
      )
    }

    return elements
  }

  return (
    <main>
      <div className="container mx-auto my-5 mb-8 rounded-md bg-gray-100 p-6 shadow-sm ">
        <div className="mb-8">
          <Suspense fallback={<Skeleton count={5} />}>
            {image && (
              <div className="relative mb-8 h-[450px] w-full rounded-lg shadow-lg">
                <Image
                  src={image?.data?.attributes?.url}
                  alt={title}
                  width={image?.data?.attributes?.width}
                  height={image?.data?.attributes?.height}
                  className="h-full w-full rounded-lg object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                  <h1 className="justify-left flex items-center text-3xl font-bold text-white sm:p-5 md:text-5xl">
                    {title}
                  </h1>
                  <h3>
                    <span className="text-sm text-white">{updatedAt}</span>
                    <span className="text-sm text-gray-300"> © {source}</span>
                  </h3>
                </div>
              </div>
            )}
          </Suspense>
          <TextToSpeechButton text={text} />
          {!image && (
            <div className="mb-4 rounded-lg bg-red-200 p-4 text-red-800 shadow">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className=" m-10 mx-auto text-lg leading-relaxed text-gray-700 md:w-[70vw] lg:w-[60vw] "
          />

          <Suspense fallback={<div>Loading...</div>}>
            <section className="related-articles mt-10">
              <h2 className="mb-4 rounded-md bg-red-200 p-3 text-4xl font-semibold text-red-800 shadow-lg">
                Related Articles
              </h2>
              <div className="grid gap-4 md:grid-cols-3 ">
                {relatedArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    style={undefined}
                  />
                ))}
              </div>
            </section>
          </Suspense>
          <div className="mt-10 text-center">
            <Link href="/">
              <div className="rounded-full bg-red-200 px-4 py-2 text-red-800 shadow transition duration-300 ease-in-out hover:bg-red-300">
                Zurück zur Startseite
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
