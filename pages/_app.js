import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import CartQtyContext from "../context/CartQty"
import { useState } from "react"
import axios from "axios"
import getApiUrl from "../getApiUrl"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [cartQty, setCartQty] = useState(0)

  const fetchCartQty = async (userId) => {
    if (!userId) return

    const API_URL = getApiUrl()
    const response = await axios.get(`${API_URL}/api/cart/${userId}`)
    console.log(`${API_URL}/api/cart/${userId}`);
    const quantity = response.data.length
    setCartQty(quantity)
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
