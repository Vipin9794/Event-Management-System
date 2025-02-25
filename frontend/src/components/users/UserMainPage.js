// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function UserMainPage() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);


//   useEffect(() => {
//     // Fetch products from backend
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/vendors/view-product");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-center mt-4">User Dashboard</h2>

//       {/* Navigation Buttons */}
//       <div className="d-flex flex-column align-items-center mt-4">
//         <button className="btn btn-primary mb-3" onClick={() => navigate("/cart")}>
//           View Cart
//         </button>
//         <button className="btn btn-warning mb-3" onClick={() => navigate("/guestList")}>
//           Guest List
//         </button>
//         <button className="btn btn-success mb-3" onClick={() => navigate("/order-status")}>
//           Track Order
//         </button>
//         <button className="btn btn-info" onClick={() => navigate("/payment")}>
//           Make Payment
//         </button>
//       </div>

//       {/* Products List - 3 per row */}
//       <h3 className="mt-5">Available Products</h3>
//       <div className="row mt-3">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="col-md-4 mb-4">
//               <div className="card h-100 shadow">
//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">{product.description}</p>
//                   <h6 className="text-primary">₹{product.price}</h6>
//                   <button className="btn btn-success mt-2" onClick={() => navigate("/cart")}>
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No products available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserMainPage;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserMainPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vendors/view-product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Function to Add Product to Cart
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    const vendorId = localStorage.getItem("vendorId");

    if (!userId) {
      toast.error("Please login to add products to cart!");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
       await axios.post("http://localhost:5000/api/users/cart/add", {
        userId,
        vendorId,
        productId,
        quantity: 1, // Default quantity 1
      });

      toast.success("🛒 Product added to cart!");
     // toast.success("🛒 Product added to cart!");
    
      // ✅ Product add hone ke turant baad Cart Page par navigate karna
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2 className="text-center mt-4">User Dashboard</h2>

      {/* Navigation Buttons */}
      <div className="d-flex flex-column align-items-center mt-4">
        <button className="btn btn-primary mb-3" onClick={() => navigate("/cart")}>
          View Cart
        </button>
        <button className="btn btn-warning mb-3" onClick={() => navigate("/guestList")}>
          Guest List
        </button>
        <button className="btn btn-success mb-3" onClick={() => navigate("/order-status")}>
          Track Order
        </button>
        <button className="btn btn-info" onClick={() => navigate("/payment")}>
          Make Payment
        </button>
      </div>

      {/* Products List - 3 per row */}
      <h3 className="mt-5">Available Products</h3>
      <div className="row mt-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <h6 className="text-primary">₹{product.price}</h6>
                  <button
                    className="btn btn-success mt-2 w-100"
                    onClick={() => handleAddToCart(product._id)}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "🛒 Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </div>
  );
}

export default UserMainPage;
