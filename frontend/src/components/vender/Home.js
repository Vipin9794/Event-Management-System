import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./VendorDashboard.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="vendor-dashboard  container">
      <h2 className="text-center mt-4">Vendor Dashboard</h2>
      <div className="d-flex flex-column align-items-center mt-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/insert-item")}
        >
          Add New Item
        </button>
       
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate("/view-product" , { state: { products: [] } })}
        >
          View Products
        </button>
        <button
          className="btn btn-info"
          onClick={() => navigate("/view-orders")}
        >
          View Orders
        </button>
      </div>
    </div>
  );
}

export default Home;
