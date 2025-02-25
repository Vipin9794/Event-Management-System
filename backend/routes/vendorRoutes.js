const express = require("express");
const {
  insertProduct,
  deleteProduct,
  updateProduct,
  viewProduct,
  viewProductId,
  userRequest,
} = require("../controllers/vendorController");
const {  
  getVendorOrders, 
  updateVendorResponse, 
  updateOrderStatus 
} = require("../controllers/orderController");


const router = express.Router();

// Insert product into vendor's list
router.post("/insert-product", insertProduct);

// Delete product from vendor's list
router.delete("/delete-product/:productId", deleteProduct);
router.put("/update-product/:productId", updateProduct);


router.get("/vendor-orders", getVendorOrders);
// ✅ **3. Vendor accepts/rejects an order**
router.put("/vendor-response", updateVendorResponse);

// 🚚 **4. Vendor updates order status**
router.put("/update-status", updateOrderStatus);


// View a product (details)
router.get("/view-product", viewProduct);
router.get("/view-product/:productId", viewProductId);



// Handle user product requests
router.post("/user-request", userRequest);

module.exports = router;
