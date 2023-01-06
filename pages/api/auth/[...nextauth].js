import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "../../../database/dbConnect"
import User from "../../../database/models/user"
import { compare } from "../../../utils/bcrypt"
import dotenv from "dotenv"
dotenv.config()
connect()

// TODO: fix session always return status:200, ok: true

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async ({ email, password }, req) => {
        // find user email to the database
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error("Email address doesn't exist")
        }

        // check if password matched
        const match = await compare(password, user.password)
        if (!match) {
          throw new Error("Incorrect password")
        }

        // remove unnecessary props and return as payload
        const { password: secret, _id, ...others } = user._doc
        others.id = _id
        return others
      },
    }),
  ],
  callbacks: {
    // user to jwt, jwt to session, so we can access the payload on the client side
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session = { ...session.user, ...token }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
