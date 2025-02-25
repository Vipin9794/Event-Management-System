
import React, { useState , useEffect } from "react";
import axios from "axios";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { Ins_Itm_API_END_POINT } from "../../utils/Constrient";

const InsertItem = ({ vendorId, setStatus }) => {
  const [productData, setProductData] = useState({
    vendorId,
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const vendorId = localStorage.getItem("vendorId"); // 🔥 Check if vendor ID is stored
    console.log("Vendor ID from localStorage:", vendorId);
}, []);


  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleInsertProduct = async (e) => {
    e.preventDefault();
    const vendorId = localStorage.getItem("vendorId"); // 🔥 Check if vendorId exists

    if (!vendorId) {
        console.error("Vendor ID is missing! please login again");
        return;
    }


    if (!productData.name ||!productData.name || !productData.price || !productData.description || !productData.image) {
      setError("All fields are required.");
      return;
    }
    console.log("API Endpoint:", Ins_Itm_API_END_POINT);
    console.log("Vendor ID:", vendorId);
    console.log("Request Payload:", JSON.stringify({
      ...productData,
      vendorId,
      price: Number(productData.price),
    }, null, 2));

    // console.log("Sending data:", {
    //   ...productData,
    //   vendorId,
    //   price: Number(productData.price),
    // });

    try {
      const response = await axios.post(Ins_Itm_API_END_POINT, {
        ...productData,
        vendorId,
        price: Number(productData.price),
      });
      setMessage(response.data.message);
      setError("");
      setProductData({
        vendorId: "",
        name: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to insert product:", error);
      setError(error.response?.data?.message || "Failed to insert product.");
    }
  };

  return (
    <div className="mb-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h4>Insert a New Product</h4>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleInsertProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                value={productData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter product price"
                value={productData.price}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter product description"
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={productData.image}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Insert Product
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default InsertItem;
