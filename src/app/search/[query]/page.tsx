import Link from 'next/link'
import { search } from '@/app/action'
import { Article } from '@/app/types/Article'
import Image from 'next/image'
import { Suspense } from 'react'
import Discovery from '@/app/[category]/components/Discovery'
import ArticleText from '@/app/utils/ArticleText'

interface Props {
  params: {
    query: string
  }
}

const SearchResultsPage: React.FC<Props> = async ({
  params: { query }
}: Props) => {
  const articles = await search(query)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10 sm:px-0">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((result: Article, index: number) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row"
              >
                <Image
                  src={result?.attributes?.image?.data?.attributes?.url}
                  alt={result?.attributes?.title}
                  width={result?.attributes?.image?.data?.attributes?.width}
                  height={result?.attributes?.image?.data?.attributes?.height}
                  className="h-48 w-full object-cover sm:w-[25%]"
                />
                <div className="p-4 sm:w-[75%]">
                  <h1 className="mb-2 text-lg font-semibold text-gray-800">
                    {result.attributes.title}
                  </h1>
                  <ArticleText
                    text={result.attributes.text}
                    className="truncate-3-lines mb-4 text-base sm:text-lg"
                  />

                  <Link href={`/article/${result.attributes.slug}`}>
                    <div className="text-red-600 transition-colors duration-300 hover:text-red-800">
                      Mehr lesen
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <h3 className="mb-10 text-center text-lg text-gray-600">
              Hey, tut uns leid, aber der Artikel konnte nicht gefunden werden.
              Sie können jedoch gerne andere Artikel durchstöbern.
            </h3>
            <Suspense fallback={<div>loading... </div>}>
              <Discovery collection={''} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage
