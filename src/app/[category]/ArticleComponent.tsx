// ArticleComponent.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "../types/Article";

interface ArticleComponentProps {
  article: Article;
  style: React.CSSProperties;
  isHighlighted?: boolean;
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

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  style,
  isHighlighted,
}) => (
  <div className={` overflow-hidden shadow-md relative`} style={style}>
    <Link
      href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
    >
      <div className="block h-full">
        <div
          className={`relative w-full h-full ${
            isHighlighted ? "h-full" : "h-48"
          }`}
        >
          <Image
            src={article.attributes.image?.data?.attributes?.url}
            alt={article.attributes.title}
            className="object-cover transition-all duration-500 hover:scale-110 "
            fill
          />
          {isHighlighted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h1 className="text-white font-bold mb-2 text-2xl">
                {article.attributes.title}
              </h1>
              <h3 className="text-white mb-4 truncate text-lg">
                {article.attributes.text}
              </h3>
              <div className="text-white text-xs">
                Updated: {formatDate(article.attributes.updatedAt)}
              </div>
            </div>
          )}
        </div>
        {!isHighlighted && (
          <div className="p-4">
            <h1 className="font-bold text-black mb-2 line-clamp-2 text-lg">
              {article.attributes.title}
            </h1>
            <h3 className="text-gray-600 mb-4 truncate text-md">
              {article.attributes.text}
            </h3>
            <div className="text-gray-500 text-xs">
              Updated: {formatDate(article.attributes.updatedAt)}
            </div>
          </div>
        )}
      </div>
    </Link>
  </div>
);

export default ArticleComponent;
