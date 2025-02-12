const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  membershipId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate vendor ID
  },
  title: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  validUntil: {
    type: Date,
  },
});

module.exports = mongoose.model('Membership', membershipSchema);
