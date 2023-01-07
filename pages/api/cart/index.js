import dbConnect from "../../../database/dbConnect"
import Cart from "../../../database/models/cart"

export default async function handler(req, res) {
  const { userId, ...productData } = req.body

  if (req.method === "POST") {
    await dbConnect()
    try {
      // find the user's cart in the database
      const cart = await Cart.findOne({ userId })

      // if no cart found, create new one that contains user cart products
      if (!cart) {
        const newCart = {
          userId,
          products: [productData],
        }
        await Cart.create(newCart)
        return res.json({ success: true, message: "Added to bag" })
      }

      // if the cart exists, check first if the product is already in the cart
      const productIndex = cart.products.findIndex((item) => {
        const { quantity, _id, ...itemData } = item._doc
        const { quantity: formQuantity, ...formData } = productData
        return JSON.stringify(itemData) === JSON.stringify(formData)
      })

      // if it is, just update its quantity
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += productData.quantity
      } else {
        // otherwise, just add it to cart
        cart.products.push(productData)
      }
      await cart.save()

      res.json({ success: true, message: "Added to bag" })
    } catch (error) {
      console.log(error.message)
      res.json({ success: false, message: "There's something wrong" })
    }
  }
}
