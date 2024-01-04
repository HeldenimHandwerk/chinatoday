import React from "react";
import fetchCollectionArticles from "../helpers/fetch-collectionArticles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Article } from "../types/Article";
import MostViewed from "./MostViewed";
import CategoryArticlesLayout from "./CategoryArticlesLayout";
import Discovery from "./Discovery";
interface Props {
  params: {
    category: string;
  };
}

async function fetchArticles(collection: string) {
  const articles = await fetchCollectionArticles(collection);

  return articles;
}

const Page = async ({ params: { category } }: Props) => {
  const categoryCapitalized =
    category.charAt(0).toUpperCase() + category.slice(1);
  const articles = await fetchArticles(categoryCapitalized);
  return (
    <div className="bg-[#FAFAFA] text-gray-900">
      <Header />
      <div className="mx-auto w-3/4">
        <CategoryArticlesLayout articles={articles} />
      </div>
      <MostViewed articles={articles} />
      <Discovery collection={categoryCapitalized} />
      <Footer />
    </div>
  );
};

export default Page;
