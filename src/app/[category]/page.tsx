import React from "react";
import { fetchCollectionArticles } from "@/app/action";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MostViewed from "./components/MostViewed";
import CategoryArticlesLayout from "./components/CategoryArticlesLayout";
import Discovery from "./components/Discovery";
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
      <CategoryArticlesLayout articles={articles} />
      <MostViewed articles={articles} />
      <Discovery collection={categoryCapitalized} />
      <Footer />
    </div>
  );
};

export default Page;
