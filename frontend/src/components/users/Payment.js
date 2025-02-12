import React, { useState } from 'react';
import { makePayment } from '../../api';

const Payment = ({ userId, cartItems }) => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.productId.price), 0);
      await makePayment(userId, totalAmount, cartItems);
      setPaymentStatus('Payment successful!');
    } catch (error) {
      console.error('Error during payment:', error);
      setPaymentStatus('Payment failed!');
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
