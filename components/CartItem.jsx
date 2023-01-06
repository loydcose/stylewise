/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { FaRegTrashAlt } from "react-icons/fa"
import useItemQty from "../hooks/useItemQty"
import uppercase from "../utils/uppercase"

const CartItem = ({
  userId,
  item,
  fetchCartItems,
  fetchCartQty,
  setLoading,
}) => {
  const {
    _id: itemId,
    image,
    name,
    color,
    size,
    price,
    quantity: productQuantity,
  } = item

  // handles increment or decrement for the item
  const [quantity, handleQuantity, loading] = useItemQty(
    userId,
    itemId,
    productQuantity,
    fetchCartItems
  )

  // user cannot click the order button during async operation (ex. incrementing quantity of an item)
  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  // handles deleting an item
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/cart/${userId}/?itemId=${itemId}`)
      fetchCartItems()
      fetchCartQty()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="flex gap-3 border-b border-b-gray-300 mb-6 pb-6">
      <Toaster />
      <div className="aspect-square w-[100px] rounded overflow-hidden">
        <img
          src={image}
          alt={name}
          className="block w-full h-full object-cover"
        />
      </div>
      <div className="grow">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-700">{name}</p>
          <button type="button" onClick={handleDelete}>
            <FaRegTrashAlt className="text-lg text-gray-500" />
          </button>
        </div>
        <p className="text-gray-500 text-sm">{uppercase(color)}</p>
        <p className="mb-6 text-gray-500 text-sm">{uppercase(size)}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-800">${price}</span>
          <div className="flex gap-3 py-2 px-4 rounded border border-gray-300">
            <button type="button" onClick={() => handleQuantity("decrement")}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => handleQuantity("increment")}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
