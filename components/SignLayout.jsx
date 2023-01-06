/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

const SignLayout = ({ children, type }) => {
  return (
    <section className="min-h-screen bg-gray-200 grid py-16 place-items-center">
      <div className="w-[90%] mx-auto max-w-[400px]">
        <a href="/">
          <img src="/icon.svg" alt="" className="w-[60px] mx-auto mb-3" />
        </a>
        <h1 className="font-extrabold tracking-tight mb-8 text-2xl md:text-3xl text-center">
          {type === "signup" ? "Register" : "Sign in to"} your account
        </h1>
        {children}
      </div>
    </section>
  )
}

export default SignLayout
