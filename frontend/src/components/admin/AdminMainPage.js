
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_UPD_USER_API_END_POINT, ADD_UPD_VENDOR_API_END_POINT, ADDMEM_API_END_POINT } from '../../utils/Constrient';

function AdminMainPage() {
  const navigate = useNavigate();

  // State to hold data
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [memberships, setMemberships] = useState([]);

  // Fetch data from API
  useEffect(() => {
    // Fetch Users
    axios.post(`${ADD_UPD_USER_API_END_POINT}`).then((response) => setUsers(response.data)).catch((error) => console.error("Error fetching users:", error));

    // Fetch Vendors
    axios.get(`${ADD_UPD_VENDOR_API_END_POINT}`).then((response) => setVendors(response.data)).catch((error) => console.error("Error fetching vendors:", error));

    // Fetch Memberships
    axios.get(`${ADDMEM_API_END_POINT}`).then((response) => setMemberships(response.data)).catch((error) => console.error("Error fetching memberships:", error));
  }, []);


  return (
    <div className="container">
      <h2 className="text-center mt-4">Admin Dashboard</h2>
      <div className="d-flex flex-column align-items-center mt-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/add-update-user")}
        >
          Manage Users
        </button>
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate("/add-update-vendor")}
        >
          Manage Vendors
        </button>
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate("/add-membership")}
        >
          Add Membership
        </button>
        <button
          className="btn btn-info"
          onClick={() => navigate("/update-membership")}
        >
          Update Membership
        </button>
      </div>
        {/* User List */}
        <div className="mt-5">
        <h3>Users</h3>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>

      {/* Vendor List */}
      <div className="mt-5">
        <h3>Vendors</h3>
        <ul className="list-group">
          {vendors.map((vendor) => (
            <li key={vendor.id} className="list-group-item">
              {vendor.name} - {vendor.contact}
            </li>
          ))}
        </ul>
      </div>

      {/* Membership List */}
      <div className="mt-5">
        <h3>Memberships</h3>
        <ul className="list-group">
          {memberships.map((membership) => (
            <li key={membership.id} className="list-group-item">
              {membership.name} - {membership.price}$
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
}

export default AdminMainPage;
