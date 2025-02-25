


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

// const VendorOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const vendorId = localStorage.getItem("vendorId");
//       if (!vendorId) {
//         setError("Vendor ID missing!");
//         return;
//       }

//       const response = await axios.get("http://localhost:5000/api/vendors/vendor-orders", {
//         params: { vendorId },
//       });
//       console.log("📦 Orders Data:", response.data); 

//       setOrders(response.data);
//       setError(null);
//     } catch (error) {
//       setError("Error fetching orders. Please try again later.");
//       console.error("Error fetching orders", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const vendorId = localStorage.getItem("vendorId"); // ✅ Get Vendor ID
  
//       if (!orderId || !vendorId) {
//         console.error("❌ Order ID or Vendor ID is missing!");
//         return;
//       }
  
//       console.log("🔄 Updating Order Status:", { orderId, vendorId, status });
  
//       await axios.put(
//         `http://localhost:5000/api/orders/update-status`, // ✅ Corrected API route
//         { orderId, vendorId, status }, // ✅ Sending required data
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
  
//       console.log("✅ Order Status Updated Successfully!");
//       fetchOrders(); // Refresh orders after update
//     } catch (error) {
//       console.error("❌ Error updating order status:", error.response?.data || error);
//     }
//   };
  
//   return (
//     <Container>
//       <h2 className="mt-4">Vendor Orders</h2>

//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <Row>
//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <Col md={6} key={order._id} className="mb-4">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>Product: {order.items?.[0]?.productId?.name || "No Product Info"}</Card.Title>
//                   <Card.Text>
//                     <strong>User:</strong> {order.userId?.name ?? "User Not Found"} ({order.userId?.email ?? "No Email"}) <br />
//                     <strong>Payment:</strong> {order.paymentMethod || "N/A"} <br />
//                     <strong>Status:</strong> {order.status || "Pending"}
//                   </Card.Text>
//                   <div className="d-flex flex-wrap">
//                     <Button variant="success" onClick={() => updateOrderStatus(order._id, "Accepted")}>
//                       Accept
//                     </Button>
//                     <Button variant="danger" className="ms-2" onClick={() => updateOrderStatus(order._id, "Rejected")}>
//                       Reject
//                     </Button>
//                     <Button variant="warning" className="ms-2" onClick={() => updateOrderStatus(order._id, "Pending")}>
//                       Pending
//                     </Button>
//                     <Button variant="info" className="ms-2" onClick={() => updateOrderStatus(order._id, "Delivered")}>
//                       Delivered
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           !loading && <p className="text-center">No orders found.</p>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default VendorOrders;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const vendorId = localStorage.getItem("vendorId");
      if (!vendorId) {
        setError("Vendor ID missing!");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/vendors/vendor-orders", {
        params: { vendorId },
      });
      console.log("📦 Orders Data:", response.data);

      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const vendorId = localStorage.getItem("vendorId");
      if (!orderId || !vendorId) {
        console.error("❌ Order ID or Vendor ID is missing!");
        return;
      }

      console.log("🔄 Updating Order Status:", { orderId, vendorId, status });

      await axios.put(
        `http://localhost:5000/api/vendors/update-status`, // ✅ Corrected API route
        { orderId, vendorId, status }, // ✅ Sending required data
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("✅ Order Status Updated Successfully!");
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("❌ Error updating order status:", error.response?.data || error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Vendor Orders</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Col md={6} key={order._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    Product: {order.items?.[0]?.productId?.name || "No Product Info"}
                  </Card.Title>
                  <Card.Text>
                    <strong>User:</strong> {order.userId?.name ?? "User Not Found"} ({order.userId?.email ?? "No Email"}) <br />
                    <strong>Payment:</strong> {order.paymentMethod || "N/A"} <br />
                    <strong>Status:</strong> {order.orderStatus || "Pending"}
                  </Card.Text>
                  <div className="d-flex flex-wrap">
                    <Button variant="success" onClick={() => updateOrderStatus(order._id, "Accepted")}>
                      Accept
                    </Button>
                    <Button variant="danger" className="ms-2" onClick={() => updateOrderStatus(order._id, "Rejected")}>
                      Reject
                    </Button>
                    <Button variant="warning" className="ms-2" onClick={() => updateOrderStatus(order._id, "Pending")}>
                      Pending
                    </Button>
                    <Button variant="info" className="ms-2" onClick={() => updateOrderStatus(order._id, "Delivered")}>
                      Delivered
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !loading && <p className="text-center">No orders found.</p>
        )}
      </Row>
    </Container>
  );
};

export default VendorOrders;
