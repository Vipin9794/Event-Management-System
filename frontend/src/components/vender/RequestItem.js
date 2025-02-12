

// src/components/vendor/UserRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RequestItem = ({ vendorId, setStatus }) => {
  const [userRequestProductId, setUserRequestProductId] = useState('');

  const handleUserRequest = async () => {
    try {
      const response = await axios.post('/api/vendor/user-request', {
        vendorId,
        productId: userRequestProductId,
      });
      setStatus(response.data.message);
    } catch (error) {
      console.error('Failed to make user request:', error);
      setStatus('Failed to make user request');
    }
  };

  return (
    <div className="mb-4">
      <h4>Make a User Request</h4>
      <input
        type="text"
        placeholder="Product ID for user request"
        value={userRequestProductId}
        onChange={(e) => setUserRequestProductId(e.target.value)}
      />
      <button onClick={handleUserRequest}>Request Product</button>
    </div>
  );
};




export default RequestItem;
