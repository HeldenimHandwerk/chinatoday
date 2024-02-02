import { fetchArticles } from '@/app/action'
import Image from 'next/image'
import Link from 'next/link'
import { fetchCollectionArticles } from '@/app/action'
import picture from '../../../../public/images/Aldi-Banner.jpg'
import ArticleCard from './components/ArticleCard'
import { Article } from '@/app/types/Article'
import TextToSpeechButton from './components/TextToSpeechButton'
import formatDate from '@/app/utils/formatDate'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import ArticleText from '@/app/utils/ArticleText'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
type ArticleData = {
  title: string
  text: string
  ck: string
  image: any // Adjust the type as needed
  updatedAt: string
  source: string
}

const fetchArticleData = async (
  slug: string
): Promise<{ article: ArticleData; relatedArticles: Article[] }> => {
  // Fetch the main article
  const articleResponse = await fetchArticles(`filters[slug][$eq]=${slug}`)
  const articleData = articleResponse[0]?.attributes

  // Fetch related articles based on the article category
  const articleCategory = articleData?.collection.data.attributes.name
  const relatedResponse = await fetchCollectionArticles(articleCategory)
  const relatedArticles = relatedResponse.slice(0, 3)
  //format the date
  const formattedDate = formatDate(articleData?.updatedAt)
  // Return the main article data and related articles
  return {
    article: {
      title: articleData.title,
      text: articleData.text,
      ck: articleData.ck,
      image: articleData.image,
      updatedAt: formattedDate,
      source: articleData.ImageSource
    },
    relatedArticles
  }
}

const AdImage = () => {
  return (
    <Image
      className="h-92 w-full rounded-lg object-cover object-center py-10"
      src={picture}
      alt={'www'}
      height={500}
      width={500}
      quality={100}
    />
  )
}

export const generateMetadata = async ({
  params: { article }
}: {
  params: { article: string }
}): Promise<Metadata> => {
  const { article: articleData } = await fetchArticleData(article)

  return {
    title: `${articleData.title}`,
    description: `${articleData.text}`
  }
}

interface Props {
  params: {
    article: string
  }
}

const Page: React.FC<Props> = async ({ params: { article } }) => {
  const { article: articleData, relatedArticles } =
    await fetchArticleData(article)

  const { title, text, image, updatedAt, source, ck } = articleData

  const insertAdsBasedOnLength = (text: string) => {
    const sentenceEndRegex = /\. [A-Z]/
    const findNextSentenceEnd = (text: string, startIndex: number): number => {
      const match = sentenceEndRegex.exec(text.slice(startIndex))
      return match ? startIndex + match.index + 1 : text.length
    }

    const createTextElement = (key: string, text: string) => (
      <ArticleText
        key={key}
        text={text}
        className="my-4 text-base leading-relaxed"
      />
    )

    const elements: React.ReactNode[] = []
    const totalLength = text.length
    let lastIndex = 0
    let adIndex = 1

    // Insert the first sentence as a title
    const firstSentenceEnd = findNextSentenceEnd(text, 0)
    elements.push(createTextElement('title', text.slice(0, firstSentenceEnd)))
    lastIndex = firstSentenceEnd

    // Define positions for ads
    const adPositions = totalLength > 2000 ? [0.3, 0.6] : [0.5]

    adPositions.forEach(percentage => {
      const position = Math.floor(totalLength * percentage)
      const nextSentenceEnd = findNextSentenceEnd(text, position)

      // Add text before the ad
      elements.push(
        createTextElement(
          `text-${adIndex}`,
          text.slice(lastIndex, nextSentenceEnd)
        )
      )
      // Add the ad
      elements.push(<AdImage key={`ad-${adIndex}`} />)

      lastIndex = nextSentenceEnd
      adIndex++
    })

    // Add any remaining text after the last ad
    if (lastIndex < totalLength) {
      elements.push(createTextElement('text-end', text.slice(lastIndex)))
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
                  <h3>
                    <span className="text-sm text-white">{updatedAt}</span>
                    <span className="text-sm text-gray-300"> © {source}</span>
                  </h3>
                  <h1 className="justify-left flex items-center text-3xl font-bold text-white sm:p-5 md:text-5xl">
                    {title}
                  </h1>
                </div>
              </div>
            )}
          </Suspense>
          <TextToSpeechButton text={text} />
          <div dangerouslySetInnerHTML={{ __html: ck }} />
          {!image && (
            <div className="mb-4 rounded-lg bg-red-200 p-4 text-red-800 shadow">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          )}

          <div className="container mx-auto mb-6 text-lg leading-relaxed text-gray-700 md:w-[70vw] lg:w-[60vw] ">
            {insertAdsBasedOnLength(text)}
          </div>
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
