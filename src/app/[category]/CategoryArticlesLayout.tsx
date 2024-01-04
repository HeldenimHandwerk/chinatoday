// ArticleComponent.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article as ArticleType } from "../types/Article";

interface CategoryArticlesLayoutProps {
  articles: ArticleType[];
}

const CategoryArticlesLayout: React.FC<CategoryArticlesLayoutProps> = ({
  articles,
}) => {
  console.log(
    articles.map(
      (article) => article.attributes.collection.data.attributes.slug
    )
  );
  return (
    <div className="flex justify-between px-10 py-2 h-[85vh]">
      {/* First Column */}
      <div className="flex flex-col w-1/4 ">
        {articles.slice(0, 2).map((article: ArticleType, index: number) => (
          <ArticleComponent
            article={article}
            style={{ height: "50%" }}
            key={index}
          />
        ))}
      </div>

      {/* Second (Middle) Column */}
      <div className="flex flex-col w-1/2 ">
        <ArticleComponent
          article={articles[2]}
          style={{ height: "60%" }}
          isHighlighted={true}
        />
        <ArticleComponent
          article={articles[3]}
          style={{ height: "40%" }}
          isHighlighted={true}
        />
      </div>

      {/* Third Column */}
      <div className="flex flex-col w-1/4 ">
        {articles.slice(4).map((article: ArticleType, index: number) => (
          <ArticleComponent
            article={article}
            style={{ height: "50%" }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryArticlesLayout;

interface ArticleComponentProps {
  article: ArticleType;
  style: React.CSSProperties;
  isHighlighted?: boolean;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  style,
  isHighlighted,
}) => (
  <div className={`overflow-hidden shadow-md relative`} style={style}>
    <Link
      href={`/${article?.attributes?.collection?.data?.attributes?.slug}/${article?.attributes?.slug}`}
    >
      <div className="block h-full ">
        <div className={`relative w-full ${isHighlighted ? "h-full" : "h-48"}`}>
          <Image
            src={article?.attributes?.image?.data?.attributes?.url}
            alt={article?.attributes?.title}
            className="object-cover transition-all duration-500 hover:scale-105"
            fill
          />
          {isHighlighted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h1 className="text-white font-bold mb-2 text-2xl hover:text-red-400 transition-colors duration-300">
                {article?.attributes.title}
              </h1>
              <h3 className="text-white mb-4 truncate text-lg ">
                {article?.attributes.text}
              </h3>
              <div className="text-white text-xs">
                Updated: {formatDate(article?.attributes.updatedAt)}
              </div>
            </div>
          )}
        </div>
        {!isHighlighted && (
          <div className="p-4 rounded-xl">
            <h1 className="font-bold text-black mb-2 line-clamp-2 text-lg hover:text-red-400 transition-colors duration-300">
              {article?.attributes.title}
            </h1>
            <h3 className="text-gray-600 mb-4 truncate text-md ">
              {article?.attributes.text}
            </h3>
            <div className="text-gray-500 text-xs">
              Updated: {formatDate(article?.attributes.updatedAt)}
            </div>
          </div>
        )}
      </div>
    </Link>
  </div>
);

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
