import React from "react";
import fetchCollectionArticles from "../helpers/fetch-collectionArticles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Article } from "../types/Article";
import ArticleComponent from "./ArticleComponent";

interface Props {
  params: {
    category: string;
  };
}

const Page: React.FC<Props> = async ({ params: { category } }) => {
  const articles = await fetchCollectionArticles(
    category.charAt(0).toUpperCase() + category.slice(1)
  );

  return (
    <div className="bg-white text-gray-900">
      <Header />
      <div className="p-4 container mx-auto">
        <div className="flex justify-between">
          {/* First Column */}
          <div className="flex flex-col w-1/4">
            {articles.slice(0, 2).map((article: Article) => (
              <ArticleComponent
                article={article}
                style={{ height: "50%" }}
                key={article.id}
              />
            ))}
          </div>

          {/* Second (Middle) Column */}
          <div className="flex flex-col w-1/2">
            <ArticleComponent
              article={articles[2]}
              style={{ height: "60%" }}
              isHighlighted={true}
              key={articles[2].id}
            />
            <ArticleComponent
              article={articles[3]}
              style={{ height: "40%" }}
              isHighlighted={true}
              key={articles[3].id}
            />
          </div>

          {/* Third Column */}
          <div className="flex flex-col w-1/4">
            {articles.slice(4).map((article: Article) => (
              <ArticleComponent
                article={article}
                style={{ height: "50%" }}
                key={article.id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
