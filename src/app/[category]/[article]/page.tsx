import fetchArticles from "../../helpers/fetch-articles";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import fetchCollectionArticles from "@/app/helpers/fetch-collectionArticles";
import picture from "../../../../public/images/Aldi-Banner.jpg";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/app/types/Article";
import TextToSpeechButton from "./TextToSpeechButton";

interface Props {
  params: {
    article: string;
  };
}

const AdImage = () => {
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
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const Page: React.FC<Props> = async ({ params: { article } }) => {
  const articleResponse = await fetchArticles(`filters[slug][$eq]=${article}`);
  const articleCategory =
    articleResponse[0]?.attributes.collection.data.attributes.name;
  const fetchrelated = await fetchCollectionArticles(articleCategory);
  const relatedArticles: Article[] = fetchrelated.slice(0, 3);

  const { title, text, image, updatedAt } = articleResponse[0]?.attributes;

  //format the date
  const formattedDate = formatDate(updatedAt);

  const insertAdsBasedOnLength = (text: string) => {
    const sentenceEndRegex = /\. [A-Z]/;
    const findNextSentenceEnd = (text: string, startIndex: number): number => {
      const match = sentenceEndRegex.exec(text.slice(startIndex));
      return match ? startIndex + match.index + 1 : text.length;
    };

    const createTextElement = (key: string, text: string) => (
      <h3 key={key} className="text-base leading-relaxed my-4">
        {text}
      </h3>
    );

    const elements: React.ReactNode[] = [];
    const totalLength = text.length;
    let lastIndex = 0;
    let adIndex = 1;

    // Insert the first sentence as a title
    const firstSentenceEnd = findNextSentenceEnd(text, 0);
    elements.push(createTextElement("title", text.slice(0, firstSentenceEnd)));
    lastIndex = firstSentenceEnd;

    // Define positions for ads
    const adPositions = totalLength > 2000 ? [0.3, 0.6] : [0.5];

    adPositions.forEach((percentage) => {
      const position = Math.floor(totalLength * percentage);
      const nextSentenceEnd = findNextSentenceEnd(text, position);

      // Add text before the ad
      elements.push(
        createTextElement(
          `text-${adIndex}`,
          text.slice(lastIndex, nextSentenceEnd)
        )
      );
      // Add the ad
      elements.push(<AdImage key={`ad-${adIndex}`} />);

      lastIndex = nextSentenceEnd;
      adIndex++;
    });

    // Add any remaining text after the last ad
    if (lastIndex < totalLength) {
      elements.push(createTextElement("text-end", text.slice(lastIndex)));
    }

    return elements;
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto my-5 p-6 bg-gray-100 mb-8 rounded-md shadow-sm ">
        <div className="mb-8">
          {image && (
            <div className="relative w-full h-[450px] mb-8 rounded-lg shadow-lg">
              <Image
                src={image?.data?.attributes?.url}
                alt={title}
                width={image?.data?.attributes?.width}
                height={image?.data?.attributes?.height}
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 rounded-b-lg">
                <h3>
                  <span className="text-white text-sm">
                    Published: {formattedDate}
                  </span>
                </h3>
                <h1 className="md:text-5xl text-3xl font-bold text-white sm:p-5 flex justify-center items-center">
                  {title}
                </h1>
              </div>
            </div>
          )}
          <TextToSpeechButton text={text} />

          {!image && (
            <div className="mb-4 p-4 bg-red-200 text-red-800 rounded-lg shadow">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          )}

          <div className="container text-lg text-gray-700 leading-relaxed mb-6 lg:w-[60vw] md:w-[70vw] mx-auto ">
            {insertAdsBasedOnLength(text)}
          </div>

          <section className="related-articles mt-10">
            <h2 className="text-4xl font-semibold mb-4 shadow-lg bg-red-200 text-red-800 rounded-md p-3">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4 ">
              {relatedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  style={undefined}
                />
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
