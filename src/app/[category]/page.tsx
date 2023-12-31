import React from "react";
import Image from "next/image";
import Link from "next/link";
import fetchCollectionArticles from "../helpers/fetch-collectionArticles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Article } from "../types/Article";

interface Props {
  params: {
    category: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })} at ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const Page: React.FC<Props> = async ({ params: { category } }) => {
  const articles = await fetchCollectionArticles(
    category.charAt(0).toUpperCase() + category.slice(1)
  );

  return (
    <div className="bg-white text-gray-900">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {articles.map((article: Article, index: number) => {
            // Define the grid layout based on the index
            let gridColumn = "lg:col-span-1";
            let gridRow = "lg:row-span-2";
            if (index === 1) {
              // Highlight article in the middle
              gridColumn = "lg:col-span-2";
              gridRow = "lg:row-span-2";
            }
            if (index === 5) {
            } else {
              gridRow = "lg:row-span-1"; // Smaller height
            }

            return (
              <div
                key={article.id}
                className={`rounded overflow-hidden shadow-md mb-4 ${gridColumn} ${gridRow}`}
              >
                <Link
                  href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
                  className="block h-full"
                >
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <Image
                      src={article.attributes.image?.data?.attributes?.url}
                      alt={article.attributes.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-lg font-bold text-black mb-2 line-clamp-2">
                      {article.attributes.title}
                    </h1>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.attributes.text}
                    </p>
                    <div className="text-gray-500 text-xs">
                      Updated: {formatDate(article.attributes.updatedAt)}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
