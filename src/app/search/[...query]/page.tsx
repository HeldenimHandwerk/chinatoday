import Link from 'next/link'
import { search } from '@/app/action'
import { Article } from '@/app/types/Article'
import Image from 'next/image'
import { Suspense } from 'react'
import Discovery from '@/app/kategorien/[category]/components/Discovery'
import { Metadata } from 'next'

interface Props {
  params: {
    query: string
    page: string
  }
}

export const generateMetadata = (
  searchTerm: string,
  pageNumber: string
): Metadata => {
  const title = `Suchergebnisse für "${searchTerm}" | China Today`
  const description = `Entdecken Sie Artikel zu "${searchTerm}" auf China Today. Bleiben Sie informiert mit den neuesten Nachrichten und tiefgehenden Analysen.`
  const url = `https://www.china-today.de/search/${searchTerm}/${pageNumber}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      images: [
        {
          url: 'https://www.china-today.de/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.02bcd769.png&w=1080&q=75',
          width: 800,
          height: 600,
          alt: 'China Today Image'
        }
      ]
    }
  }
}

const SearchResultsPage = async ({ params }: Props) => {
  const [searchTerm, pageNumber] = params.query

  const articles = await search(searchTerm, pageNumber.toString())

  // Calculating the total number of pages for pagination
  const totalPages = articles.meta.pagination.pageCount
  const currentPage = articles.meta.pagination.page

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10 sm:px-0">
        {articles.data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {articles.data.map((result: Article, index: number) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl sm:flex-row"
              >
                <Image
                  src={result?.attributes?.image?.data?.attributes?.url}
                  alt={
                    result.attributes.image?.data?.attributes
                      ?.alternativeText || result.attributes.title
                  }
                  width={result?.attributes?.image?.data?.attributes?.width}
                  height={result?.attributes?.image?.data?.attributes?.height}
                  className="h-48 w-full object-cover sm:w-[25%]"
                />
                <div className="p-4 sm:w-[75%]">
                  <h1 className="mb-2 text-lg font-semibold text-gray-800">
                    {result.attributes.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: result.attributes.text }}
                    className="truncate-3-lines mb-4 text-base sm:text-lg"
                  />

                  <Link
                    title={result?.attributes.title + ' - China Today'}
                    href={`/kategorien/${result.attributes.collection.data.attributes.slug}/${result.attributes.slug}`}
                  >
                    <div className="text-red-600 transition-colors duration-300 hover:text-red-800">
                      Mehr lesen
                    </div>
                  </Link>
                </div>
              </div>
            ))}

            <section className="text-center">
              <div className="mb-12 inline-flex rounded bg-white p-3 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.13)]">
                <ul className="-mx-[6px] flex items-center">
                  <li className="px-[6px]">
                    <Link
                      title={`Zurück zu Seite ${currentPage - 1}`}
                      href={`/search/${searchTerm}/${currentPage - 1}`}
                      className="flex h-6 min-w-[24px] items-center justify-center rounded px-1 text-base text-body-color hover:bg-[#EDEFF1] "
                    >
                      <span>
                        <svg
                          width="5"
                          height="11"
                          viewBox="0 0 5 11"
                          className="fill-current stroke-current"
                        >
                          <path
                            d="M4.52568 1.43992L4.5258 1.44002L4.52992 1.43464C4.65176 1.27546 4.65302 1.03052 4.50933 0.869615C4.44245 0.794712 4.33573 0.744738 4.23717 0.744738C4.11463 0.744738 4.02352 0.804085 3.95164 0.884572L3.95158 0.88452L3.94847 0.888236L0.582878 4.91136C0.582815 4.91144 0.582752 4.91151 0.58269 4.91159C0.307468 5.23816 0.310823 5.76652 0.580355 6.10386L0.58032 6.10389L0.582669 6.10668L3.94865 10.1153L3.9486 10.1154L3.95164 10.1188C4.09202 10.276 4.34412 10.3187 4.50933 10.1337C4.64406 9.98285 4.67538 9.73307 4.52438 9.56186L1.16317 5.55892C1.13433 5.51727 1.14509 5.46502 1.15671 5.452L1.15676 5.45205L1.1597 5.44855L4.52568 1.43992Z"
                            strokeWidth="0.3"
                          ></path>
                        </svg>
                      </span>
                    </Link>
                  </li>

                  {/* Dynamic Page Links */}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PageLink
                      key={index}
                      count={index + 1}
                      pageSrc={`/search/${searchTerm}/${index + 1}`}
                      isActive={currentPage === index + 1}
                    />
                  ))}

                  <li>
                    <Link
                      title={`Weiter zu Seite ${currentPage + 1}`}
                      href={`/search/${searchTerm}/${currentPage + 1}`}
                      className="flex h-6 min-w-[24px] items-center justify-center rounded px-1 text-base text-body-color hover:bg-[#EDEFF1] "
                    >
                      <span>
                        <svg
                          width="5"
                          height="11"
                          viewBox="0 0 5 11"
                          className="fill-current stroke-current"
                        >
                          <path
                            d="M0.474318 9.56008L0.474201 9.55998L0.47008 9.56536C0.348244 9.72454 0.346976 9.96948 0.490666 10.1304C0.557553 10.2053 0.664273 10.2553 0.762833 10.2553C0.885369 10.2553 0.976484 10.1959 1.04836 10.1154L1.04842 10.1155L1.05153 10.1118L4.41712 6.08864C4.41718 6.08856 4.41725 6.08849 4.41731 6.08841C4.69253 5.76184 4.68918 5.23348 4.41965 4.89614L4.41968 4.89611L4.41733 4.89332L1.05135 0.884685L1.0514 0.88464L1.04836 0.881232C0.907984 0.724036 0.65588 0.681265 0.490667 0.866274C0.355939 1.01715 0.324615 1.26693 0.475624 1.43814L3.83683 5.44108C3.86567 5.48274 3.85491 5.53498 3.84329 5.548L3.84324 5.54795L3.8403 5.55145L0.474318 9.56008Z"
                            strokeWidth="0.3"
                          ></path>
                        </svg>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
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
    </main>
  )
}

export default SearchResultsPage

type PageLinkProps = {
  pageSrc: string
  count: number
  isActive: boolean
}

const PageLink = ({ pageSrc, count, isActive }: PageLinkProps) => {
  return (
    <li className="px-[6px]">
      <Link
        title={`Gehe zu Seite ${count}`}
        href={pageSrc}
        className={`flex h-6 min-w-[24px] items-center justify-center rounded px-1 text-base text-body-color hover:bg-[#EDEFF1] ${isActive ? 'bg-[#EDEFF1]' : ''}`}
      >
        {count}
      </Link>
    </li>
  )
}
