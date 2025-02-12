

// src/components/vendor/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InsertItem = ({ vendorId, setStatus }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const handleInsertProduct = async () => {
    try {
      const response = await axios.post('/api/vendor/insert-product', {
        ...productData,
        vendorId,
      });
      setStatus(response.data.message);
      setProductData({
        name: '',
        price: '',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error('Failed to insert product:', error);
      setStatus('Failed to insert product');
    }
  };

  return (
    <div className="mb-4">
      <h4>Insert a New Product</h4>
      <input
        type="text"
        placeholder="Product Name"
        value={productData.name}
        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={productData.price}
        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
      />
      <textarea
        placeholder="Product Description"
        value={productData.description}
        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Image URL"
        value={productData.image}
        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
      />
      <button onClick={handleInsertProduct}>Insert Product</button>
    </div>
  );
};

export default InsertItem;
