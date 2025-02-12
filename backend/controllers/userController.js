// const User = require('../models/User');
// const Product = require('../models/Product');
// const Vendor = require('../models/Vendor');
const Cart = require('../models/Cart'); // Cart model
const Order = require('../models/Order'); // Order model
const GuestList = require('../models/GuestList'); // Guest list model
const Product = require('../models/Product'); // Import Product model


// Add item to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      await cart.save();
      return res.status(201).json(cart);
    }

    // If cart exists, add item
    cart.items.push({ productId, quantity });
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View cart items
const viewCart = async (req, res) => {
  const { userId } = req.query;

  // Ensure that the userId is valid (trim any unwanted characters)
  const cleanUserId = userId.trim();

  try {
    // Query the cart for the specific user
    const cart = await Cart.findOne({ userId: cleanUserId }).populate({
      path: 'items.productId', // Assuming 'productId' is a reference to the Product model
      select: 'name price image' // You can specify which fields to populate (e.g., name, price, image)
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty or not found' });
    }

    res.status(200).json(cart); // Return the cart with populated items
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Make payment
// const makePayment = async (req, res) => {
//   const { userId, amount } = req.body;

//   try {
//     const order = new Order({ userId, amount, status: 'Paid' });
//     await order.save();

//     // Clear the cart after payment
//     await Cart.deleteOne({ userId });

//     res.status(200).json({ message: 'Payment successful', order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// const Order = require('../models/Order');  // Import Order model

const makePayment = async (req, res) => {
  const { userId, amount, items } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: 'userId and amount are required' });
  }

  try {
    // Create a new order
    const order = new Order({
      userId,
      amount,
      items,
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  const { userId, orderId } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to guest list
// In controllers/userController.js


// Add a guest to the list
const addToGuestList = async (req, res) => {
  const { userId, vendorId } = req.body;

  if (!userId || !vendorId) {
    return res.status(400).json({ message: 'userId and vendorId are required' });
  }

  try {
    const newGuest = new GuestList({
      userId,
      vendorId,
      status: 'Pending',  // default status
    });

    const savedGuest = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a guest list entry (status, etc.)
const updateGuestList = async (req, res) => {
  const { userId, vendorId, status } = req.body;

  if (!userId || !vendorId || !status) {
    return res.status(400).json({ message: 'userId, vendorId, and status are required' });
  }

  try {
    const updatedGuest = await GuestList.findOneAndUpdate(
      { userId, vendorId },
      { status },
      { new: true }  // return updated record
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.status(200).json(updatedGuest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a guest from the list
const removeFromGuestList = async (req, res) => {
  const { vendorId } = req.params;  // Get vendorId from URL

  try {
    const removedGuest = await GuestList.findOneAndDelete({ vendorId });

    if (!removedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.status(200).json({ message: 'Guest removed from list', removedGuest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Check order status
const checkOrderStatus = async (req, res) => {
  const { orderId } = req.query;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  viewCart,
  makePayment,
  cancelOrder,
  addToGuestList,
  updateGuestList,
  removeFromGuestList,
  checkOrderStatus,
};