

// src/components/vendor/Vendor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductDeletion from './ProductDeletion';
import UserRequestForm from './UserRequestForm';

const VendorMainPage = () => {
  const [vendorId, setVendorId] = useState('vendor123'); // Example vendor ID
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');

  // Fetch products for the vendor
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/vendor/view-product?vendorId=${vendorId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [vendorId]);

  return (
    <div className="container mt-4">
      <h2>Vendor Dashboard</h2>

      <div className="alert alert-info">
        {status && <p>{status}</p>}
      </div>

      {/* Insert New Product Form */}
      <ProductForm vendorId={vendorId} setStatus={setStatus} />

      {/* Delete Product Form */}
      <ProductDeletion vendorId={vendorId} setProducts={setProducts} setStatus={setStatus} />

      {/* User Request Form */}
      <UserRequestForm vendorId={vendorId} setStatus={setStatus} />

      {/* Product List */}
      <ProductList products={products} />
    </div>
  );
};



export default VendorMainPage;
