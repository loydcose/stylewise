export default function getApiUrl() {
  const url = {
    development: "http://localhost:3000",
    production: "https://stylewise.vercel.app",
  }

  const env = process.env.NODE_ENV || "development"
  console.log(env)
  return url[env]
}
