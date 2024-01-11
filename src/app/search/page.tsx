"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";
import Discover from "../[category]/components/Discovery";

const SearchIndexPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex flex-1 container mx-auto py-10 items-center justify-center">
        <div className="w-full max-w-lg">
          <form
            className="relative flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/search/${query}`;
            }}
          >
            <input
              type="text"
              placeholder="Search here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-black placeholder-gray-400 outline-none focus:border-gray-400 focus-visible:shadow-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchIndexPage;
