import Image from "next/image";
import { fetchArticles } from "@/app/action";
import Link from "next/link";
import { Article } from "../types/Article";
import formatDate from "@/app/utils/formatDate";

const fetchHomeArticles = async (): Promise<Article[]> => {
  const articles = await fetchArticles(`filters[HeroBreaking][$eq]=true`);

  // Sort articles by 'updatedAt' descending
  articles.sort(
    (a: Article, b: Article) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
  );

  // Identify the old and new headlines
  const headlineArticles = articles.filter(
    (article: { attributes: { Headline: any } }) => article.attributes.Headline
  );

  // If there's more than one headline, update the older one
  if (headlineArticles.length > 1) {
    await updateHeadlineStatus(headlineArticles[1].id); // Remove headline status from the old headline
    headlineArticles[1].attributes.Headline = false; // Update local state
  }

  // Re-sort to ensure the headline is first
  articles.sort(
    (a: Article, b: Article) =>
      Number(b.attributes.Headline) - Number(a.attributes.Headline)
  );

  // Remove the oldest non-headline article if count exceeds 5
  if (articles.length > 6) {
    // Find the oldest non-headline article
    const oldestNonHeadlineIndex = articles
      .slice()
      .reverse()
      .findIndex(
        (article: { attributes: { Headline: any } }) =>
          !article.attributes.Headline
      );
    const actualIndex =
      oldestNonHeadlineIndex >= 0
        ? articles.length - 1 - oldestNonHeadlineIndex
        : -1;
    if (actualIndex !== -1) {
      await updateHeroBreakingStatus(articles[actualIndex].id);
      articles.splice(actualIndex, 1);
    }
  }

  return articles.slice(0, 6); // Return top 5 articles
};

// Update the headline status
const updateHeadlineStatus = async (articleId: number) => {
  const updatedData = { data: { Headline: false } };
  await updateArticle(articleId, updatedData);
};

// Update the HeroBreaking status
const updateHeroBreakingStatus = async (articleId: number) => {
  const updatedData = { data: { HeroBreaking: false, CategoryBreaking: true } };
  await updateArticle(articleId, updatedData);
};

// General function to update an article
const updateArticle = async (articleId: number, updatedData: object) => {
  const response = await fetch(
    `https://jellyfish-app-qw7fr.ondigitalocean.app/api/articles/${articleId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    // You might want to log more details here
    console.error("Failed to update article", response.statusText);
    throw new Error(`Error: ${response.status}`);
  }
};

export default async function BentoArticles() {
  const articles = await fetchHomeArticles();

  return (
    <div className="container mx-auto my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {articles.map((article, index) => (
          <Link
            href={`/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
            key={article.id}
            className={`group relative rounded-lg overflow-hidden shadow-lg ${
              index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
            }`}
            style={{
              minHeight: index === 0 ? "400px" : "230px",
            }}
          >
            <div className="absolute inset-0 overflow-hidden  w-full group-hover:scale-105 transition-all duration-500 ">
              <Image
                src={article.attributes.image?.data?.attributes?.url}
                alt={article.attributes.title}
                width={article.attributes.image?.data?.attributes?.width}
                height={article.attributes.image?.data?.attributes?.height}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500 opacity-90"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent p-6">
              <div className="text-white text-sm">
                {formatDate(article.attributes.updatedAt)}
              </div>
              <h1
                className={`text-xl ${
                  index === 0 ? "sm:text-2xl" : "sm:text-lg"
                } font-bold text-white leading-tight mb-2 shadow-md`}
              >
                {article.attributes.title}
              </h1>
              <h3 className="text-white text-base sm:text-lg truncate leading-relaxed">
                {article.attributes.text}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
