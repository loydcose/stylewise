import dbConnect from "../../../database/dbConnect"
import Order from "../../../database/models/order"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { products } = req.body
    await dbConnect()

    // use cannot place order when his cart has no items
    if (products.length === 0) {
      return res.json({ success: false, message: "No item in the cart" })
    }

    try {
      // otherwise, just save it to order collection database
      const order = await Order.create(req.body)
      res.json({ success: true, message: "Thank you for your order!" })
    } catch (error) {
      res.json({ success: false, message: "Something went wrong" })
    }
  }
}
