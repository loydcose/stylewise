/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useForm } from "react-hook-form"
import HeadDocument from "../../components/HeadDocument"
import SignLayout from "../../components/SignLayout"
import toast, { Toaster } from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { getServerSideProps } from "../../ServerProps/auth"

// redirect user if he's already logged in
export { getServerSideProps }

export default function SignIn() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    let status

    // verifying credentials with next-auth
    try {
      toast.loading("Loading...")
      status = await signIn("credentials", {
        redirect: false,
        ...data,
      })
      toast.dismiss()
    } catch (error) {
      console.error(error.message)
    }

    // show error if email or pass isn't correct
    if (status.error) return toast.error(status.error)

    // redirect user to home page after 1 second
    toast.success("Login successful")
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  return (
    <>
      <HeadDocument title="Stylewise | Sign in" />
      <SignLayout type="signin">
        <Toaster />
        <form
          className="bg-white rounded p-8"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="" className="text-sm text-gray-600 font-medium">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="" className="text-sm text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              required
              className="px-5 py-2 rounded outline-none ring-1 ring-gray-300 focus:ring-violet-600"
            />
          </div>
          <p className="mb-6">
            Goto{" "}
            <Link
              href="/auth/signup"
              className="text-violet-600 hover:underline"
            >
              sign up page
            </Link>
          </p>
          <button
            type="submit"
            className="py-3 px-5 w-full rounded bg-violet-600 hover:bg-violet-700 text-white"
          >
            Sign in
          </button>
        </form>
      </SignLayout>
    </>
  )
}
