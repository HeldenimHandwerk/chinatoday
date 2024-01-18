import Header from "../components/Header";
import BentoArticles from "./homeComponents/BentoArticles";
import CategoryFeatures from "./homeComponents/categoryFeatures";
import Footer from "../components/Footer";

export default function Home() {
  const collections = [
    "Politik",
    "Wirtschaft",
    "Kultur",
    "Greenenergy",
    "Mobilität",
    "Reisen",
    "Sport",
  ];
  return (
    <main>
      <Header />
      <BentoArticles />
      {collections.map((collection, index) => (
        <CategoryFeatures key={index} collection={collection} />
      ))}
      <Footer />
    </main>
  );
}
