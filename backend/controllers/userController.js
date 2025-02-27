const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const GuestList = require("../models/GuestList");
const Order = require("../models/Order");
const Authentication = require("../models/Authentication");
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    const user = await Authentication.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            vendorId: product.vendorId,
            quantity,
            price: product.price,
          },
        ],
        totalPrice: product.price * quantity,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          vendorId: product.vendorId,
          quantity,
          price: product.price,
        });
      }
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// 🛍 Get User Cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🗑 Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Update total price after removal
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const removeFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
//     console.log("return ", req.body);

//     if (!userId || !productId) {
//       return res.status(400).json({ message: "User ID and Product ID are required." });
//     }
//     if (!user.cart) {
//       user.cart = [];
//     }
//     const productIdObj = new mongoose.Types.ObjectId(productId);

//     const user = await Authentication.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }
//     console.log("User Data:", user);
//     // Filter out the product from the cart
//    // user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
//    const updatedCart = user.cart.filter(item => item.productId.toString() !== productIdObj.toString());

//     // 🔍 Debugging - Check if product is removed
//     console.log("After Removing, Cart:", updatedCart);

// console.log("Cart Data Before:", user.cart);
// //console.log("Product Data:", product);

//     // ✅ 1. Ensure user exists
//     // const user = await Authentication.findById(userId);
//     // if (!user) {
//     //   return res.status(404).json({ message: "User not found." });
//     // }

//     //  // ✅ Ensure productId is valid
//     //  const filteredCart = user.cart.filter(
//     //   (item) =>
//     //     item.productId && // ⚠️ Ignore null values
//     //     item.productId._id.toString() !== productId.toString()
//     // );

//     // if (filteredCart.length === user.cart.length) {
//     //   return res.status(404).json({ message: "Product not found in cart." });
//     // }

//     // user.cart = filteredCart;
//     await user.save();

//     res.json({ message: "Item removed from cart successfully.", cart: user.cart });
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// 📦 View All Products
const viewAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Product", products);
    //  res.status(200).json(products);
    res
      .status(200)
      .json(products.length ? products : { message: "No products available" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🎟 Add to Guest List
const addToGuestList = async (req, res) => {
  try {
    const { userId, vendorId } = req.body;
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(vendorId)
    ) {
      return res.status(400).json({ message: "Invalid userId or vendorId" });
    }
    const savedGuest = await new GuestList({
      userId,
      vendorId,
      status: "Pending",
    }).save();
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
    res
      .status(removedGuest ? 200 : 404)
      .json(
        removedGuest
          ? { message: "Guest removed", removedGuest }
          : { message: "Guest not found" }
      );
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
