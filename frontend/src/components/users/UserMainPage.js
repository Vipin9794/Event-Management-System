import React from "react";
import { useNavigate } from "react-router-dom";

function UserMainPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="text-center mt-4">User Dashboard</h2>
      <div className="d-flex flex-column align-items-center mt-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/guestList")}  // Consistent path
        >
          Guest List
        </button>
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate("/order-status")}
        >
          Track Order
        </button>
        <button
          className="btn btn-info"
          onClick={() => navigate("/payment")}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}

export default UserMainPage;
