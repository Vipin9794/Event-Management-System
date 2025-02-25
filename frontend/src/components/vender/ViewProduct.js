import React, { useState, useEffect } from "react";
import axios from "axios";
import { VIEW_PRO_API_END_POINT, DEL_PRO_API_END_POINT } from "../../utils/Constrient";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
 

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(VIEW_PRO_API_END_POINT);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${DEL_PRO_API_END_POINT}/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== productId));
        setStatus("Product deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      setStatus("Failed to delete product");
    }
  };

  

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Product List</h4>
      {status && <p className="text-center text-success">{status}</p>}
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card shadow-sm p-3">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price.toFixed(2)}</p>
                  <p className="card-text">
                    <strong>Status:</strong> {product.status || "N/A"}
                  </p>
                  <button
                    className="btn btn-danger mt-2 me-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/update-product/${product._id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>

     
    </div>
  );
};

export default ViewProduct;
