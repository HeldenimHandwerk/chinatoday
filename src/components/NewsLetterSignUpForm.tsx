"use client";

// pages/SubscribePage.tsx
import { HiOutlineMail } from "react-icons/hi";
import { sendemail } from "../app/action";
import { useState } from "react";

export default function SubscribePage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    sendemail(formData)
      .then((response) => {
        setMessage(response.message || "");
        setEmail("");
      })
      .catch((error) => {
        setMessage(error.message || "An error occurred");
      });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full lg:w-1/2 px-4 mb-5">
          <h3 className="text-2xl font-bold text-black sm:text-[28px] sm:leading-snug">
            Signup for latest news and insights from China today
          </h3>
        </div>
        <div className="w-full lg:w-1/2 px-4">
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
                onChange={(e) => setEmail(e.target.value)}
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
              className="mb-3 h-[52px] rounded-md border border-transparent px-7 font-medium hover:bg-opacity-90 border-gray-5 hover:border-gray-400 focus:outline-none focus-visible:shadow-none py-2 bg-red-600 hover:bg-red-700 text-white transition duration-300 ease-in-out shadow"
            >
              Subscribe
            </button>
            <div>{message}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
