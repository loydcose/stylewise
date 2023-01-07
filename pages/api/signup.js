import dbConnect from "../../database/dbConnect"
import User from "../../database/models/user"
import { hash } from "../../utils/bcrypt"

export default async function handler(req, res) {
  const { password, rePassword, ...others } = req.body
  await dbConnect()

  // check if passwords has matched
  if (password !== rePassword) {
    return res.json({
      success: false,
      message: "Password didn't match",
    })
  }

  try {
    // hash the password and save the user to database
    const hashed = await hash(password)
    const userData = { ...others, password: hashed }
    await User.create(userData)
    res.json({ success: true, message: "Account registered" })
  } catch (error) {
    res.json({ success: false, message: "Email is already exists" })
  }
}
