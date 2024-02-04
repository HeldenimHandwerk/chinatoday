'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import { FaInstagram, FaTiktok, FaYoutube, FaSearch } from 'react-icons/fa'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Stockticker from './StockTicker'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const categories = [
  { name: 'Home', link: '/' },
  { name: 'Politik', link: 'kategorien/politik' },
  { name: 'Wirtschaft', link: 'kategorien/wirtschaft' },
  { name: 'Kultur', link: 'kategorien/kultur' },
  { name: 'Greenenergy', link: 'kategorien/greenenergy' },
  { name: 'Mobilität', link: 'kategorien/mobilitaet' },
  { name: 'Sport', link: 'kategorien/sport' },
  { name: 'Reisen', link: 'kategorien/reisen' }
]

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showElements, setShowElements] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [cumulativeScroll, setCumulativeScroll] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')

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
            <Link href="/#" className="block w-full py-5 lg:py-3">
              <Image
                src={logo}
                alt="logo"
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
                placeholder="Search here..."
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
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-[#E1306C]" // Change the hover color here
              >
                <FaInstagram size={24} />
              </Link>

              <Link
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700"
              >
                <FaTiktok size={24} />
              </Link>
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600"
              >
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
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
                className="mb-4 flex"
                onSubmit={e => {
                  e.preventDefault()
                  // Redirect to the search page with the query
                  router.push(`/search/${searchQuery}/1`)
                }}
              >
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-grow rounded border border-gray-300 bg-white py-2 pl-3 pr-5 text-black"
                />
                <button name="search" type="submit" className="ml-2">
                  <FaSearch />
                </button>
              </form>

              <ul className="flex flex-col justify-start  space-y-5">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/${category.link}`}
                      className="text-lg text-black hover:text-gray-700"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Mobile Social Media Icons */}
              <div className="flex flex-row items-center gap-5">
                <Link
                  href="https://www.instagram.com/china-today"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700"
                >
                  <FaInstagram size={24} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@china-today"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700"
                >
                  <FaTiktok size={24} />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/china-today"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700"
                >
                  <FaYoutube size={24} />
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
                  href={`/${category.link}`}
                  className=" md:text-md overflow-hidden text-black transition hover:border-b-2 hover:border-black lg:text-lg"
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
