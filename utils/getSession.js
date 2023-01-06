import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"

// return the payload if user has signed in, otherwise return null
export default async function getSession(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  return session
}
