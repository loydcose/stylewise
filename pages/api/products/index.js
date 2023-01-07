import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  const { search, category, limit } = req.query

  if (req.method === "GET") {
    let products = []
    await dbConnect()

    try {
      if (category) {
        // find products that match the specified category
        products = await Product.find({
          categories: { $in: [category] },
        }).limit(limit)
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
    } catch (error) {
      console.log(error.message)
    }
  }
}
