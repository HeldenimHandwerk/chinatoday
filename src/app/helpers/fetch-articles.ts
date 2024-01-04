import { Article } from "../types/Article";
const fetchArticles = async (filters: string): Promise<Article[]> => {
  const response = await fetch(
    `https://jellyfish-app-qw7fr.ondigitalocean.app/api/articles?populate=*&sort=updatedAt:desc&${filters}`,
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
  var articles = jsonData.data;
  return articles;
};

export default fetchArticles;
