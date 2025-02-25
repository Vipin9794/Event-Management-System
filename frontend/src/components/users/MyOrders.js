import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/users/orders?userId=${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 My Orders</h2>

      {orders.length > 0 ? (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item">
              <h5>Order ID: {order._id}</h5>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
