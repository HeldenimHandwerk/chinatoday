// MostViewed.jsx or MostViewed.tsx
import React from "react";
import { Article as ArticleType } from "../types/Article";
import Image from "next/image";
import Link from "next/link";

interface MostViewedProps {
  articles: ArticleType[];
}

const MostViewed: React.FC<MostViewedProps> = ({ articles }) => {
  const sortedArticles = articles.sort(
    (a, b) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
  );

  const filteredArticles = sortedArticles.filter(
    (article) => article.attributes.CategoryBreaking !== false
  );

  const mostViewedArticles = filteredArticles.slice(0, 5);

  return (
    <>
      <section className=" bg-gray-2 pt-20 lg:mb-[70px] lg:pt-10">
        <div className="container mx-auto">
          <div className="-mx-4 mb-[60px] flex flex-wrap items-center justify-center lg:mb-20">
            <div className="w-full px-4 lg:w-8/12">
              <div className="mb-10 max-w-[510px] lg:mb-0">
                <span className="mb-2 block text-lg font-semibold text-red-400">
                  Latest News
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark  sm:text-4xl md:text-[40px]">
                  Recent Blog Articles
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="lg:text-right">
                <div className="inline-flex justify-end rounded bg-[#F1F3FC] px-5 dark:bg-white/5">
                  <Link
                    href="#"
                    className="py-3 pr-7 text-base font-semibold text-red-400 "
                  >
                    Most Popular
                  </Link>
                  <Link
                    href="#"
                    className="py-3 text-base font-semibold text-body-color hover:text-red-400 "
                  >
                    Most Popular
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            {mostViewedArticles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MostViewed;

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

interface ArticleProps {
  article: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const { title, text: description, updatedAt: published } = article.attributes;

  const imageUrl = article.attributes.image?.data?.attributes?.url;

  return (
    <Link
      href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
      className="w-full  "
    >
      <div className="-mx-4 mb-12 flex flex-wrap items-center">
        <div className="w-full px-4  lg:w-6/12 xl:w-6/12 rounded-md">
          <div className="mb-8 w-full  lg:h-80 overflow-hidden rounded lg:mb-0">
            <Image
              src={imageUrl}
              alt={title}
              className="object-cover transition-all duration-500 hover:scale-105"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
          <div className="w-full">
            <span className="mb-8 inline-block rounded bg-red-400 px-5 py-3 text-sm font-semibold text-white">
              {formatDate(published)}
            </span>

            <h1 className="mb-4 inline-block text-2xl font-semibold text-dark hover:text-red-400 transition-colors duration-300 sm:text-2xl lg:text-xl xl:text-2xl">
              {title}
            </h1>
            <h3 className="text-base text-body-color truncate-3-lines">
              {description}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};
