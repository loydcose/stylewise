import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"

export async function getServerSideProps({ req, res }) {
  let session = await unstable_getServerSession(req, res, authOptions)
  session = JSON.parse(JSON.stringify(session))

  // redirect user if he's already logged in
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return { props: { data: session } }
}
