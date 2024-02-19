'use client'

// pages/SubscribePage.tsx
import { HiOutlineMail } from 'react-icons/hi'
import { sendemail } from '../action'
import { useState } from 'react'

export default function SubscribePage() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    sendemail(formData)
      .then(response => {
        setMessage(response.message || '')
        setEmail('')
      })
      .catch(error => {
        setMessage(error.message || 'An error occurred')
      })
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center justify-center">
        <div className="mb-5 w-full px-4 lg:w-1/2">
          <h3 className="text-2xl font-bold text-black sm:text-[28px] sm:leading-snug">
            Melden Sie sich für die neuesten Nachrichten und Einblicke aus
            Chinatoday an{' '}
          </h3>
        </div>
        <div className="w-full px-4 lg:w-1/2">
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
            <div className="relative mb-3 mr-5 w-full max-w-[370px]">
              <input
                type="email"
                name="email"
                id="email-input"
                placeholder="Enter your email address"
                className="h-[52px] w-full rounded-md border border-red-600 bg-white/5 pl-14 pr-5 text-black  outline-none  focus-visible:shadow-none"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
              />
              <label className="absolute left-5 top-1/2 -translate-y-1/2">
                <HiOutlineMail size="25px" />
              </label>
            </div>

            <button
              type="submit"
              value=""
              name="subscribe"
              className="mb-3 h-[52px] rounded-md border border-gray-5 border-transparent bg-red-600 px-7 py-2 font-medium text-white shadow transition duration-300 ease-in-out hover:border-gray-400 hover:bg-red-700 hover:bg-opacity-90 focus:outline-none focus-visible:shadow-none"
            >
              Subscribe
            </button>
            <div>{message}</div>
          </form>
        </div>
      </div>
    </div>
  )
}
