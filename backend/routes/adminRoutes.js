const express = require('express');
const {
  addUpdateUser,
  addUpdateVendor,
  addMembership,
  updateMembership,
} = require('../controllers/adminController');

const router = express.Router();

// Add/Update User
router.post("/add-update-user", addUpdateUser);

// Add/Update Vendor
router.post('/add-update-vendor', addUpdateVendor);

// Add Membership
router.post('/add-membership', addMembership);

// Update Membership
router.post('/update-membership', updateMembership);

module.exports = router;
