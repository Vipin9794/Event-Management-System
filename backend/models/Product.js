
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authentication',
    required: true,
  },
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
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // category: {
  //   type: String,
  // },
});

module.exports = mongoose.model('Product', productSchema);
