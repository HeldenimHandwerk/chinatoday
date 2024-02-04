import React from 'react'
import Image from 'next/image'
import { HiOutlineMail } from 'react-icons/hi'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
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
              <Link href="/#" className="block py-5 lg:py-3">
                <Image
                  src={logo}
                  alt="logo"
                  width={500}
                  height={500}
                  className="h-full w-full"
                />
              </Link>

              {/* Social Icons */}
              <div className="flex items-center">
                <Link href="/#" className="px-3 text-black hover:text-gray-700">
                  <FaInstagram size="25px" />
                </Link>
                <Link href="/#" className="px-3 text-black hover:text-gray-700">
                  <FaTiktok size="25px" />
                </Link>
                <Link href="/#" className="px-3 text-black hover:text-gray-700">
                  <FaYoutube size="25px" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-10 flex w-full flex-col px-4 lg:w-4/12">
            <h4 className="mb-9 text-lg font-semibold text-black">
              kategorien
            </h4>
            <div className="grid grid-cols-2">
              <div className="w-full">
                <NavLink link="/kategorien/poltik" label="Politik" />
                <NavLink link="/kategorien/wirtschaft" label="Wirtschaft" />
                <NavLink link="/kategorien/kultur" label="Kultur" />
                <NavLink link="/kategorien/greenenergy" label="Greenenergy" />
              </div>
              <div className="w-full">
                <NavLink link="/kategorien/mobilitaet" label="Mobilität" />
                <NavLink link="/kategorien/sport" label="Sport" />
                <NavLink link="/kategorien/reisen" label="Reisen" />
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:w-full md:w-1/2 lg:w-3/12">
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 bg-red-600 py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <p className="text-base text-white">
            &copy; {new Date().getFullYear()} China Today
          </p>
          <div className="flex space-x-3">
            <BottomNavLink link="/#" label="Impressum" />
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
          <HiOutlineMail className="mr-2 text-red-600" />
          <span>info@yourmail.com</span>
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
      href={link}
      className="px-3 text-sm text-gray-7 hover:text-black sm:text-base"
    >
      {label}
    </Link>
  )
}

export default Footer
