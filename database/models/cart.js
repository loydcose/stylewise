import { Schema, models, model } from "mongoose"

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: { type: String },
        color: { type: String },
        size: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
)

const Cart = models.Cart || model("Cart", cartSchema)
module.exports = Cart
