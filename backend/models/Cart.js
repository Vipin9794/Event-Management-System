const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
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
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authentication",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
  paymentMethod: {
    type: String,
   // required: true,
    enum: ["COD", "UPI", ],//"Card", "Net Banking"
  },
});

module.exports = mongoose.model("Cart", cartSchema);
