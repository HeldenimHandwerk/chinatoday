import Link from "next/link";
import { search } from "@/app/action";
import { Article } from "@/app/types/Article";
import Image from "next/image";
import { Suspense } from "react";
import Discovery from "@/app/[category]/components/Discovery";

interface Props {
  params: {
    query: string;
  };
}

const SearchResultsPage: React.FC<Props> = async ({
  params: { query },
}: Props) => {
  const articles = await search(query);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4 sm:px-0">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((result: Article, index: number) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={result?.attributes?.image?.data?.attributes?.url}
                  alt={result?.attributes?.title}
                  width={result?.attributes?.image?.data?.attributes?.width}
                  height={result?.attributes?.image?.data?.attributes?.height}
                  className="w-full sm:w-[25%] h-48 object-cover"
                />
                <div className="p-4 sm:w-[75%]">
                  <h1 className="text-lg font-semibold text-gray-800 mb-2">
                    {result.attributes.title}
                  </h1>
                  <h3 className="mb-4 truncate-3-lines text-base sm:text-lg">
                    {result.attributes.text}
                  </h3>
                  <Link href={`/article/${result.attributes.slug}`}>
                    <div className="text-red-600 hover:text-red-800 transition-colors duration-300">
                      Mehr lesen
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <h3 className="text-center text-lg text-gray-600 mb-10">
              Hey, tut uns leid, aber der Artikel konnte nicht gefunden werden.
              Sie können jedoch gerne andere Artikel durchstöbern.
            </h3>
            <Suspense fallback={<div>loading... </div>}>
              <Discovery collection={""} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
