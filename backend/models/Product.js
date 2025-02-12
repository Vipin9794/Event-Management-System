
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
   
  },
  description: {
    type: String,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // category: {
  //   type: String,
  // },
});

module.exports = mongoose.model('Product', productSchema);
