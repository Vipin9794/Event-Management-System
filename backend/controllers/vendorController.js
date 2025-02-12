//venderontroller.js
const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');

// Insert a product for the vendor
// controllers/vendorController.js
//const Product = require('../models/Product');

// Function to insert a new product
const insertProduct = async (req, res) => {
  const { name, price, description,image ,  vendorId } = req.body;

  // Validate required fields
  if (!name || !price || !description || !image  || !vendorId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    return res.status(400).json({ message: 'Invalid vendorId.' });
  }

  try {
    // Create a new product
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      vendorId,
     
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete a product from vendor's items
const deleteProduct = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const { productId } = req.params;
    const vendor = await Vendor.findById(vendorId);

    vendor.items = vendor.items.filter(item => item.product.toString() !== productId);
    await vendor.save();
    res.status(200).json(vendor.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new product to vendor's list
const addNewProduct = async (req, res) => {
  try {
    const { vendorId, productData } = req.body;
    const vendor = await Vendor.findById(vendorId);

    const newProduct = new Product(productData);
    await newProduct.save();

    vendor.items.push({ product: newProduct._id });
    await vendor.save();

    res.status(200).json(vendor.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product status
const getProductStatus = async (req, res) => {
  try {
    const { vendorId } = req.query;
    const vendor = await Vendor.findById(vendorId).populate('items.product');

    res.status(200).json(vendor.items.map(item => ({
      productName: item.product.name,
      status: item.status,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View a product
const viewProduct = async (req, res) => {
  try {
    const { vendorId } = req.query;
    const vendor = await Vendor.findById(vendorId).populate('items.product');
    const products = vendor.items.map(item => item.product);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle user product requests
const userRequest = async (req, res) => {
  try {
    const { vendorId, productId } = req.body;
    const vendor = await Vendor.findById(vendorId);

    const product = vendor.items.find(item => item.product.toString() === productId);
    if (!product) return res.status(404).json({ message: 'Product not found in vendor' });

    product.requestCount += 1; // Increment the request count
    await vendor.save();

    res.status(200).json({ message: 'User request added successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertProduct,
  deleteProduct,
  addNewProduct,
  getProductStatus,
  viewProduct,
  userRequest,
};
