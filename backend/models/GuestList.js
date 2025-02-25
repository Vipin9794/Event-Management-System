const mongoose = require("mongoose");

const guestListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  status: { type: String, default: "Pending" },
});

const GuestList = mongoose.model("GuestList", guestListSchema);

module.exports = GuestList;
