import fetchArticles from "../../helpers/fetch-articles";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import fetchCollectionArticles from "@/app/helpers/fetch-collectionArticles";
import picture from "../../../../public/images/Aldi-Banner.jpg";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/app/types/Article";

interface Props {
  params: {
    article: string;
  };
}

const AdComponent = () => {
  return (
    <Image
      className="w-full h-92 py-10 object-cover object-center rounded-lg"
      src={picture}
      alt={"www"}
      height={500}
      width={500}
      quality={100}
    />
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${formattedDate} at ${formattedTime}`;
};

const Page: React.FC<Props> = async ({ params: { article } }) => {
  const articleResponse = await fetchArticles(`filters[slug][$eq]=${article}`);
  const articleCategory =
    articleResponse[0].attributes.collection.data.attributes.name;
  const fetchrelated = await fetchCollectionArticles(articleCategory);
  const relatedArticles: Article[] = fetchrelated.slice(0, 3);

  const { title, text, image, updatedAt } = articleResponse[0].attributes;

  //format the date
  const formattedDate = formatDate(updatedAt);

  const insertAdsBasedOnLength = (text: string) => {
    const totalLength = text.length;

    // Regular expression to find sentence endings (period followed by a space and a capital letter)
    const sentenceEndRegex = /\.[A-Z]/;

    // Find the end of the first sentence
    const match = sentenceEndRegex.exec(text);
    // Adjust to exclude the space and the capital letter
    const firstPeriod = match ? match.index : -1;

    if (firstPeriod === -1) {
      return <h2 className="text-2xl font-bold my-4">{text}</h2>;
    }

    let elements = [];

    // Add the first sentence as an h2 element, excluding the space and the capital letter
    elements.push(
      <h2 key="title" className="text-2xl font-bold my-4">
        {text.slice(0, firstPeriod + 1)}
      </h2>
    );

    // Start processing the rest of the text from after the first sentence
    let lastIndex = firstPeriod + 1;
    let adPositions;
    // Positions for ads, e.g., at 30% and 60% of the remaining text
    if (totalLength > 2000) {
      adPositions = [
        Math.floor((totalLength - lastIndex) * 0.3) + lastIndex,
        Math.floor((totalLength - lastIndex) * 0.6) + lastIndex,
      ];
    } else {
      adPositions = [Math.floor((totalLength - lastIndex) * 0.5) + lastIndex];
    }

    for (let position of adPositions) {
      let nextPeriod = text.indexOf(".", position);
      if (nextPeriod === -1 || nextPeriod >= totalLength) {
        nextPeriod = totalLength - 1;
      }

      elements.push(
        <h3
          key={`text-${lastIndex}`}
          className="text-base leading-relaxed my-4"
        >
          {text.slice(lastIndex, nextPeriod + 1)}
        </h3>
      );

      elements.push(<AdComponent key={`ad-${position}`} />);

      lastIndex = nextPeriod + 1;
    }

    if (lastIndex < totalLength) {
      elements.push(
        <h3 key="text-end" className="text-base leading-relaxed my-4">
          {text.slice(lastIndex)}
        </h3>
      );
    }

    return elements;
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto my-5 p-6 bg-gray-100 mb-8 rounded-md shadow-sm corner-border">
        <div className="mb-8">
          {image && (
            <div className="relative w-full h-80 mb-8 rounded-lg shadow-lg">
              <Image
                src={image.data.attributes.url}
                alt={title}
                width={image.data.attributes.width}
                height={image.data.attributes.height}
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
                <h3>
                  <span className="text-white text-sm">
                    Published: {formattedDate}
                  </span>
                </h3>
                <h1 className="text-5xl font-bold text-white mb-2 flex justify-center items-center">
                  {title}
                </h1>
              </div>
            </div>
          )}

          {!image && (
            <div className="mb-4 p-4 bg-red-200 text-red-800 rounded-lg shadow">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          )}

          <div className="text-lg text-gray-700 leading-relaxed mb-6 w-[70vw] mx-auto">
            {insertAdsBasedOnLength(text)}
          </div>

          <section className="related-articles mt-10">
            <h2 className="text-4xl font-semibold mb-4 shadow-lg bg-red-200 text-red-800 rounded-md p-3">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4 ">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <div className="text-center mt-10">
            <Link href="/">
              <div className="py-2 px-4 bg-red-200 hover:bg-red-300 text-red-800 transition duration-300 ease-in-out rounded-full shadow">
                Back to Home
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
