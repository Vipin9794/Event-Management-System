const express = require("express");
const {
  addToCart,
  addToGuestList,
  removeFromGuestList,
  viewAllProducts,
  getUserCart,
  removeFromCart,  // ✅ Added Product Route
} = require("../controllers/userController");
const { placeOrder,getUserOrders, } = require("../controllers/orderController");
//const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Product Routes
router.get("/products", viewAllProducts);  //  Fetch All Products

// 🛒 Add to Cart Route (POST)
router.post("/cart/add", addToCart);


// 🛒 Get User's Cart Route (GET)
router.get("/cart", getUserCart);
router.delete("/cart/:productId", removeFromCart);


// Guest List Routes
router.post("/guest-list/add", addToGuestList);
router.delete("/guest-list/remove/:guestId", removeFromGuestList);


router.post("/place-order", placeOrder);
// router.get("/my-orders/:userId", orderController.getUserOrders);

router.get("/user-orders", getUserOrders);
// Order Status Route
//router.get("/order/status/:orderId", checkOrderStatus);

module.exports = router;
