// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

// const UserOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const userId = localStorage.getItem("userId"); // Get user ID from localStorage

//       if (!userId) {
//         setError("User ID missing!");
//         return;
//       }

//       const response = await axios.get("http://localhost:5000/api/users/user-orders", {
//         params: { userId },
//       });

//       console.log("📦 User Orders:", response.data);
//       setOrders(response.data);
//       setError(null);
//     } catch (error) {
//       setError("Error fetching orders. Please try again later.");
//       console.error("Error fetching user orders", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <h2 className="mt-4">My Orders</h2>

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
//                     <strong>Order ID:</strong> {order._id} <br />
//                     <strong>Payment:</strong> {order.paymentMethod || "N/A"} <br />
//                     <strong>Status:</strong> <span className="fw-bold">{order.orderStatus || "Pending"}</span>
//                   </Card.Text>
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

// export default UserOrders;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get user ID from localStorage

      if (!userId) {
        setError("User ID missing!");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/users/user-orders", {
        params: { userId },
      });

      console.log("📦 User Orders:", response.data);
      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
      console.error("Error fetching user orders", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">My Orders</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Col md={6} key={order._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Vendor name: {order.vendorId?.name}</Card.Title>
                  <Card.Text>
                    <strong>Payment Method:</strong> {order.paymentMethod || "N/A"} <br />
                    <strong>Status:</strong> <span className="fw-bold">{order.orderStatus || "Pending"}</span>
                  </Card.Text>

                  {/* Display all ordered products */}
                  {order.items?.map((item, index) => (
                    <Card key={index} className="mt-3">
                      <Row className="g-0">
                        {/* Product Image */}
                        <Col md={4}>
                          <Card.Img
                            src={item.productId?.image || "https://via.placeholder.com/150"}
                            alt="Product Image"
                            className="img-fluid p-2"
                          />
                        </Col>

                        {/* Product Details */}
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title>{item.productId?.name || "No Product Info"}</Card.Title>
                            <Card.Text>
                              <strong>Price:</strong> ₹{item.productId?.price || "N/A"} <br />
                              <strong>Quantity:</strong> {item.quantity || 1} <br />
                              <strong>Description:</strong> {item.productId?.description || "No description available."}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}
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

export default UserOrders;
