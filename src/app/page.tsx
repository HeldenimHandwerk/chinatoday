import BentoArticles from './homeComponents/BentoArticles'
import CategoryFeatures from './homeComponents/categoryFeatures'

export default function Home() {
  const collections = [
    'politik',
    'wirtschaft',
    'kultur',
    'technologie',
    'mobilitaet',
    'reisen',
    'sport'
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
