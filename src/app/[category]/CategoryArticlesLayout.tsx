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
  // Extract the highlighted articles (3rd and 4th if they exist)
  const highlightedArticles = articles.slice(2, 4);

  // Prepare the rest of the articles for mobile view
  const restOfTheArticles = [
    ...articles.slice(0, 2), // First two articles
    ...articles.slice(4), // Articles after the 4th
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 py-4 gap-4 h-full md:overflow-hidden">
      {/* Mobile view */}
      <div className="md:hidden flex flex-col w-full gap-4 overflow-auto">
        {/* Render highlighted articles first */}
        {highlightedArticles.map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ minHeight: "30vh" }}
            isHighlighted={true}
            key={`highlighted-${index}`}
          />
        ))}

        {/* Then render the rest of the articles */}
        {restOfTheArticles.map((article, index) => (
          <ArticleComponent
            article={article}
            style={{ minHeight: "30vh" }}
            isHighlighted={false}
            key={`rest-${index}`}
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
        <div
          className={` w-full ${isHighlighted ? "h-full " : "h-48 relative"}`}
        >
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
