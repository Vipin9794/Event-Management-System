import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderPopup from "./OrderPopup";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // ✅ Declare userId properly
  console.log("User ID from localStorage:", userId);

  const fetchCart = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", userId);
    if (!userId) {
      toast.error("User not logged in! Redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/cart?userId=${userId}`
      );
      console.log("Fetched Cart Data:", response.data); // 🔍 Debugging
      setCart(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load cart.");
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
    console.log("Checking user & cart data...");
  // console.log("User ID:", currentUser?._id);
  // console.log("Cart Items:", cart?.items);
  // console.log("Total Amount:", cart?.totalPrice);
  }, [fetchCart]);

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId?._id === productId ? { ...item, quantity } : item
      ),
    }));
  };

  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not found! Please login.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/users/cart/remove`, {
        data: { userId, productId },
      });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) => item.productId._id !== productId
        ),
      }));
      toast.success("✅ Item removed from cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item.");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {loading ? (
        <p className="text-center">Loading your cart...</p>
      ) : cart.items.length > 0 ? (
        <div className="row justify-content-center">
          {cart.items.map((item, index) => {
            const product = item.productId || {};
            return (
              <div key={index} className="col-md-6 mb-4">
                <div className="card shadow-lg p-3">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={product.name || "Product Image"}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title text-primary">
                      {product.name || "Unknown Product"}
                    </h4>
                    <p className="card-text fs-5">
                      <strong>Price:</strong> ₹{product.price || 0} <br />
                      <strong>Quantity:</strong>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          updateQuantity(product._id, parseInt(e.target.value))
                        }
                        className="form-control w-50 d-inline mx-2"
                      />
                    </p>
                    <button
                      className="btn btn-danger btn-lg w-100"
                      onClick={() => removeFromCart(product._id)}
                    >
                      ❌ Remove Item
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}

      {cart.items.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg"
            onClick={() => setShowOrderModal(true)}
          >
            Place Order
          </button>
          
        </div>
      )}
       <OrderPopup
        show={showOrderModal}
        handleClose={() => setShowOrderModal(false)}
        // ✅ User ID pass kar raha hai
        userId={userId}
        cartItems={cart.items} 
        totalAmount={cart.totalPrice} 
      />

    </div>
  );
}

export default Cart;
