import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  const id = req.query.id
  await dbConnect()
  const product = await Product.findOne({ _id: id })
  res.json(product)
}
