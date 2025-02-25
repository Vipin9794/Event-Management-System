const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authentication",
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authentication",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      // vendorId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Authentication",
      //   required: true,
      // }, // ✅ यह Add करो
      name: String,
      price: Number,
      quantity: Number,
      total: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Rejected",
      "Shipped",
      "Delivered",
      "Cancelled",
    ],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
