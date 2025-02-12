import React, { useState } from 'react';
import { checkOrderStatus } from '../../api';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const handleCheckStatus = async () => {
    try {
      const { data } = await checkOrderStatus(orderId);
      setOrderStatus(data.status);
    } catch (error) {
      console.error('Error fetching order status:', error);
      setOrderStatus('Error fetching status');
    }
  };

  return (
    <div>
      <h2>Check Order Status</h2>
      <input 
        type="text" 
        placeholder="Enter Order ID" 
        value={orderId} 
        onChange={(e) => setOrderId(e.target.value)} 
      />
      <button onClick={handleCheckStatus}>Check Status</button>
      {orderStatus && <p>Order Status: {orderStatus}</p>}
    </div>
  );
};

export default OrderStatus;
