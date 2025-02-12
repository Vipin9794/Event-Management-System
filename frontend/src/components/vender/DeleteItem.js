

// src/components/vendor/ProductDeletion.js
import React, { useState } from 'react';
import axios from 'axios';

const DeleteItem = ({ vendorId, setProducts, setStatus }) => {
  const [productIdToDelete, setProductIdToDelete] = useState('');

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/vendor/delete-product/${productIdToDelete}`, {
        data: { vendorId },
      });
      setProducts(response.data);
      setStatus('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      setStatus('Failed to delete product');
    }
  };

  return (
    <div className="mb-4">
      <h4>Delete a Product</h4>
      <input
        type="text"
        placeholder="Product ID to delete"
        value={productIdToDelete}
        onChange={(e) => setProductIdToDelete(e.target.value)}
      />
      <button onClick={handleDeleteProduct}>Delete Product</button>
    </div>
  );
};


export default DeleteItem;
