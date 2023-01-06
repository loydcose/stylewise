/* eslint-disable @next/next/no-html-link-for-pages */
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import HeadDocument from "../../components/HeadDocument"
import MainLayout from "../../components/MainLayout"
import Promo from "../../components/Promo"
import Item from "../../components/Item"
import axios from "axios"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import uppercase from "../../utils/uppercase"
import getSession from "../../utils/getSession"
import CartQtyContext from "../../context/CartQty"
import useFilters from "../../hooks/useFilters"
import getApiUrl from "../../getApiUrl"

export async function getServerSideProps({ query, req, res }) {
  // verify user with unstable_getServerSession
  const session = await getSession(req, res)

  const API_URL = getApiUrl()
  const category = query.category
  const search = query.search
  let rawProducts = null

  // fetch for categories
  const response = await axios.get(`${API_URL}/api/products/categories`)
  const categories = response.data.map((item) => item[0])

  // product filters
  if (category) {
    // category query
    const response = await axios.get(
      `${API_URL}/api/products?category=${category}`
    )
    rawProducts = response.data
  } else if (search) {
    // search query
    const response = await axios.get(`${API_URL}/api/products?search=${search}`)
    rawProducts = response.data
  } else {
    // default to all item
    const response = await axios.get(`${API_URL}/api/products`)
    rawProducts = response.data
  }

  return {
    props: {
      rawProducts,
      categories,
      data: JSON.parse(JSON.stringify(session)),
    },
  }
}

const Products = ({ rawProducts, categories, data: session }) => {
  const router = useRouter()
  const categoryQuery = router.query.category
  const [search, setSearch] = useState("")

  // handles cart items quantity in the navbar
  const { cartQty, fetchCartQty } = useContext(CartQtyContext)
  if (session) fetchCartQty(session.id)

  // custom hooks that handles all filters, sort etc.
  const [products, handleFilter] = useFilters(rawProducts)

  const handleSearch = (e) => {
    e.preventDefault()
    window.location.replace(`/products?search=${search}`)
  }

  // styles for active and inactive category buttons
  const activeStyle = "bg-violet-600 text-white"
  const inactiveStyle = "hover:bg-gray-100 text-slate-700 ring-1 ring-gray-200"

  return (
    <>
      <HeadDocument title="Stylewise | Products" />
      <Promo />
      <Navbar quantity={cartQty} />
      <MainLayout>
        <section className="py-16 md:py-28">
          <h2 className="text-2xl tracking-tight font-extrabold mb-4">
            Products
          </h2>
          <div>
            <form
              className="flex items-center gap-2 mb-4"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search item"
                className="text-sm ring-1 ring-gray-200 focus:ring-violet-600 outline-none block w-full max-w-[400px] px-5 py-2 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="rounded py-2 px-5 bg-violet-600 text-white text-sm"
              >
                Search
              </button>
            </form>
            <ul className="flex items-center gap-3 mb-4 overflow-x-auto py-2 ">
              <li>
                <a
                  href="/products"
                  className={`rounded py-2 px-5 transition-colors text-sm ${
                    !categoryQuery ? activeStyle : inactiveStyle
                  }`}
                >
                  All
                </a>
              </li>
              {categories.length !== 0 &&
                categories &&
                categories.map((category) => {
                  const isActive = category === categoryQuery
                  return (
                    <li key={category}>
                      <a
                        href={`?category=${category}`}
                        className={`rounded py-2 px-5 transition-colors text-sm ${
                          isActive ? activeStyle : inactiveStyle
                        }`}
                      >
                        {uppercase(category)}
                      </a>
                    </li>
                  )
                })}
            </ul>
            <div>
              <select
                name=""
                id=""
                className="bg-transparent mb-12 text-sm outline-none ring-gray-200 ring-1 focus:ring-violet-600 px-5 py-2 rounded"
                defaultValue={"sort"}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="sort" disabled>
                  Sort by
                </option>
                <option value="asc">Price ↓</option>
                <option value="desc">Price ↑</option>
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
              </select>
            </div>
          </div>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products &&
              products.map((item) => {
                return <Item key={item._id} {...item} />
              })}
          </section>
        </section>
      </MainLayout>
      <Footer />
    </>
  )
}

export default Products
