import Header from "../components/Header";
import ArticlesServerComponent from "./ArticlesServerComponent";
import CategoryFeatures from "./categoryFeatures";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main>
      <Header />
      <ArticlesServerComponent />
      <CategoryFeatures collection="Politik" />
      <CategoryFeatures collection="Wirtschaft" />
      <CategoryFeatures collection="Kultur" />
      <CategoryFeatures collection="Greenenergy" />
      <CategoryFeatures collection="Mobilität" />
      <CategoryFeatures collection="Reisen" />
      <CategoryFeatures collection="Sport" />
      <Footer />
    </main>
  );
}
