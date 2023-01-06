import dbConnect from "../../../database/dbConnect"
import Order from "../../../database/models/order"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query
    await dbConnect()

    try {
      // return the latest form data that user's used when he ordered
      const order = await Order.findOne({ userId }).sort({ createdAt: -1 })

      if (!order) {
        // return null, so the default values use the empty string
        return res.json(null)
      }

      res.json(order.shippingInfo)
    } catch (error) {
      res.json(error.message)
    }
  }
}
