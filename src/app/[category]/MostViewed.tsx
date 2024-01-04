// MostViewed.jsx or MostViewed.tsx
import React from "react";
import { Article } from "../types/Article";
import Image from "next/image";
import Link from "next/link";

export default async function MostViewed({
  articles,
}: {
  articles: Article[];
}) {
  const sortedArticles = articles.sort(
    (a: Article, b: Article) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
  );

  const filteredArticles = sortedArticles.filter(
    (article: Article) => article.attributes.CategoryBreaking !== false
  );

  const mostViewedArticles = filteredArticles.slice(0, 5);
  return (
    <section className="bg-gray-100 py-10 lg:mb-20">
      <div className=" mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Most Viewed
            </h3>
            {mostViewedArticles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Most Recent
            </h3>
            {mostViewedArticles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const formatDate = (dateString: string): string => {
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

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, text: description, updatedAt: published } = article.attributes;
  const imageUrl = article.attributes.image?.data?.attributes?.url;

  return (
    <Link
      href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
      className="mb-8 block w-full"
    >
      <div className="flex flex-wrap items-center">
        <div className="w-full lg:w-6/12 xl:w-6/12 mb-4 lg:mb-0">
          <Image
            src={imageUrl}
            alt={title}
            className="rounded-md object-cover"
            width={600}
            height={400}
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-6/12">
          <div className="pl-4">
            <span className="text-sm text-gray-600">
              {formatDate(published)}
            </span>
            <h1 className="mb-2 text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300">
              {title}
            </h1>
            <p className="text-base text-gray-700 truncate-3-lines">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
