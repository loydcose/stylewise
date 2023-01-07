import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    try {
      // get all the category values along with first matched image distinctly
      const distinct = await Product.distinct("categories")
      const products = await Product.find()
      const categories = distinct.map((category) => {
        const item = products.find((item) => item.categories.includes(category))
        return [category, item.image]
      })
      res.json(categories)
    } catch (error) {
      console.error(error.message)
    }
  }
}
