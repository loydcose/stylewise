import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import CartQtyContext from "../context/CartQty"
import { useState } from "react"
import axios from "axios"
import getApiUrl from "../getApiUrl"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [cartQty, setCartQty] = useState(0)

  // handles cart quantity items in the navbar
  const fetchCartQty = async (userId) => {
    if (!userId) return

    try {
      const API_URL = getApiUrl()
      const response = await axios.get(`${API_URL}/api/cart/${userId}`)
      const quantity = response.data.length
      setCartQty(quantity)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <SessionProvider session={session}>
      <CartQtyContext.Provider value={{ cartQty, fetchCartQty }}>
        <Component {...pageProps} />
      </CartQtyContext.Provider>
    </SessionProvider>
  )
}

export default MyApp
