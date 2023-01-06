import { Schema, models, model } from "mongoose"

const orderSchema = new Schema(
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
        quantity: { type: Number },
      },
    ],
    amount: { type: Number, required: true },
    shippingInfo: {
      email: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      company: { type: String },
      address: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      country: { type: String, required: true },
      province: { type: String, required: true },
      postal: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },
    hasShipped: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Order = models.Order || model("Order", orderSchema)
module.exports = Order
