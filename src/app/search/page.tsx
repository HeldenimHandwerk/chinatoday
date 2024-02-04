'use client'

import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const SearchIndexPage = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-lg">
          <form
            className="relative flex items-center"
            onSubmit={e => {
              e.preventDefault()
              // Redirect to the search page with the query
              router.push(`/search/${query}/1`)
            }}
          >
            <input
              type="text"
              placeholder="Search here..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 outline-none focus:border-gray-400 focus-visible:shadow-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchIndexPage
