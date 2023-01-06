import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  const search = req.query.search
  const category = req.query.category
  const limit = req.query.limit
  let products = []
  await dbConnect()

  if (category) {
    // find products that match the specified category
    products = await Product.find({ categories: { $in: [category] } }).limit(
      limit
    )
  } else if (search) {
    // find products by name that match the search query
    const flags = "i"
    const regex = new RegExp(search, flags)
    products = await Product.find({ name: regex }).limit(limit)
  } else {
    // default, return all products
    products = await Product.find().limit(limit)
  }

  res.json(products)
}
