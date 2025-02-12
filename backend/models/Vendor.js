const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate vendor ID
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    status: {
      type: String,
      enum: ['available', 'out of stock', 'discontinued'],
      default: 'available',
    },
    requestCount: {
      type: Number,
      default: 0,
    },
  }],
});

module.exports = mongoose.model('Vendor', vendorSchema);
