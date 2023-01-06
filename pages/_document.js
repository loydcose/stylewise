import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.svg" />
      </Head>
      <body className="text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
