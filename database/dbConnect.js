import mongoose from "mongoose"

const dbConnect = async () => {
  mongoose.connect(process.env.MONGO_URI)
  console.log("Connected to database")
}

export default dbConnect
