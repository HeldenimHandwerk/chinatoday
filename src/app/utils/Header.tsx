'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import { FaInstagram, FaFacebook, FaSearch } from 'react-icons/fa'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Stockticker from './StockTicker'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const categories = [
  { title: 'China today home', name: 'Startseite', link: '/' },
  { name: 'Politik', link: 'kategorien/politik', title: 'Politik China today' },
  {
    name: 'Wirtschaft',
    link: 'kategorien/wirtschaft',
    title: 'Wirtschaft China today'
  },
  { name: 'Kultur', link: 'kategorien/kultur', title: 'Kultur China today' },
  {
    name: 'Technologie',
    link: 'kategorien/technologie',
    title: 'Technologie China today'
  },
  {
    name: 'Gesellschaft',
    link: 'kategorien/gesellschaft',
    title: 'Gesellschaft China today'
  },
  {
    name: 'Mobilität',
    link: 'kategorien/mobilitaet',
    title: 'Mobilität China today'
  },
  { name: 'Sport', link: 'kategorien/sport', title: 'Sport China today' },
  { name: 'Reisen', link: 'kategorien/reisen', title: 'Reisen China today' }
]

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showElements, setShowElements] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [cumulativeScroll, setCumulativeScroll] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [pageName, setPageName] = useState<string>('Startseite')

  const handleSearchChange = (event: FormEvent) => {
    setSearchQuery((event.target as HTMLInputElement).value) // Update the search query state on change
  }

  useEffect(() => {
    let animationFrameId: number
    const scrollThreshold: number = 10 // Adjust this threshold as needed

    const handleScroll = () => {
      const currentScrollY: number = window.scrollY
      const scrollDelta: number = Math.abs(currentScrollY - lastScrollY)
      setCumulativeScroll(prev => prev + scrollDelta)

      if (cumulativeScroll > scrollThreshold || currentScrollY === 0) {
        // Check if at the top of the page
        if (currentScrollY < lastScrollY || currentScrollY === 0) {
          // Added check for currentScrollY === 0
          setShowElements(true)
        } else {
          setShowElements(false)
        }
        setCumulativeScroll(0)
      }

      setLastScrollY(currentScrollY)
    }

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [lastScrollY, cumulativeScroll])

  return (
    <div className="sticky top-0 z-20">
      <header className=" relative flex w-full items-center bg-white shadow-md">
        <div className="container mx-auto flex justify-between px-4">
          {/* Logo */}
          <div className="w-40 max-w-full px-4">
            <Link
              title="China today home"
              href="/#"
              onClick={() => setPageName('Startseite')}
              className="block w-full py-5 lg:py-3"
            >
              <Image
                src={logo}
                alt="China today logo"
                width={500}
                height={500}
                className="h-full w-full"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            {/* Search Bar */}
            <form
              className="relative flex max-w-[230px] lg:max-w-full"
              onSubmit={e => {
                e.preventDefault()
                // Redirect to the search page with the query
                router.push(`/search/${searchQuery}/1`)
              }}
            >
              <input
                type="text"
                placeholder="Suche nach Artikeln..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-12 pr-5 text-black placeholder-gray-400 outline-none focus:border-gray-400 focus-visible:shadow-none"
              />
              <button
                name="search"
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Social Media Icons */}
          <div className="hidden items-center  justify-end md:flex">
            <div className="flex items-center space-x-4">
              <Link
                aira-label="instagram"
                title="Instagram China today"
                href="https://www.instagram.com/china.heute?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-[#E1306C]"
              >
                <FaInstagram size={30} />
              </Link>
              <Link
                aria-label="Facebook"
                title="Facebook China today"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/people/China-Today/61556889812221/?is_tour_completed=false"
                className="px-3 text-black hover:text-blue-700"
              >
                <FaFacebook size={30} />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              name="sidebar toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute inset-x-0 top-[100%] z-20 space-y-5 border border-t-0 bg-white p-4 shadow-lg md:hidden">
              {/* Mobile Search Bar */}
              <form
                className="relative flex  w-full"
                onSubmit={e => {
                  e.preventDefault()
                  // Redirect to the search page with the query
                  router.push(`/search/${searchQuery}/1`)
                  setIsOpen(false)
                }}
              >
                <input
                  type="text"
                  placeholder="Suche nach Artikeln..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-grow rounded border border-gray-300 bg-white py-2 pl-3 pr-5 text-black"
                />
                <button name="search" type="submit" className="ml-2">
                  <FaSearch />
                </button>
              </form>
              <hr className="border-black-2" />

              <ul className="flex flex-col justify-start  space-y-5">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      title={category.title}
                      href={`/${category.link}`}
                      className="text-lg text-black hover:text-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Mobile Social Media Icons */}
              <hr className="border-black-2" />
              <div className="flex flex-row items-center gap-5">
                <Link
                  aira-label="instagram"
                  title="Instagram China today"
                  href="https://www.instagram.com/china.heute?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:text-[#E1306C]"
                >
                  <FaInstagram size={30} />
                </Link>
                <Link
                  aria-label="Facebook"
                  title="Facebook China today"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/people/China-Today/61556889812221/?is_tour_completed=false"
                  className="px-3 text-black hover:text-blue-700"
                >
                  <FaFacebook size={30} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <nav
        className={`hidden bg-gray-100 shadow md:flex ${
          showElements ? 'md:show ' : 'hide'
        }`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center space-x-10 py-4">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  title={category.title + ' - China Today'}
                  href={`/${category.link}`}
                  className={`md:text-md  overflow-hidden rounded-lg p-2 text-black transition  hover:bg-red-400 hover:text-white lg:text-lg ${pageName === category.name ? 'bg-red-400 text-white' : ''}`}
                  onClick={() => {
                    setPageName(category.name)
                  }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Stockticker className={`${showElements ? 'show' : 'hide'}`} />
    </div>
  )
}
