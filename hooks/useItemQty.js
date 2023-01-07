/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const useItemQty = (userId, itemId, productQuantity, fetchCartItems) => {
  const [quantity, setQuantity] = useState(productQuantity)
  const [loading, setLoading] = useState(false)

  const handleQuantity = (type) => {
    setLoading(true)
    if (type === "increment") {
      setQuantity((prev) => prev + 1)
    } else {
      quantity > 1 && setQuantity((prev) => prev - 1)
    }
  }

  // quantity update request
  const updateQuantity = async () => {
    try {
      await axios.put(`/api/cart/${userId}/?itemId=${itemId}`, {
        quantity,
      })
      setLoading(false)
      fetchCartItems()
    } catch (error) {
      console.error(error.message)
    }
  }

  // debounce applied for repetitive increments / decrements
  useEffect(() => {
    const delay = setTimeout(() => {
      updateQuantity()
    }, 1000)
    return () => clearTimeout(delay)
  }, [quantity])

  return [quantity, handleQuantity, loading]
}

export default useItemQty
