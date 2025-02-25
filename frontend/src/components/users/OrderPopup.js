// import React, { useState } from "react";
// import { Modal, Button, Form, Alert } from "react-bootstrap";
// import axios from "axios";

// const OrderPopup = ({ show, handleClose, userId,  cartItems, totalAmount }) => {
//   const [formData, setFormData] = useState({
//     address: "",
//     paymentMethod: "COD",
//   });

//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      //✅ Fetch Vendor ID properly (Assuming productId has vendorId)
//   // const vendorId = cartItems[0]?.productId?.vendorId;
//   // if (!vendorId) {
//   //   console.error("Vendor ID is missing!");
//   //   return;
//   // }

//   // ✅ Calculate Total Amount
//   const totalAmount = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
//   if (!totalAmount) {
//     console.error("Total Amount calculation failed!");
//     return;
//   }
//   // const formattedCartItems = cartItems.map(item => ({
//   //   productId: item.productId._id,  // Ensure only _id is sent
//   //   quantity: item.quantity
//   // }));
  
//     console.log("Form Data Before Submit:", formData); 
//     console.log("User ID:", userId);
//  // console.log("Vendor ID:", vendorId);
//   console.log("Cart Items:", cartItems);
//   console.log("Total Amount:", totalAmount);
//   console.log("Form Data:", formData);
//     try {
//       const orderData = {
//         userId,
//         productId,
//         items: cartItems, // 🛒 Cart me jo products hai wahi jayenge
//         totalAmount,
//         address: formData.address,
//         paymentMethod: formData.paymentMethod,
//       };

//       const response = await axios.post("http://localhost:5000/api/users/place-order", orderData);
//       setMessage(response.data.message);
//       setError(null);
//       setTimeout(() => {
//         handleClose(); // ✅ Order hone ke baad modal close ho jayega
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error placing order");
//       setMessage(null);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirm Your Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {message && <Alert variant="success">{message}</Alert>}
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Payment Method</Form.Label>
//             <Form.Control as="select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
//               <option value="COD">Cash on Delivery</option>
//               <option value="Online">Online Payment</option>
//             </Form.Control>
//           </Form.Group>

//           <Button variant="primary" type="submit" className="mt-3" block>
//             Place Order
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default OrderPopup;


import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const OrderPopup = ({ show, handleClose, userId, cartItems }) => {
  const [formData, setFormData] = useState({
    address: "",
    paymentMethod: "COD",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      setError("Cart is empty!");
      return;
    }

    // ✅ Calculate Total Amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

    // ✅ Prepare formatted cart data (Including Vendor ID)
    const formattedCartItems = cartItems.map(item => ({
      productId: item.productId._id,
      vendorId: item.productId.vendorId,  // Ensure vendorId exists
      quantity: item.quantity,
    }));

    // ✅ Debug Logs
    console.log("User ID:", userId);
    console.log("Cart Items:", formattedCartItems);
    console.log("Total Amount:", totalAmount);
    console.log("Form Data:", formData);

    try {
      const orderData = {
        userId,
        items: formattedCartItems,
        totalAmount,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      };

      const response = await axios.post("http://localhost:5000/api/users/place-order", orderData);
      setMessage(response.data.message);
      setError(null);

      setTimeout(() => {
        handleClose(); // ✅ Close modal after order success
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error placing order");
      setMessage(null);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Payment Method</Form.Label>
            <Form.Control as="select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 w-100">
            Place Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderPopup;

