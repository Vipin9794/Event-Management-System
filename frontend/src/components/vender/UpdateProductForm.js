import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { VIEW_PRO_API_END_POINT } from "../../utils/Constrient";

const UpdateProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
     

      try {
        console.log("Fetching product for ID:", productId);
        const response = await axios.get(`${VIEW_PRO_API_END_POINT}/${productId}`);

        if (!response.data || Object.keys(response.data).length === 0) {
          setError("Product not found!");
        } else {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(` http://localhost:5000/api/vendors/update-product/${productId}`, formData);
      alert("Product updated successfully");
      navigate("/view-product");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center">Update Product</h4>
      <div className="card p-4">
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData?.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData?.description || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData?.price || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Image URL:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData?.image || ""}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-success" onClick={handleUpdate}>
          Update Product
        </button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate("/view-product")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProductForm;
