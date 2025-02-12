const express = require('express');
const {
  addToCart,
  removeFromCart,
  viewCart,
  makePayment,
  cancelOrder,
  addToGuestList,
  updateGuestList,
  removeFromGuestList,
  checkOrderStatus,
} = require('../controllers/userController');

const router = express.Router();

// Cart routes
router.post('/cart', addToCart);
router.delete('/cart/:productId', removeFromCart);
router.get('/cart', viewCart);

// Payment routes
router.post('/payment', makePayment);
router.post('/cancel', cancelOrder);

// Guest List routes
router.post('/guest-list', addToGuestList);
router.put('/guest-list/update', updateGuestList);
router.delete('/guest-list/:vendorId', removeFromGuestList);

// Order Status routes
router.get('/order-status', checkOrderStatus);

module.exports = router;
