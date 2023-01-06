/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MainLayout from "../components/MainLayout"
import { useContext } from "react"
import HeadDocument from "../components/HeadDocument"
import Link from "next/link"
import HeroImage from "../components/HeroImage"
import CategoryItem from "../components/CategoryItem"
import Item from "../components/Item"
import Promo from "../components/Promo"
import axios from "axios"
import getSession from "../utils/getSession"
import CartQtyContext from "../context/CartQty"
import getApiUrl from "../getApiUrl"

export async function getServerSideProps({ req, res }) {
  // verify user with unstable_getServerSession
  const session = await getSession(req, res)

  // fetch trending items for trending section
  // and categories for categories section
  const API_URL = getApiUrl()
  let responses = []
  try {
    const trendingUrl = `${API_URL}/api/products?limit=8`
    const categoriesUrl = `${API_URL}/api/products/categories`
    responses = await Promise.all([
      axios.get(trendingUrl),
      axios.get(categoriesUrl),
    ])
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      trending: responses[0].data,
      categories: responses[1].data,
      data: JSON.parse(JSON.stringify(session)),
    },
  }
}

const Index = ({ trending, categories, data: session }) => {
  // handles cart items quantity in the navbar
  const { cartQty, fetchCartQty } = useContext(CartQtyContext)
  if (session) fetchCartQty(session.id)

  return (
    <>
      <HeadDocument title="Stylewise" />
      <header className="h-screen flex flex-col isolate">
        <Promo />
        <Navbar quantity={cartQty} />
        <section className="grow">
          <div className="w-[90%] mx-auto max-w-[1026px] h-full flex items-center relative overflow-hidden">
            <div className="w-fit mb-32 z-20">
              <h1 className="text-5xl max-w-[13ch] font-extrabold tracking-tight">
                Summer styles are finally here
              </h1>
              <p className="max-w-md mt-4 text-gray-600">
                Shop the latest styles at our apparel store! From trendy tops to
                stylish bottoms, we have the perfect outfits for every occasion.
              </p>
              <Link
                href="/products"
                className="bg-violet-600 rounded px-6 py-3 hover:bg-violet-700 transition-all text-white text-sm mt-6 block w-fit "
              >
                Shop now
              </Link>
            </div>
            <HeroImage />
          </div>
        </section>
      </header>
      <MainLayout>
        {/* category section */}
        {categories && categories.length !== 0 && (
          <div className="pb-24 md:py-24">
            <h2 className="text-2xl tracking-tight font-extrabold mb-4">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((item) => {
                return (
                  <CategoryItem key={item} category={item[0]} image={item[1]} />
                )
              })}
            </div>
          </div>
        )}

        {/* Trending section */}
        {trending && trending.length !== 0 && (
          <div className="py-24">
            <h2 className="text-2xl tracking-tight font-extrabold mb-4">
              Trending Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trending.map((item) => {
                return <Item key={item._id} {...item} />
              })}
            </div>
          </div>
        )}
      </MainLayout>

      <Footer />
    </>
  )
}

export default Index
