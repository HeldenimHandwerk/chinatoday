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
  // Prepare a mobile-specific array of articles, with highlighted ones first
  const mobileArticles = [
    ...(articles.length > 2 ? [articles[2]] : []), // Add 3rd article if exists
    ...(articles.length > 3 ? [articles[3]] : []), // Add 4th article if exists
    ...articles.slice(0, 2), // Add first two articles
    ...articles.slice(4), // Add the rest of the articles
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 py-4 gap-4 h-[85vh] md:overflow-hidden">
      {/* Mobile view: Display articles in a rearranged order */}
      <div className="md:hidden flex flex-col w-full gap-4 overflow-auto">
        {mobileArticles.map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ minHeight: "40vh" }} // Responsive height
            isHighlighted={index === 0 || index === 1} // Highlight the first two articles (which are 3rd and optionally 4th from original array)
            key={index}
          />
        ))}
      </div>

      {/* Desktop view: Original three columns */}
      {/* First Column */}
      <div className="hidden md:flex flex-col w-1/4 gap-4">
        {articles.slice(0, 2).map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ height: "50%" }}
            key={index}
          />
        ))}
      </div>
      {/* Second Column */}
      <div className="hidden md:flex flex-col w-1/2 gap-4">
        <ArticleComponent
          article={articles[2]}
          style={{ height: "60%" }}
          isHighlighted={true}
        />
        {articles.length > 3 && (
          <ArticleComponent
            article={articles[3]}
            style={{ height: "40%" }}
            isHighlighted={true}
          />
        )}
      </div>
      {/* Third Column */}
      <div className="hidden md:flex flex-col w-1/4 gap-4">
        {articles.slice(4).map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ height: "50%" }}
            key={index + 4}
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
  <div
    className={"overflow-hidden shadow-lg rounded-lg relative "}
    style={style}
  >
    <Link
      href={`/${article?.attributes.collection.data.attributes.slug}/${article?.attributes.slug}`}
    >
      <div className="block h-full">
        <div className={`relative w-full ${isHighlighted ? "h-full" : "h-48"}`}>
          <Image
            src={article?.attributes?.image?.data?.attributes.url}
            alt={article?.attributes.title}
            fill
            className="object-cover object-center transition-all duration-500 hover:scale-105"
          />
          {isHighlighted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h1 className="text-white font-bold mb-2 text-2xl hover:text-red-400 transition-colors duration-300">
                {article?.attributes.title}
              </h1>
              <h3 className="text-white mb-4 truncate text-lg">
                {article?.attributes.text}
              </h3>
              <div className="text-white text-xs">
                Updated: {formatDate(article?.attributes.updatedAt)}
              </div>
            </div>
          )}
        </div>
        {!isHighlighted && (
          <div className="p-4">
            <h1 className="font-bold text-black mb-2 line-clamp-2 text-lg hover:text-red-400 transition-colors duration-300">
              {article?.attributes.title}
            </h1>
            <h3 className="text-gray-600 mb-4 truncate text-md">
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
