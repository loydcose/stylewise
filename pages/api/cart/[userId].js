import dbConnect from "../../../database/dbConnect"
import Cart from "../../../database/models/cart"

export default async function handler(req, res) {
  const { method, query } = req
  const { userId, itemId } = query
  await dbConnect()

  // find the cart belonging to the user
  const cart = await Cart.findOne({ userId })

  if (!cart) {
    return res.json({ success: false, message: "No cart found" })
  }

  // if the request method is DELETE, filter out the item with the specified ID from the cart's products array
  if (method === "DELETE") {
    const { clearAll } = query

    // clear one item if clearAll didn't specified
    if (!clearAll) {
      const result = cart.products.filter((item) => {
        return itemId !== item._id.toString()
      })
      cart.products = result
      await cart.save()
      return res.json({ success: true, message: "Item deleted" })
    } else {
      // clear all items in the cart, usually use after user place an order
      cart.products = []
      await cart.save()
      return res.json({ success: true, message: "All items deleted!" })
    }
  }

  // handles increment & decrement quantity of the item
  if (method === "PUT") {
    const { quantity } = req.body
    const result = cart.products.map((item) => {
      if (itemId === item._id.toString()) {
        item.quantity = quantity
      }
      return item
    })
    cart.products = result
    await cart.save()
    return res.json({ success: true, message: "Item updated!" })
  }

  // default, return the products in the cart
  return res.json(cart.products)
}
