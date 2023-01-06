/* eslint-disable @next/next/no-img-element */
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-slate-800">
      <div className="mx-auto w-[90%] max-w-[1440px] py-16">
        <div className="flex gap-16 justify-between flex-wrap">
          <div>
            <img
              src="/horizontal-white.svg"
              alt=""
              className="w-[175px] block mb-6"
            />
            <p className="text-gray-400 max-w-[34ch] mb-8">
              Shop the latest styles at our apparel store! From trendy tops to
              stylish bottoms, we have the perfect outfits for every occasion.
            </p>
            <ul className="flex items-center gap-4 text-gray-400">
              <li>
                <Link href="/">
                  <BsFacebook className="text-xl hover:text-violet-600 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <AiOutlineInstagram className="text-2xl hover:text-violet-600 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <AiOutlineTwitter className="text-2xl hover:text-violet-600 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <AiFillGithub className="text-2xl hover:text-violet-600 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="text-white font-semibold mb-1 md:mb-3">Company</h3>
              <ul>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1 md:mb-3">Legal</h3>

              <ul>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Claim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-violet-600"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-2 md:mb-4">
              Subscribe to our newsletter!
            </h2>
            <p className="text-gray-400 max-w-[42ch] mb-4">
              Sign up for our newsletter to receive updates, promotions, and
              more delivered straight to your inbox.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter your email address"
                className="block w-full px-5 py-2 outline-none focus:ring-1 focus:ring-white rounded text-sm"
              />
              <button
                type="button"
                className="rounded px-5 py-2 text-white bg-violet-600 hover:bg-violet-700 transition-colors text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-t-slate-600 pt-8 mt-12">
          <p className="text-center text-gray-400 text-sm">
            Copyright @2022 stylewise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
