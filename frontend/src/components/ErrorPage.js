import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>
        {error?.statusText || error?.message || "The page you're looking for doesn't exist."}
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default ErrorPage;
