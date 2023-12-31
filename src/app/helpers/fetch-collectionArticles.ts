async function fetchCollectionArticles(collection: string) {
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
  return articles;
}

export default fetchCollectionArticles;
