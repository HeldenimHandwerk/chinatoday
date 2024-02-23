'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Article } from '@/app/types/Article'
import Image from 'next/image'
import Link from 'next/link'

const settings = {
  dots: true, // Enable pagination dots
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  arrows: true // Enable navigation arrows
}

type CarouselProps = {
  articles: Article[]
}

export default function Carousel({ articles }: CarouselProps) {
  return (
    <section className="bg-gray-200 py-10">
      <div className="container mx-auto h-[300px] w-full md:h-[500px] ">
        {' '}
        {/* Added padding on sides */}
        <Slider {...settings}>
          {articles.map((article: Article) => (
            <div key={article.id} className=" h-[300px] md:h-[500px]">
              <Link
                href={`/kategorien/${article.attributes.collection.data.attributes.slug}/${article.attributes.slug}`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={article?.attributes?.image?.data?.attributes?.url}
                    alt={
                      article.attributes.image?.data?.attributes
                        ?.alternativeText || article.attributes.title
                    }
                    fill
                    className="rounded-md object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                    <h1 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-red-400">
                      {article?.attributes?.title}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
