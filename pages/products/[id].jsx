/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import HeadDocument from "../../components/HeadDocument"
import MainLayout from "../../components/MainLayout"
import Promo from "../../components/Promo"
import { HiOutlineShoppingBag } from "react-icons/hi"
import axios from "axios"
import Selection from "../../components/Selection"
import { useForm } from "react-hook-form"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast"
import { AiOutlineCloseCircle } from "react-icons/ai"
import CartQtyContext from "../../context/CartQty"
import getApiUrl from "../../getApiUrl"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"

export async function getServerSideProps({ req, res, params }) {
  const session = await unstable_getServerSession(req, res, authOptions)

  // fetch product base on the id parameter
  const API_URL = getApiUrl()
  let product = null
  try {
    const response = await axios.get(`${API_URL}/api/products/${params.id}`)
    product = response.data
  } catch (error) {
    console.error(error.message)
  }
  return {
    props: { product, data: JSON.parse(JSON.stringify(session)) },
  }
}

const Details = ({ product, data: session }) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // handles cart items quantity in the navbar
  const { cartQty, fetchCartQty } = useContext(CartQtyContext)
  if (session) fetchCartQty(session.id)

  const onSubmit = async (data) => {
    // redirect to login page if user hasn't been logged in
    if (!session) {
      router.push("/auth/signin")
      return
    }

    // put product to a user's cart
    try {
      const productObj = {
        productId: product._id,
        quantity,
        ...data,
      }
      toast.loading("Adding...")
      const response = await axios.post("/api/cart", {
        ...productObj,
        userId: session.id,
      })
      toast.dismiss()

      // show notification
      const { success, message } = response.data
      success ? toast.success(message) : toast.error(message)

      // refresh the cart items quantity
      if (success) fetchCartQty(session.id)
    } catch (error) {
      console.error(error.message)
    }
  }

  // handles item quantity
  const handleQuantity = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1)
    }
    if (type === "decrement") {
      quantity > 1 && setQuantity((prev) => prev - 1)
    }
  }

  const { image, name, description, price, colors, sizes } = product
  return (
    <>
      <HeadDocument title={`Stylewise | ${name}`} />
      <Promo />
      <Navbar quantity={cartQty} />
      <MainLayout>
        <section className="py-16 md:py-28">
          <Toaster />
          <div
            className={`${
              showSizeChart ? "fixed" : "hidden"
            } inset-0 bg-black/[.25] grid place-items-center z-10`}
          >
            <div className="w-[90%] max-w-[500px] relative">
              <img
                src="https://www.shutterstock.com/image-vector/short-sleeve-shirt-button-collar-260nw-2182465969.jpg"
                alt=""
                className="w-full block"
              />
              <button
                type="button"
                className="absolute top-3 right-3"
                onClick={() => setShowSizeChart(false)}
              >
                <AiOutlineCloseCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* details section */}
          <h2 className="text-2xl mb-4 md:mb-6 font-extrabold tracking-tight">
            Details page
          </h2>
          <form
            className="md:flex gap-8 justify-center"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <div className="aspect-square rounded overflow-hidden mb-4 md:mb-0">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-[500px] w-full">
              <h2 className="text-2xl font-semibold mb-2 tracking-tight">
                {name}
              </h2>
              <span className="block mb-4 font-bold text-gray-700">
                ${price}
              </span>
              <p className="mb-2 md:mb-8 text-gray-600">{description}</p>
              <p className="mb-2 text-sm text-gray-600">Color</p>
              <div className="selection flex items-center relative flex-wrap gap-2 mb-4 md:mb-8">
                {colors.length !== 0 &&
                  colors.map((color) => {
                    return (
                      <Selection
                        key={color}
                        register={register}
                        type="color"
                        value={color}
                      />
                    )
                  })}
              </div>
              <div className="flex mb-2 items-center justify-between">
                <p className="text-sm text-gray-600">Size</p>
                <button
                  type="button"
                  className="text-violet-600 text-sm underline"
                  onClick={() => setShowSizeChart(true)}
                >
                  Size chart
                </button>
              </div>
              <div className="selection flex items-center gap-3 flex-wrap mb-6">
                {sizes.length !== 0 &&
                  sizes.map((size) => {
                    return (
                      <Selection
                        key={size}
                        register={register}
                        type="size"
                        value={size}
                      />
                    )
                  })}
              </div>
              <div className="mb-4 md:mb-8">
                <p className="mb-2 text-sm text-gray-600">Quantity</p>
                <div className="w-fit ring-gray-400 overflow-hidden ring-1 rounded text-sm select-none flex items-center">
                  <button
                    type="button"
                    className="hover:bg-gray-100 py-2 px-4"
                    onClick={() => handleQuantity("decrement")}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    className="hover:bg-gray-100 py-2 px-4"
                    onClick={() => handleQuantity("increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full transition-colors flex items-center gap-2 justify-center rounded bg-violet-600 px-6 hover:bg-violet-700 py-3 text-white"
              >
                <HiOutlineShoppingBag className="text-xl" />
                <span>Add to bag</span>
              </button>
            </div>
          </form>
        </section>
      </MainLayout>
      <Footer />
    </>
  )
}

export default Details
