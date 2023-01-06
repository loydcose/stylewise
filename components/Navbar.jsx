/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useState } from "react"
import { HiOutlineMenuAlt4 } from "react-icons/hi"
import { BsHandbag } from "react-icons/bs"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Navbar({ quantity }) {
  const [showMenu, setShowMenu] = useState(false)
  const { data: session, status } = useSession()

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className="flex relative item-center border-b border-slate-200 py-4 max-w-[1026px] mx-auto w-[90%]">
      <Link href="/" className="text-violet-600 mr-6">
        <img src="/icon.svg" alt="" className="w-7 h-7" />
      </Link>
      <ul className="items-center gap-6 hidden md:flex">
        <Categories />
      </ul>
      <div className="hidden items-center gap-4 ml-auto md:flex">
        {status === "authenticated" ? (
          <button
            type="button"
            className="text-sm hover:text-violet-600 transition-colors"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="text-sm hover:text-violet-600 transition-colors"
            >
              Sign in
            </Link>
            <span className="border-r border-slate-200 h-full"></span>
            <Link
              href="/auth/signup"
              className="text-sm hover:text-violet-600 transition-colors"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
      <Link href="/cart" className="md:ml-16 flex items-center ml-auto gap-1">
        <BsHandbag className="text-xl text-slate-600 hover:text-violet-600 transition-colors" />
        <span>{quantity || 0}</span>
      </Link>
      <button
        type="button"
        className="ml-4 flex items-center md:hidden"
        onClick={handleMenu}
      >
        <HiOutlineMenuAlt4 className="text-2xl text-slate-600 hover:text-violet-600 transition-colors" />
      </button>

      {/* MENU */}
      <ul
        className={`${
          showMenu ? "block" : "hidden"
        } absolute md:hidden top-full left-0 right-0 border bg-white p-5 rounded z-30 shadow-lg`}
      >
        <h2 className="font-bold text-lg tracking-tight mb-2">Categories</h2>
        <Categories />
        <hr className="bg-gray-100 h-[1px] my-4" />
        <div className="flex items-center gap-2">
          {status === "authenticated" ? (
            <button
              type="button"
              className="text-sm text-center bg-violet-600 rounded py-2 w-full text-white hover:bg-violet-700"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-sm text-center bg-violet-600 rounded py-2 w-full text-white hover:bg-violet-700"
              >
                Sign up
              </Link>
              <Link
                href="/auth/signin"
                className="text-sm text-center py-2 w-full rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </ul>
    </nav>
  )
}

function Categories() {
  return (
    <>
      <li>
        <Link
          href="/products?category=men"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Mens
        </Link>
      </li>
      <li>
        <Link
          href="/products?category=women"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Women
        </Link>
      </li>
      <li>
        <Link
          href="/products?category=kids"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Kids
        </Link>
      </li>
      <li>
        <Link
          href="/products?category=baby"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Baby
        </Link>
      </li>
    </>
  )
}
