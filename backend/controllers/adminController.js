//adminController.js

const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Membership = require('../models/Membership');

// Add/Update User
const addUpdateUser = async (req, res) => {
  try {
    const { userId, name, email, role, password } = req.body;
    if (userId) {
      const user = await User.findByIdAndUpdate(userId, { name, email, role, password }, { new: true });
      res.status(200).json(user);
    } else {
      const user = new User({ name, email, role, password });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add/Update Vendor
const addUpdateVendor = async (req, res) => {
  try {
    const { vendorId, name, description, membershipId } = req.body;
    if (vendorId) {
      const vendor = await Vendor.findByIdAndUpdate(vendorId, { name, description, membership: membershipId }, { new: true });
      res.status(200).json(vendor);
    } else {
      const vendor = new Vendor({ name, description, membership: membershipId });
      await vendor.save();
      res.status(201).json(vendor);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Membership
const addMembership = async (req, res) => {
  try {
    const { title, benefits, price, validUntil } = req.body;
    const membership = new Membership({ title, benefits, price, validUntil });
    await membership.save();
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Membership
const updateMembership = async (req, res) => {
  try {
    const { membershipId, title, benefits, price, validUntil } = req.body;
    const membership = await Membership.findByIdAndUpdate(membershipId, { title, benefits, price, validUntil }, { new: true });
    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUpdateUser,
  addUpdateVendor,
  addMembership,
  updateMembership,
};
