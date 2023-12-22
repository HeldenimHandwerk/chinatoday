import React from "react";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { FaInstagram, FaTiktok, FaYoutube, FaMobileAlt } from "react-icons/fa";
import logo from "../../public/images/logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      {/* Signup Section */}
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <h3 className="text-2xl font-bold text-black sm:text-[28px] sm:leading-snug">
              Signup for latest news and insights from China today
            </h3>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <form className="flex flex-wrap">
              <div className="relative mb-3 mr-5 w-full max-w-[370px]">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-[52px] w-full rounded-md border border-red-600 bg-white/5 pl-14 pr-5 text-black  outline-none  focus-visible:shadow-none"
                />
                <label className="absolute left-5 top-1/2 -translate-y-1/2">
                  <HiOutlineMail size="25px" />
                </label>
              </div>
              <button
                type="submit"
                className="mb-3 h-[52px] rounded-md border border-transparent  px-7 font-medium  hover:bg-opacity-90 border-gray-5 hover:border-gray-400 focus:outline-none focus-visible:shadow-none py-2  bg-red-600 hover:bg-red-700 text-white transition duration-300 ease-in-out  shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container flex-grow border-t border-gray-400"></div>

      {/* Links and Info */}
      <div className="container mx-auto pt-2 ">
        <div className="flex flex-wrap justify-between">
          <div className="w-full px-4 lg:w-3/12 mb-10">
            <div className="w-40 max-w-full">
              <a href="/#" className="block py-5 lg:py-3">
                <Image
                  src={logo}
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </a>

              {/* Social Icons */}
              <div className="flex items-center">
                <a href="/#" className="px-3 text-black hover:text-gray-700">
                  <FaInstagram size="25px" />
                </a>
                <a href="/#" className="px-3 text-black hover:text-gray-700">
                  <FaTiktok size="25px" />
                </a>
                <a href="/#" className="px-3 text-black hover:text-gray-700">
                  <FaYoutube size="25px" />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/4 lg:w-2/12 mb-10 whitespace-nowrap">
            <LinkGroup header="Company">
              <NavLink link="/#" label="About company" />
              <NavLink link="/#" label="Company services" />
              <NavLink link="/#" label="Job opportunities" />
              <NavLink link="/#" label="Creative people" />
            </LinkGroup>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/4 lg:w-2/12 mb-10 whitespace-nowrap">
            <LinkGroup header="Customer">
              <NavLink link="/#" label="Client support" />
              <NavLink link="/#" label="Latest news" />
              <NavLink link="/#" label="Company story" />
              <NavLink link="/#" label="Pricing packages" />
            </LinkGroup>
          </div>
          <div className="w-full px-4 sm:w-full md:w-1/2 lg:w-3/12">
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 bg-red-600 py-8">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <p className="text-base text-white">
            &copy; {new Date().getFullYear()} China Today
          </p>
          <div className="flex space-x-3">
            <BottomNavLink link="/#" label="Privacy policy" />
            <BottomNavLink link="/#" label="Legal notice" />
            <BottomNavLink link="/#" label="Terms of service" />
          </div>
        </div>
      </div>
    </footer>
  );
};

type LinkGroupProps = { children: React.ReactNode; header: string };

const LinkGroup = ({ children, header }: LinkGroupProps) => {
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-3/12 2xl:w-2/12">
      <div className="mb-10 w-full">
        <h4 className="mb-9 text-lg font-semibold text-black"> {header} </h4>
        <ul className="space-y-3">{children}</ul>
      </div>
    </div>
  );
};

type NavLinkProps = { label: string; link: string };

const NavLink = ({ label, link }: NavLinkProps) => {
  return (
    <li>
      <a
        href={link}
        className="inline-block text-base leading-loose text-black/70 underline-offset-2 hover:text-black hover:underline"
      >
        {label}
      </a>
    </li>
  );
};

const ContactInfo = () => {
  return (
    <div className="mb-6 lg:mb-0">
      <h4 className="text-lg font-semibold mb-3">Contact Info</h4>
      <ul>
        <li className="flex items-center mb-2">
          <HiOutlineMail className="text-red-600 mr-2" />
          <span>info@yourmail.com</span>
        </li>
        {/* <li className="flex items-center">
          <FaMobileAlt className="text-red-600 mr-2" />
          <span>401 Broadway, 24th Floor, London</span>
        </li> */}
      </ul>
    </div>
  );
};

type BottomNavLinkProps = {
  label: string;
  link: string;
};

const BottomNavLink = ({ label, link }: BottomNavLinkProps) => {
  return (
    <a
      href={link}
      className="px-3 sm:text-base text-sm text-gray-7 hover:text-black"
    >
      {label}
    </a>
  );
};

export default Footer;
