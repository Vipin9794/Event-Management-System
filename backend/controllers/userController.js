const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const GuestList = require("../models/GuestList");
const Order = require("../models/Order");
const Authentication= require("../models/Authentication");

// 🛒 Add to Cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, productId ,quantity} = req.body;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({ message: "Invalid userId or productId" });
//     }
//     const user = await Authentication.findById(userId);
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         items: [{ productId: product._id, quantity: 1, price: product.price }],
//         totalPrice: product.price,
//       });
//     } else {
//       const existingItem = cart.items.find(item => item.productId.toString() === productId);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.items.push({ productId: product._id, quantity: 1, price: product.price });
//       }

//       // ✅ Corrected Total Price Calculation
//       cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     }

//     await cart.save();
//     const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
//     res.status(200).json({ message: "Cart updated", cart: updatedCart });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId ) {
      return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    const user = await Authentication.findById(userId);
    console.log("User Found:", user); // 🔍 Debugging
 // 🛑 DEBUGGING - Check if user has cart field
 
 if (!user.cart) {
  user.cart = []; // 🛠️ Initialize cart if it's undefined
}
// const vendor = await Authentication.findById(vendorId);
// if (!vendor.cart) {
//   vendor.cart = []; // 🛠️ Initialize cart if it's undefined
// }
    const product = await Product.findById(productId);
    console.log("Product Found:", product); 

    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    // Check if item already exists in cart
    const cartItem = user.cart.find(item => item.productId.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity; // Increase quantity if already in cart
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    console.log("Cart After Adding Product:", user.cart); // 🛠 Debugging
    

    
    res.json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// 🛍 Get User Cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // 🛠 Fix: User variable ko properly define karein
    const user = await Authentication.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Cart Fetched From DB:", user.cart); // 🛠 Debugging ke liye

    res.json({ items: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "User ID and Product ID are required." });
    }

    const user = await Authentication.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Filter out the product from the cart
    user.cart = user.cart.filter((item) => item.productId.toString() !== productId);

    await user.save();

    res.json({ message: "Item removed from cart successfully.", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// 📦 View All Products
const viewAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products.length ? products : { message: "No products available" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🎟 Add to Guest List
const addToGuestList = async (req, res) => {
  try {
    const { userId, vendorId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: "Invalid userId or vendorId" });
    }
    const savedGuest = await new GuestList({ userId, vendorId, status: "Pending" }).save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(500).json({ message: "Error adding guest" });
  }
};

// ❌ Remove from Guest List
const removeFromGuestList = async (req, res) => {
  try {
    const { vendorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: "Invalid vendorId" });
    }
    const removedGuest = await GuestList.findOneAndDelete({ vendorId });
    res.status(removedGuest ? 200 : 404).json(removedGuest ? { message: "Guest removed", removedGuest } : { message: "Guest not found" });
  } catch (error) {
    res.status(500).json({ message: "Error removing guest" });
  }
};

// 📦 Check Order Status
const checkOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid orderId" });
    }
    const order = await Order.findById(orderId);
    res.status(order ? 200 : 404).json(order || { message: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order status" });
  }
};

module.exports = {
  viewAllProducts,
  getUserCart,
  addToCart,
  removeFromCart,
  addToGuestList,
  removeFromGuestList,
  checkOrderStatus,
};
