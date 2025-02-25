


const Authentication = require("../models/Authentication");

const Membership = require("../models/Membership");
const bcrypt = require("bcrypt");

// Controller to get all data (Vendors, Users, Memberships)
const getAllData = async (req, res) => {
  try {
    //const vendors = await Vendor.find({}, "_id name email");
  
    const users = await Authentication.find({}, "_id name email role");
    const vendors = await Authentication.find({ role: 'vendor' }, "_id name email");
    const memberships = await Membership.find({}, "_id type price");

    res.json({ users, vendors, memberships });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add/Update User
const addUpdateUser = async (req, res) => {
  try {
    const { _id, name, email, role, password } = req.body;

    if (!_id) {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const auth = new Authentication({ name, email, role, password: hashedPassword });
      await auth.save();
      return res.status(201).json(auth);
    }

    // Update existing user
    const updatedData = { name, email, role };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await Authentication.findByIdAndUpdate(_id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in addUpdateUser:", error);
    res.status(500).json({ message: error.message });
  }
};

// Add/Update Vendor
const addUpdateVendor = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { _id, name, description, membershipId } = req.body;

    if (!_id) {
      const vendor = new Authentication({ name, description, membership: membershipId });
      await vendor.save();
      return res.status(201).json(vendor);
    }

    const vendor = await Vendor.findByIdAndUpdate(
      _id,
      { name, description, membership: membershipId },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error in addUpdateVendor:", error);
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
    console.error("Error in addMembership:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Membership
const updateMembership = async (req, res) => {
  try {
    const { _id, title, benefits, price, validUntil } = req.body;
    const membership = await Membership.findByIdAndUpdate(
      _id,
      { title, benefits, price, validUntil },
      { new: true }
    );

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.status(200).json(membership);
  } catch (error) {
    console.error("Error in updateMembership:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllData,
  addUpdateUser,
  addUpdateVendor,
  addMembership,
  updateMembership,
};
