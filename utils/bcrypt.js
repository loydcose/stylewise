import bcrypt from "bcrypt"

async function hash(password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

async function compare(formPassword, dbPassword) {
  return await bcrypt.compare(formPassword, dbPassword)
}

module.exports = { hash, compare }
