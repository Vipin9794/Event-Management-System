const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
       auto: true, // Automatically generate vendor ID

  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  totalAmount: {
    type: Number,
    default: 0,
  },
  guestList: [{
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    date: {
      type: Date,
      required: true,
    },
  }],
  orderStatus: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending',
    },
  }],
});

module.exports = mongoose.model('User', userSchema);
