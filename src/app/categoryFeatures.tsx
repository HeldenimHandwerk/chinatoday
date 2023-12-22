import Image from "next/image";
import Link from "next/link";
import { Key } from "react";
type Article = {
  slug: string;
  id: number;
  attributes: {
    title: string;
    text: string;
    image: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    CategoryBreaking: boolean;
  };
};

async function fetchArticles(collection: string) {
  const response = await fetch(
    `https://jellyfish-app-qw7fr.ondigitalocean.app/api/collections?populate[articles][populate]=*&filters[name][$eq]=${collection}&sort=updatedAt:desc`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const jsonData = await response.json();
  const articles = jsonData.data[0].attributes.articles.data;

  var filteredArticles = articles.filter(
    (article: Article) => article.attributes.CategoryBreaking === true
  );
  // Check the length after filtering
  if (filteredArticles.length > 4) {
    // Assuming the last one in filteredArticles is the oldest
    const oldestArticle = filteredArticles[0];
    await updateOldestArticle(oldestArticle); // Now awaited
    filteredArticles.pop(); // Remove the oldest article from the array
  }

  return filteredArticles.slice(0, 4); // Return up to 4 articles
}

const updateOldestArticle = async (oldestArticle: Article) => {
  // Make an API request to update the 'Breaking' status of the oldest article.
  const response = await fetch(
    `https://jellyfish-app-qw7fr.ondigitalocean.app/api/articles/${oldestArticle.id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: { CategoryBreaking: false },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
};

export default async function CategoryFeatures({
  collection,
}: {
  collection: string;
}) {
  const articles = await fetchArticles(collection);
  return (
    <div className="container mx-auto p-6 bg-gray-100 mb-8 rounded-lg shadow-sm corner-border">
      <div className="flex justify-between items-center mb-4 p-4 bg-red-200 text-red-800 rounded-lg shadow">
        <span className="font-bold text-xl uppercase">{collection}</span>
        <Link
          href={`/categories/${collection.toLowerCase()}`}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white transition duration-300 ease-in-out rounded-full shadow"
        >
          Mehr Lesen
        </Link>
      </div>
      {/* Large Image with Text Overlay */}
      {articles.length > 0 && (
        <div className="relative w-full h-80 mb-8 rounded-lg shadow-lg">
          {" "}
          {/* Enhanced shadow */}
          <div className="absolute inset-0 overflow-hidden 6 w-full group-hover:scale-105 transition-all duration-500 opacity-100">
            <Image
              src={articles[0].attributes.image?.data?.attributes?.url}
              alt={articles[0].attributes.title}
              width={articles[0].attributes.image?.data?.attributes?.width}
              height={articles[0].attributes.image?.data?.attributes?.height}
              className="w-full h-full object-cover hover:scale-105 transition-all duration-500 opacity-100"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg ">
            <h2 className="text-2xl font-bold text-white mb-2">
              {articles[0].attributes.title}
            </h2>
            <p className="text-white truncate-3-lines">
              {articles[0].attributes.text}
            </p>
          </div>
        </div>
      )}
      {/* Grid of Smaller Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.slice(1, 4).map((article: Article, index: Key) => (
          <Link
            href={`/articles/${article.slug}`}
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow transform hover:scale-105 transition duration-300 flex flex-col"
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
            <div className="p-4 flex-grow flex flex-col justify-between">
              <h1 className="text-2xl sm:text-lg font-bold text-black leading-tight mb-2 ">
                {article.attributes.title}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg truncate-3-lines leading-relaxed shadow-md">
                {article.attributes.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
