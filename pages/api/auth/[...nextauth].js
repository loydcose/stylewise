import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "../../../database/dbConnect"
import User from "../../../database/models/user"
import { compare } from "../../../utils/bcrypt"

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { email, password } = credentials

        // check if user email address is exist
        await dbConnect()
        const user = await User.findOne({ email })
        if (!user) throw new Error("Email or password incorrect")

        // check if password matched with bcrypt
        const match = await compare(password, user.password)
        if (!match || !user) throw new Error("Email or password incorrect")

        // remove unnecessary props and return as payload
        const { password: secret, _id, ...others } = user._doc
        others.id = _id
        return others
      },
    }),
  ],
  callbacks: {
    // pass the user information from jwt up to session
    async jwt({ token, user }) {
      if (user) token = { ...token, ...user }
      return token
    },
    async session({ session, token }) {
      if (token) session = { ...session.user, ...token }
      return session
    },
  },
}

export default NextAuth(authOptions)
