import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Row } from 'react-bootstrap';
import { LOG_API_END_POINT } from '../../utils/Constrient';
import { useNavigate ,Link} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // Use hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Role:', role);

    try {
      const response = await axios.post(LOG_API_END_POINT, formData);
      setMessage(response.data.message); // Show success message
      setToken(response.data.token); // Store JWT token
      localStorage.setItem('token', response.data.token); // Save token in localStorage
      console.log('Role:', role);
      // Redirect to the respective dashboard based on the selected role
      if (role === 'vendor') {
        navigate('/vendorHome'); // Use navigate for redirection
      } else if (role === 'user') {
        navigate('/userHome'); // Use navigate for redirection
      } else if (role === 'admin') {
        navigate('/adminHome'); // Use navigate for redirection
      } else {
        alert('Please select a valid role.'); // Show alert if no role is selected
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred'); // Handle error properly
    }
  };

  return (
    <div className="container mt-5 w-50 bg-secondary ">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login User</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
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
            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <br />
            <button type="submit" className="btn btn-primary">Login</button>
            <span className="test-sm ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
          <div className="mt-3">
            <Link to="/forgot-password" className="text-blue-600">
              Forgot Password?
            </Link>
            </div>
          </form>

          {token && <div className="mt-3">JWT Token: {token}</div>}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
