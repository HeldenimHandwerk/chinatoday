import Header from './utils/Header'
import BentoArticles from './homeComponents/BentoArticles'
import CategoryFeatures from './homeComponents/categoryFeatures'
import Footer from './utils/Footer'

export default function Home() {
  const collections = [
    'Politik',
    'Wirtschaft',
    'Kultur',
    'Greenenergy',
    'Mobilität',
    'Reisen',
    'Sport'
  ]
  return (
    <main>
      <BentoArticles />
      {collections.map((collection, index) => (
        <CategoryFeatures key={index} collection={collection} />
      ))}
    </main>
  )
}
