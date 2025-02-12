import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="text-center mt-4">Vendor Dashboard</h2>
      <div className="d-flex flex-column align-items-center mt-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/insert-item")}
        >
          Add New Item
        </button>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/delete-item")}
        >
          Delete Item
        </button>
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate("/view-product")}
        >
          View Products
        </button>
        <button
          className="btn btn-info"
          onClick={() => navigate("/product-status")}
        >
          Check Product Status
        </button>
      </div>
    </div>
  );
}

export default Home;
