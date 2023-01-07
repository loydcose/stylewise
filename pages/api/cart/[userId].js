import dbConnect from "../../../database/dbConnect"
import Cart from "../../../database/models/cart"

export default async function handler(req, res) {
  const { method, query } = req
  const { userId, itemId, clearAll } = query

  await dbConnect()

  // find the cart belonging to the user
  const cart = await Cart.findOne({ userId })
  if (!cart) return res.json({ success: false, message: "No cart found" })

  if (method === "DELETE") {
    // clear just one item if clearAll didn't specified
    if (!clearAll) {
      const result = cart.products.filter((item) => {
        return itemId !== item._id.toString()
      })
      cart.products = result
      await cart.save()
      return res.json({ success: true, message: "Item deleted" })
    } else {
      // clear all items in the cart, usually after user checked out
      cart.products = []
      await cart.save()
      return res.json({ success: true, message: "All items deleted" })
    }
  }

  // updating quantity of the item
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
    return res.json({ success: true, message: "Item updated" })
  }

  // default, return the products in the cart
  return res.json(cart.products)
}
