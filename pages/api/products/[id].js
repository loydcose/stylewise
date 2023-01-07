import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === "GET") {
    await dbConnect()

    try {
      // find the product that matches with the id query
      const product = await Product.findOne({ _id: id })
      res.json(product)
    } catch (error) {
      console.error(error.message)
    }
  }
}
