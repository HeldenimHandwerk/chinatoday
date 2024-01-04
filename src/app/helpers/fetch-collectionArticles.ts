import { Article } from "../types/Article";

const fetchCollectionArticles = async (
  collection: string
): Promise<Article[]> => {
  try {
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
      throw new Error(`Error fetching articles: ${response.status}`);
    }

    const jsonData = await response.json();
    const articles = jsonData.data[0]?.attributes.articles.data;
    return articles || []; // Return an empty array if articles is undefined
  } catch (error) {
    console.error("Error in fetchCollectionArticles:", error);
    return []; // Return an empty array in case of error
  }
};

export default fetchCollectionArticles;
