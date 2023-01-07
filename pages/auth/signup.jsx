/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useForm } from "react-hook-form"
import HeadDocument from "../../components/HeadDocument"
import SignLayout from "../../components/SignLayout"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/router"
import { getServerSideProps } from "../../ServerProps/auth"

// redirect user to homepage if he's already signed up
export { getServerSideProps }

export default function SignUp() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    let response = null
    try {
      // loading notification
      toast.loading("Loading...")
      response = await axios.post("/api/signup", data)
      toast.dismiss()
    } catch (error) {
      console.error(error.message)
    }

    // show un/successful notification
    const { success, message } = response.data
    success ? toast.success(message) : toast.error(message)

    // redirect user to login page after 1s
    setTimeout(() => {
      router.push("/auth/signin")
    }, 1000)
  }

  return (
    <>
      <HeadDocument title="Stylewise | Sign up" />
      <SignLayout type="signup">
        <Toaster />
        <form
          className="bg-white rounded p-8"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="email"
              className="text-sm text-gray-600 font-medium"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label
              htmlFor="firstName"
              className="text-sm text-gray-600 font-medium"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              pattern="[a-zA-Z\s]+"
              required
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="lastName"
              className="text-sm text-gray-600 font-medium"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              pattern="[a-zA-Z\s]+"
              required
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="password"
              className="text-sm text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              pattern="(?=.*\d)(?=.*[a-z]).{8,}"
              title="At least 8 chars, 1 digit and 1 lowercase"
              required
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label
              htmlFor="rePassword"
              className="text-sm text-gray-600 font-medium"
            >
              Re-enter password
            </label>
            <input
              type="password"
              id="rePassword"
              required
              {...register("rePassword")}
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <p className="mb-6">
            Goto{" "}
            <Link
              href="/auth/signin"
              className="text-violet-600 hover:underline"
            >
              sign in page
            </Link>
          </p>
          <button
            type="submit"
            className="py-3 px-5 w-full rounded bg-violet-600 hover:bg-violet-700 text-white"
          >
            Sign up
          </button>
        </form>
      </SignLayout>
    </>
  )
}
