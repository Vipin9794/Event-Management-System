import React, { useState } from "react";
import axios from "axios";
import { REG_API_END_POINT } from "../../utils/Constrient";
//import Navbar from "../Navbar";
import { useNavigate , Link} from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

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

    try {
      const response = await axios.post(REG_API_END_POINT, formData);
      setMessage(response.data.message); // Show success message

      // Redirect based on role
    switch (formData.role) {
      case "vendor":
        navigate('/vendorHome');
        break;
      case "user":
        navigate('/userHome');
        break;
      case "admin":
        navigate('/adminHome');
        break;
      default:
        alert('Invalid role selected!');
    }
    } catch (error) {
      setMessage(error.response.data.message); // Show error message
    }
  };

  return (
    <div className="container mt-5 center">
      
      <h2>Register User</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
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
        {/* <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input type="redio" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required />
        </div> */}
        <div className="flex items-center gap-4 my-5">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="role" 
              id="role-user"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
              className="cursor-pointer"
            
              required 
            />
            <label htmlFor="role-user">User</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="role" 
              id="role-admin"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
              className="cursor-pointer"
              required 
            />
            <label htmlFor="role-admin">Admin</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="role" 
              id="role-vendor"
              value="vendor"
              checked={formData.role === "vendor"}
              onChange={handleChange}
              className="cursor-pointer"
              required 
            />
            <label htmlFor="role-vendor">Vendor</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        <span className="test-sm mr-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
      </form>
    </div>
  );
};

export default SignUp;
