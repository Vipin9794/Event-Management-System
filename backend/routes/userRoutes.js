const express = require("express");
const {
  addToCart,
  addToGuestList,
  removeFromGuestList,
  checkOrderStatus,
  viewAllProducts,
  getUserCart,
  removeFromCart,  // ✅ Added Product Route
} = require("../controllers/userController");
const { placeOrder } = require("../controllers/orderController");


const router = express.Router();

// Product Routes
router.get("/products", viewAllProducts);  //  Fetch All Products

// 🛒 Add to Cart Route (POST)
router.post("/cart/add", addToCart);
router.delete("/cart/remove", removeFromCart);

// 🛒 Get User's Cart Route (GET)
router.get("/cart", getUserCart);


// Guest List Routes
router.post("/guest-list/add", addToGuestList);
router.delete("/guest-list/remove/:guestId", removeFromGuestList);


router.post("/place-order", placeOrder);
// router.get("/my-orders/:userId", orderController.getUserOrders);


// Order Status Route
router.get("/order/status/:orderId", checkOrderStatus);

module.exports = router;
