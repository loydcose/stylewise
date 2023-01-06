import { Schema, models, model } from "mongoose"

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Product = models.Product || model("Product", productSchema)
module.exports = Product
