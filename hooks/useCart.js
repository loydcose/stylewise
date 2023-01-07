/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"

const useCart = (session) => {
  const [cartItems, setCartItems] = useState([])
  const [rawItems, setRawItems] = useState([])
  const [totalObj, setTotalObj] = useState({
    subTotal: 0,
    shipping: 0,
    total: 0,
  })

  const fetchCartItems = async () => {
    try {
      // find user's cart
      const cart = await axios.get(`/api/cart/${session.id}`)
      const rawItems = cart.data
      setRawItems(rawItems)

      // fetch image, name & price for each item in the user's cart
      const resolvedItems = rawItems.map(async (item) => {
        const itemData = await axios.get(`/api/products/${item.productId}`)
        const { price, image, name } = itemData.data
        return { ...item, price, image, name }
      })

      // finally, set the resolved items to the state
      setCartItems(await Promise.all(resolvedItems))
    } catch (error) {
      console.error(error)
    }
  }

  // calculates the total cost of the items in the cart
  useEffect(() => {
    // summing the price of each item & multiplied by its quantity
    const subTotal = cartItems.reduce((result, item) => {
      result += item.price * item.quantity
      return result
    }, 0)

    // free shipping for orders of $100 or more
    let shipping = 0
    if (subTotal >= 100) {
      shipping = 0
    } else if (cartItems.length >= 1) {
      shipping = 5
    }

    // calculates the grand total and setting it up on the state
    const total = subTotal + shipping
    setTotalObj({ subTotal, shipping, total })
  }, [cartItems])

  useEffect(() => {
    fetchCartItems()
  }, [])

  return [rawItems, cartItems, totalObj, fetchCartItems]
}

export default useCart
