

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Row } from 'react-bootstrap';
import { LOG_API_END_POINT } from '../../utils/Constrient';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });


  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // Handle input changes (email, password, role)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData);

    try {
      const response = await axios.post(LOG_API_END_POINT, formData);
      console.log("🔥 Full Response from Server:", response);

      const { userId , role, token } = response.data;
      console.log("Vendor ID from response:", response.data.vendorId);

      // Ensure userId or vendorId exists
      if (!userId ) {
        console.error("❌ Login failed! No userId received.");
        alert("Login failed! No userId received.");
        return;
      }

      // Store necessary data in localStorage
      localStorage.setItem("userId", userId );
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      // Store vendorId only if the user is a vendor
      if (role === "vendor"  ) {
        const newVendorId = userId;
        localStorage.setItem("vendorId", newVendorId);
       // localStorage.setItem("vendorId", userId);
        console.log("✅ Vendor ID Stored:", newVendorId);
    //     localStorage.setItem("vendorId", vendorId);
    //     console.log("✅ Vendor ID Stored:", vendorId);
    //     localStorage.setItem("vendorId", user.vendorId);
     
    // //    console.log("Vendor ID stored:", vendorId);
    //     const newVendorId = response.data.vendorId;
        
    //     localStorage.setItem("vendorId", newVendorId);
    //     console.log("Vendor ID:", newVendorId);
      }
      setUser(response.data.user); // ✅ user को update किया
      setMessage("Login successful");
      setToken(token);

      // Redirect user based on role
      switch (role) {
        case 'vendor':
          navigate('/vendorHome');
          break;
        case 'user':
          navigate('/userHome');
          break;
        case 'admin':
          navigate('/adminHome');
          break;
        default:
          alert('Invalid role selected.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
      console.log("❌ API Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5 w-50 bg-secondary p-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login User</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role Selection */}
            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <br />
            <button type="submit" className="btn btn-primary w-100">Login</button>

            {/* Signup Link */}
            <div className="mt-3">
              <span className="test-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600">Signup</Link>
              </span>
            </div>

            {/* Forgot Password Link */}
            <div className="mt-3">
              <Link to="/forgot-password" className="text-blue-600">
                Forgot Password?
              </Link>
            </div>
          </form>

          {/* JWT Token Display (for debugging) */}
          {token && <div className="mt-3">JWT Token: {token}</div>}
        </Col>
      </Row>
    </div>
  );
};

export default Login;

