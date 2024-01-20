import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article as ArticleType } from "../../types/Article";
import { fetchArticles } from "@/app/action";

const Discovery = async (category: any) => {
  let collections = [
    "Politik",
    "Wirtschaft",
    "Kultur",
    "Greenenergy",
    "Mobilität",
    "Sport",
    "Reisen",
  ];
  collections = collections.filter(
    (c) => c.toLowerCase() !== category.collection.toLowerCase()
  );

  let displayedArticles: ArticleType[] = [];

  for (const collection of collections) {
    const articlesInCollection = await fetchArticles(
      `filters[collection][name][$eq]=${collection}&filters[CategoryBreaking][$eq]=true`
    );

    // Get the first (newest) article from each sorted collection
    // If the collection has articles, select a random article
    if (articlesInCollection.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * articlesInCollection.length
      );
      displayedArticles.push(articlesInCollection[randomIndex]);
    }
  }

  return (
    <section className="bg-[#FAFAFA] pb-10 pt-20 lg:pb-20 lg:pt-10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Entdecke Mehr</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Erkunden Sie eine Vielzahl von Themen und Einsichten aus unseren
            neuesten Artikeln.
          </p>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
          {displayedArticles.map((article: ArticleType) => (
            <SingleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discovery;

interface ArticleProps {
  article: ArticleType;
}

const SingleCard: React.FC<ArticleProps> = ({ article }) => {
  const {
    title,
    text: description,
    image: {
      data: {
        attributes: { url: imageUrl },
      },
    },
    updatedAt: published,
    collection: {
      data: {
        attributes: { name: collectionName },
      },
    },
  } = article.attributes;

  return (
    <Link
      href={`/${article?.attributes?.collection?.data.attributes.slug}/${article.attributes.slug}`}
      className="w-full p-4 sm:w-1/2"
    >
      <div className="flex flex-col lg:flex-row overflow-hidden rounded-lg shadow-lg transform duration-300 hover:shadow-xl hover:-translate-y-1 bg-white h-full">
        <div className="w-full lg:w-1/2 overflow-hidden rounded-md relative h-60 lg:h-auto">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className=" absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-between p-4 sm:w-1/2">
          <div>
            <h1 className="mb-2 text-lg font-semibold text-black hover:text-red-500">
              {title}
            </h1>
            <h3 className="text-sm lg:text-md text-gray-600 truncate-3-lines">
              {description}
            </h3>
            <span className="text-xs lg:text-sm text-gray-500">
              {published}
            </span>
          </div>
          <div className="mt-2">
            <span className="px-3 py-1 text-sm lg:text-md text-white bg-red-500 rounded-full">
              {collectionName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};