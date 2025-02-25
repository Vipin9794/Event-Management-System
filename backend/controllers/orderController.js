const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    console.log("🛠️ Incoming Order Data:", req.body);
    const { userId,  items,  totalAmount, address, paymentMethod } =
      req.body;
    
      const productId = items[0].productId; // ✅ Extract first item's productId
      const vendorId = items[0].vendorId; // ✅ Extract vendorId from items array
  

    if (
      !userId ||
      !productId ||
      !items.length ||
      !totalAmount ||
      !address ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
     // ✅ Get vendorId from Product
     const product = await Product.findById(productId);
     if (!product) {
         return res.status(404).json({ message: "Product not found" });
     }
    // const vendorId = product.vendorId; // ✅ Ensure this exists


    const newOrder = new Order({
      userId,
      vendorId,
      productId,
      items,
      totalAmount,
      address,
      paymentMethod,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getVendorOrders = async (req, res) => {
  console.log("🛠️ Received Query Params:", req.query);

  try {
    const { vendorId } = req.query;
    console.log("✅ Received Vendor ID:", vendorId);

    if (!vendorId) {
      return res.status(400).json({ message: "❌ Vendor ID is required!" });
    }

    // ✅ Correct Query
    const orders = await Order.find({ vendorId })  
      .populate("userId", "name email")
      .populate("items.productId", "name price"); // ✅ Fix populate path

    console.log("✅ Orders Found:", orders);
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching vendor orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const updateVendorResponse = async (req, res) => {
  try {
    const { orderId, vendorId, response } = req.body;

    if (!orderId || !vendorId || !response) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const order = await Order.findOne({ _id: orderId, vendorId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized." });
    }

    if (response === "Accepted") {
      order.orderStatus = "Accepted";
    } else {
      order.orderStatus = "Rejected";
    }

    await order.save();
    res.status(200).json({ message: `Order ${response} successfully!`, order });
  } catch (error) {
    console.error("Error updating vendor response:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, vendorId, status } = req.body;

    if (!orderId || !vendorId || !status) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const order = await Order.findOne({ _id: orderId, vendorId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized." });
    }

    order.orderStatus = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully!", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from request query

    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const orders = await Order.find({ userId }).populate({
      path: "items.productId",
      select: "name price image description"})
      .populate({
        path: "vendorId", // ✅ Vendor को populate कर रहे हैं
        select: "name", });// ✅ सिर्फ vendor का नाम चाहिए; // Populate product info  "items.productId", "name"  path: "items.productId",
     // select: "name price image description"

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// ✅ **Properly Export All Functions**
module.exports = {
  placeOrder,
  getVendorOrders,
  updateVendorResponse,
  updateOrderStatus,
  getUserOrders,
};
