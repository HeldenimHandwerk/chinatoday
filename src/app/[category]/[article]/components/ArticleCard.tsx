import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/app/types/Article";
import formatDate from "@/app/utils/formatDate";

interface ArticleCardProps {
  article: Article;
  style: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, style }) => {
  return (
    <Link
      href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
      className={`bg-white rounded-xl overflow-hidden shadow  flex flex-col ${style} `}
    >
      <div className="w-full h-64 relative">
        <Image
          src={article.attributes.image?.data?.attributes?.url}
          alt={article.attributes.title}
          width={article.attributes.image?.data?.attributes?.width}
          height={article.attributes.image?.data?.attributes?.height}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between corner-border">
        <h1 className="text-2xl sm:text-lg font-bold text-black leading-tight mb-2 hover:text-red-500 transition-colors duration-300">
          {article.attributes.title}
        </h1>

        <p className="text-gray-600 text-base sm:text-lg truncate-3-lines leading-relaxed ">
          {article.attributes.text}
        </p>
        <div className="text-black text-sm">
          {formatDate(article.attributes.updatedAt)}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
