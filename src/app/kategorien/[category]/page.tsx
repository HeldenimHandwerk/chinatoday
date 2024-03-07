import React, { Suspense } from 'react'
import { fetchCollectionArticles } from '@/app/action'
import MostViewed from './components/MostViewed'
import CategoryArticlesLayout from './components/CategoryArticlesLayout'
import Discovery from './components/Discovery'
import type { Metadata } from 'next'
import Archive from './components/Archive'

interface Props {
  params: {
    category: string
  }
}

async function fetchArticles(collection: string) {
  const articles = await fetchCollectionArticles(collection)

  return articles
}

export const generateMetadata = async ({
  params: { category }
}: {
  params: { category: string }
}): Promise<Metadata> => {
  let title = ''
  let description = ''

  switch (category) {
    case 'gesellschaft':
      title = 'Gesellschaftliche Entwicklungen in China - China Today'
      description =
        'Erfahren Sie mehr über gesellschaftliche Veränderungen und soziale Trends in China. China Today bietet Ihnen exklusive Einblicke und Analysen zur chinesischen Gesellschaft, zu aktuellen Themen und zur Entwicklung der Lebensweise in China.'
      break
    case 'kultur':
      title = 'Chinesische Kultur und Traditionen - China Today'
      description =
        'Tauchen Sie ein in die reiche Kultur Chinas mit China Today. Entdecken Sie die Traditionen, die Kunstszene, historische Erkenntnisse und die vielfältige kulturelle Landschaft Chinas. Bleiben Sie auf dem Laufenden über Kulturereignisse und Festivals.'
      break
    case 'mobilitaet':
      title = 'Mobilität und Verkehr in China - China Today'
      description =
        'Informieren Sie sich über die neuesten Trends in der Mobilität und im Verkehrswesen Chinas mit China Today. Von urbaner Verkehrsplanung bis hin zu Innovationen im öffentlichen Nahverkehr, erhalten Sie Einblicke in die Mobilitätsrevolution Chinas.'
      break
    case 'politik':
      title = 'Politische Entwicklungen in China - China Today'
      description =
        'Verfolgen Sie mit China Today die aktuellsten politischen Entwicklungen in China. Wir bieten fundierte Analysen zur Innen- und Außenpolitik Chinas, zu politischen Entscheidungen und deren Auswirkungen auf die Weltbühne.'
      break
    case 'reisen':
      title = 'Reisen in China - Entdecken Sie mit China Today'
      description =
        'Entdecken Sie die Schönheit Chinas mit China Today. Finden Sie die besten Reisetipps, verborgene Schätze und kulturelle Highlights für Ihr nächstes Abenteuer in China. Von Metropolen bis zu ländlichen Wundern, China wartet darauf, von Ihnen entdeckt zu werden.'
      break
    case 'sport':
      title = 'Sport in China - Aktuelle Nachrichten und Trends - China Today'
      description =
        'Bleiben Sie auf dem Laufenden über Sportereignisse und Trends in China mit China Today. Erfahren Sie alles über die Leistungen chinesischer Athleten, nationale und internationale Wettkämpfe sowie die Entwicklung verschiedener Sportarten in China.'
      break
    case 'technologie':
      title = 'Technologische Innovationen aus China - China Today'
      description =
        'Erhalten Sie Einblicke in Chinas Technologielandschaft mit China Today. Wir berichten über die neuesten technologischen Durchbrüche, Start-ups, und die Rolle Chinas als globale Tech-Supermacht. Verpassen Sie keine Innovationen aus der Welt der Technologie.'
      break
    case 'wirtschaft':
      title =
        'Wirtschaftsnachrichten aus China - Marktanalysen und Trends - China Today'
      description =
        'China Today ist Ihre Quelle für tiefgreifende Marktanalysen und die neuesten Wirtschaftsnachrichten aus China. Erfahren Sie mehr über Chinas Wirtschaftspolitik, Handelsbeziehungen, und wie sich die chinesische Wirtschaft global positioniert.'
      break
    default:
      title = `China Today - ${category.charAt(0).toUpperCase() + category.slice(1)}`
      description = `Entdecken Sie mit China Today die neuesten Nachrichten und Geschichten in ${category.charAt(0).toUpperCase() + category.slice(1)}. Bleiben Sie informiert über die wichtigsten Trends und Entwicklungen in dieser Kategorie.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://china-today.de/kategorie/${category}`,
      images: {
        url: 'https://www.china-today.de/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.02bcd769.png&w=1080&q=75',
        width: 1200,
        height: 630,
        alt: 'China Today'
      }
    }
  }
}

const Page = async ({ params: { category } }: Props) => {
  const articles = await fetchArticles(category)
  return (
    <div className="h-full bg-[#FAFAFA] text-gray-900">
      <CategoryArticlesLayout articles={articles} />
      <Suspense fallback={<div>Loading...</div>}>
        <MostViewed articles={articles} />
        <Discovery collection={category} />
        <Archive articles={articles} />
      </Suspense>
    </div>
  )
}

export default Page
