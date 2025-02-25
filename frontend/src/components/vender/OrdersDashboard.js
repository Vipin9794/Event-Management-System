import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    
    try {
       
        const vendorId = localStorage.getItem("vendorId"); // Vendor ID को localStorage से लो
            
        if (!vendorId) {
            console.error("Vendor ID missing!");
            return;
        }

        const response = await axios.get("http://localhost:5000/api/vendors/vendor-orders", {
            params: { vendorId },
        });
        setOrders(response.data);
    } catch (error) {
        console.error("Error fetching orders", error);
    }
};


  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Vendor Orders</h2>
      <Row>
        {orders.map((order) => (
          <Col md={4} key={order._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Product: {order.product.name}</Card.Title>
                <Card.Text>
                  <strong>User:</strong> {order.user.name} ({order.user.email}) <br />
                  <strong>Payment:</strong> {order.paymentMethod} <br />
                  <strong>Status:</strong> {order.status}
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => updateOrderStatus(order._id, "Accepted")}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => updateOrderStatus(order._id, "Rejected")}
                >
                  Reject
                </Button>
                <Button
                  variant="warning"
                  className="ms-2"
                  onClick={() => updateOrderStatus(order._id, "Pending")}
                >
                  Pending
                </Button>
                <Button
                  variant="info"
                  className="ms-2"
                  onClick={() => updateOrderStatus(order._id, "Delivered")}
                >
                  Delivered
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VendorOrders;
