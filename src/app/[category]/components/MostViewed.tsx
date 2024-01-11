// MostViewed.jsx or MostViewed.tsx
import React from "react";
import { Article } from "../../types/Article";
import Image from "next/image";
import Link from "next/link";
import formatDate from "../../utils/formatDate";
import Carousel from "./Carousel";

export default function MostViewed({ articles }: { articles: Article[] }) {
  const filteredArticles = articles.filter(
    (article: Article) => article.attributes.CategoryBreaking !== true
  );

  // Most Viewed Articles
  const mostViewedArticles = filteredArticles
    .sort((a, b) => b.attributes.view - a.attributes.view)
    .slice(0, Math.min(5, filteredArticles.length));

  const mostViewedArticleIds = new Set(
    mostViewedArticles.map((article) => article.id)
  );

  // Editor's Picks: Assuming you have a way to identify these articles
  const editorsPicks = filteredArticles
    .filter(
      (article) =>
        !mostViewedArticleIds.has(
          article.id
        ) /* && some condition for editor's pick */
    )
    .slice(0, Math.min(5, filteredArticles.length - mostViewedArticles.length));

  const editorsPicksIds = new Set(editorsPicks.map((article) => article.id));

  // Swiper Articles: Remaining articles, excluding Most Viewed and Editor's Picks
  const swiperArticles = filteredArticles
    .filter(
      (article) =>
        !mostViewedArticleIds.has(article.id) &&
        !editorsPicksIds.has(article.id)
    )
    .sort(() => 0.5 - Math.random()) // Random sort
    .slice(
      0,
      Math.min(
        10,
        filteredArticles.length -
          mostViewedArticles.length -
          editorsPicks.length
      )
    );

  // Settings for react-slick
  const settings = {
    dots: true, // Enable pagination dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true, // Enable navigation arrows
  };

  return (
    <>
      {/* Carousel */}
      <Carousel articles={swiperArticles} />

      {/* Most Viewed and Editor's Picks */}

      <section className="bg-gray-100 py-10 lg:mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Editors Picks Section */}
            <div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                Editors Picks
              </h3>
              {editorsPicks.slice(0, 5).map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Most Viewed Section */}
            <div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                Most Viewed
              </h3>
              {mostViewedArticles.slice(0, 5).map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, updatedAt: published } = article.attributes;
  const imageUrl = article.attributes.image?.data?.attributes?.url;

  return (
    <Link
      href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
      className="mb-8 block w-full"
    >
      <div className="flex flex-wrap items-center">
        <div className="w-full lg:w-6/12 xl:w-6/12  lg:mb-0">
          <Image
            src={imageUrl}
            alt={title}
            className="rounded-md object-cover h-[200px] w-full"
            width={600}
            height={400}
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-6/12">
          <div className="pl-4">
            <span className="text-sm text-gray-600">
              {formatDate(published)}
            </span>
            <h1 className="mb-2 text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300 ">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};
