import React from 'react'
import Image from 'next/image'
import { HiOutlineMail } from 'react-icons/hi'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import logo from '../../../public/images/logo.png'
import NewsLetterSignUpForm from './NewsLetterSignUpForm'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      {/* Signup Section */}
      <NewsLetterSignUpForm />
      <div className="container flex-grow border-t border-gray-400"></div>

      {/* Links and Info */}
      <div className="container mx-auto pt-2 ">
        <div className="flex flex-wrap justify-between">
          <div className="mb-10 w-full px-4 lg:w-3/12">
            <div className="w-40 max-w-full">
              <Link
                title="China today image"
                href="/#"
                className="block py-5 lg:py-3"
              >
                <Image
                  src={logo}
                  alt="China Today Logo"
                  width={500}
                  height={500}
                  className="h-full w-full"
                />
              </Link>

              {/* Social Icons */}
              <div className="flex items-center justify-center">
                <Link
                  aira-label="instagram"
                  title="Instagram China today"
                  href="https://www.instagram.com/china.heute?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:text-[#E1306C]"
                >
                  <FaInstagram size="25px" />
                </Link>
                <Link
                  aria-label="Facebook"
                  title="Facebook China today"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/people/China-Today/61556889812221/?is_tour_completed=false"
                  className="px-3 text-black hover:text-blue-700"
                >
                  <FaFacebook size="25px" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-10 flex w-full flex-col px-4 lg:w-4/12">
            <h4 className="mb-9 text-lg font-semibold text-black">
              Kategorien
            </h4>
            <div className="grid grid-cols-2">
              <ul className="w-full">
                <NavLink link="/kategorien/poltik" label="Politik" />
                <NavLink link="/kategorien/wirtschaft" label="Wirtschaft" />
              </ul>
              <ul className="w-full">
                <NavLink link="/kategorien/kultur" label="Kultur" />
                <NavLink link="/kategorien/technologie" label="Technologie" />
              </ul>
            </div>
          </div>

          <div className="w-full px-4 sm:w-full md:w-1/2 lg:w-3/12">
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 bg-red-700 py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <p className="text-base text-white">
            &copy; {new Date().getFullYear()} China Today
          </p>
          <div className="flex space-x-3">
            <BottomNavLink link="/impressum" label="Impressum" />
            <BottomNavLink link="/datenschutz" label="Datenschutzerklärung" />
          </div>
        </div>
      </div>
    </footer>
  )
}

type NavLinkProps = { label: string; link: string }

const NavLink = ({ label, link }: NavLinkProps) => {
  return (
    <li>
      <Link
        title={label}
        href={link}
        className="inline-block text-base leading-loose text-black/70 underline-offset-2 hover:text-black hover:underline"
      >
        {label}
      </Link>
    </li>
  )
}

const ContactInfo: React.FC = () => {
  return (
    <div className="mb-6 lg:mb-0">
      <h4 className="mb-10 text-lg font-semibold">Kontakt & Hilfe</h4>
      <ul>
        <li className="mb-2 flex items-center">
          <HiOutlineMail className="mr-2 text-red-700" />
          <span>support@china-today.de</span>
        </li>
      </ul>
    </div>
  )
}

type BottomNavLinkProps = {
  label: string
  link: string
}

const BottomNavLink = ({ label, link }: BottomNavLinkProps) => {
  return (
    <Link
      title={label}
      href={link}
      className="px-3 text-sm text-white hover:text-black sm:text-base"
    >
      {label}
    </Link>
  )
}

export default Footer
