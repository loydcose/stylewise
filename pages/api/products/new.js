import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"
import User from "../../../database/models/user"
import { compare } from "../../../utils/bcrypt"

// temporary only, might fix this in the future

export default async function handler(req, res) {
  const { email, password, product } = req.body
  await dbConnect()

  if (req.method === "POST") {
    try {
      // find user email to the database
      const user = await User.findOne({ email })
      if (!user) {
        return res.json("Email address doesn't exist")
      }

      // check if password matched
      const match = await compare(password, user.password)
      if (!match) {
        return res.json("Incorrect password")
      }

      // check if user is an admin
      if (!user.isAdmin) {
        return res.json("You are not an admin")
      }

      // create a product to a database
      const newProduct = await Product.create(product)
      res.json(newProduct)
    } catch (error) {
      res.json(error.message)
    }
  }
}
