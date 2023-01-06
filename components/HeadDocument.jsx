import Head from "next/head"

const HeadDocument = ({ title = "Stylewise" }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default HeadDocument
