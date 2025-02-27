//venderontroller.js
const mongoose = require("mongoose");
//const Vendor = require("../models/Vendor");
const Product = require("../models/Product");
const Authentication = require("../models/Authentication");
// Function to insert a new product
const insertProduct = async (req, res) => {
  const {vendorId, name, price, description, image } = req.body;

  // Validate required fields
  if (!vendorId ||!name || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new product
    const newProduct = new Product({
      vendorId,
      name,
      price,
      description,
      image,
      //  vendorId,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get product status
const getProductStatus = async (req, res) => {
  try {
    const { vendorId } = req.query;
    const vendor = await Authentication.findById(vendorId).populate("items.product");

    res.status(200).json(
      vendor.items.map((item) => ({
        productName: item.product.name,
        status: item.status,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//view product
// const viewProduct = async (req, res) => {
  
    

//   try {
//     const vendorId = req.query.vendorId; // JWT token से vendorId निकालो
//     if (!vendorId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     } 
//     const products = await Product.find({vendorId});//vendorId}
//     if (products.length === 0) {
//       return res.status(404).json({ message: "No products available" });
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const viewProduct = async (req, res) => {
  try {
    const vendorId = req.query.vendorId; // Vendor ID को Query से लो

    if (!vendorId) {
      return res.status(400).json({ message: "Vendor ID is required" });
    }
    console.log("✅ Received vendorId:", vendorId); 
    // 🔹 सिर्फ उसी vendor के products fetch करो
    const products = await Product.find({ vendorId });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products available" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("🔥 Error in viewProduct API:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Get productId from URL

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // res
    // .status(201)
    // .json({ message: "Product added successfully" });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// Function to update a product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Handle user product requests
const userRequest = async (req, res) => {
  try {
    const { vendorId, productId } = req.body;
    const vendor = await Authentication.findById(vendorId);

    const product = vendor.items.find(
      (item) => item.product.toString() === productId
    );
    if (!product)
      return res.status(404).json({ message: "Product not found in vendor" });

    product.requestCount += 1; // Increment the request count
    await vendor.save();

    res
      .status(200)
      .json({ message: "User request added successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertProduct,
  deleteProduct,
  updateProduct,
  getProductStatus,
  viewProduct,
  viewProductId,
  userRequest,
};
