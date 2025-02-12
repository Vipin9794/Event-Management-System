const express = require('express');
const {
  insertProduct,
  deleteProduct,
  addNewProduct,
  getProductStatus,
  viewProduct,
  userRequest,
} = require('../controllers/vendorController');

const router = express.Router();

// Insert product into vendor's list
router.post('/insert-product', insertProduct);

// Delete product from vendor's list
router.delete('/delete-product/:productId', deleteProduct);

// Add new product for the vendor
router.post('/add-new-product', addNewProduct);

// Get product status (available, out of stock, etc.)
router.get('/product-status', getProductStatus);

// View a product (details)
router.get('/view-product', viewProduct);

// Handle user product requests
router.post('/user-request', userRequest);

module.exports = router;
