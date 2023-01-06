import Footer from "../../components/Footer"
import HeadDocument from "../../components/HeadDocument"
import MainLayout from "../../components/MainLayout"
import Navbar from "../../components/Navbar"
import Promo from "../../components/Promo"
import CartItem from "../../components/CartItem"
import Contact from "../../components/Contact"
import useMedia from "../../hooks/useMedia"
import { getServerSideProps } from "../../ServerProps/restricted"
import useCart from "../../hooks/useCart"
import currency from "../../utils/currency"
import { useForm } from "react-hook-form"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useContext, useState } from "react"
import CartQtyContext from "../../context/CartQty"

// unauthenticated users will be redirected to signin page
export { getServerSideProps }

export default function Index({ data: session }) {
  // to perform defaultValue in react-hook, we have to set this
  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const response = await axios.get(`/api/order/${session.id}`)
      return response.data
    },
  })

  const [loading, setLoading] = useState(false)

  // js media query, returns boolean if width < 768px
  const media = useMedia("768px")

  // handles cart items quantity in the navbar
  const { cartQty, fetchCartQty } = useContext(CartQtyContext)
  if (session) fetchCartQty(session.id)

  // handles cart items behavior and grandtotal
  const [rawItems, cartItems, totalObj, fetchCartItems] = useCart(session)
  const { subTotal, shipping, total } = totalObj

  const handleOrder = async (data) => {
    const payload = {
      userId: session.id,
      products: rawItems,
      amount: total,
      shippingInfo: data,
    }

    toast.loading("Loading...")
    const response = await axios.post("/api/order", payload)
    toast.dismiss()

    const { success, message } = response.data
    success ? toast.success(message) : toast.error(message)

    // if order successfully, clear all items in the user's cart
    if (success) {
      await axios.delete(`/api/cart/${session.id}/?clearAll=true`, payload)
      fetchCartItems()
      fetchCartQty(session.id)
    }
  }

  return (
    <>
      <HeadDocument title="Stylewise | Cart" />
      <Promo />
      <Navbar quantity={cartQty} />
      <MainLayout>
        <Toaster />
        <section className="py-16 md:py-28">
          <h2 className="font-extrabold tracking-tight text-2xl mb-6">
            Cart Page
          </h2>
          <form
            onSubmit={handleSubmit((data) => handleOrder(data))}
            className="md:flex gap-12"
          >
            {!media && <Contact session={session} register={register} />}
            <div className="grow md:min-w-[375px]">
              <h2 className="font-bold mb-3">Order Summary</h2>
              <div>
                {cartItems.length !== 0 &&
                  cartItems.map((item) => {
                    return (
                      <CartItem
                        key={item._id}
                        userId={session.id}
                        item={item}
                        fetchCartItems={fetchCartItems}
                        fetchCartQty={fetchCartQty}
                        setLoading={setLoading}
                      />
                    )
                  })}
                <div className="border-b border-b-gray-300 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-700">Subtotal</p>
                    <span className="font-semibold text-lg text-gray-700">
                      {currency(subTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <span className="font-semibold text-gray-700">
                      {currency(shipping)}
                    </span>
                  </div>
                </div>
                <div className="py-4 border-b border-b-gray-300 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-700">Total</p>
                    <span className="font-semibold text-gray-700">
                      {currency(total)}
                    </span>
                  </div>
                </div>
                {media && <Contact session={session} register={register} />}
                <button
                  type="submit"
                  className={`text-white bg-violet-600 hover:bg-violet-700 rounded py-3 px-6 w-full ${
                    loading && "pointer-events-none bg-gray-200 text-gray-700"
                  }`}
                >
                  {loading ? "Loading..." : "Confirm order"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </MainLayout>
      <Footer />
    </>
  )
}
