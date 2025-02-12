// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: { type: Number, required: true },
//     },
//   ],
// });

// const Cart = mongoose.model("Cart", cartSchema);

// module.exports = Cart;


const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your User model is defined as 'User'
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // This is where the Product model is referenced
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
