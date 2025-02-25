// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ADD_UPD_USER_API_END_POINT,
// //   ADD_UPD_VENDOR_API_END_POINT,
// //   ADDMEM_API_END_POINT,
// // } from "../../utils/Constrient";

// // function AdminMainPage() {
// //   const navigate = useNavigate();

// //   // State to hold data
// //   const [users, setUsers] = useState([]);
// //   const [vendors, setVendors] = useState([]);
// //   const [memberships, setMemberships] = useState([]);

// //   // Fetch data from API
// //   useEffect(() => {
// //     // Fetch Users
// //     axios
// //       .post(`${ADD_UPD_USER_API_END_POINT}`)
// //       .then((response) => setUsers(response.data))
// //       .catch((error) => console.error("Error fetching users:", error));

// //     // Fetch Vendors
// //     axios
// //       .get(`${ADD_UPD_VENDOR_API_END_POINT}`)
// //       .then((response) => setVendors(response.data))
// //       .catch((error) => console.error("Error fetching vendors:", error));

// //     // Fetch Memberships
// //     axios
// //       .get(`${ADDMEM_API_END_POINT}`)
// //       .then((response) => setMemberships(response.data))
// //       .catch((error) => console.error("Error fetching memberships:", error));
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h2 className="text-center mt-4">Admin Dashboard</h2>
// //       <div className="d-flex flex-column align-items-center mt-5">
// //         <button
// //           className="btn btn-primary mb-3"
// //           onClick={() => navigate("/add-update-user")}
// //         >
// //           Manage Users
// //         </button>
// //         <button
// //           className="btn btn-warning mb-3"
// //           onClick={() => navigate("/add-update-vendor")}
// //         >
// //           Manage Vendors
// //         </button>
// //         <button
// //           className="btn btn-success mb-3"
// //           onClick={() => navigate("/add-membership")}
// //         >
// //           Add Membership
// //         </button>
// //         <button
// //           className="btn btn-info"
// //           onClick={() => navigate("/update-membership")}
// //         >
// //           Update Membership
// //         </button>
// //       </div>
// //       {/* User List */}
// //       <div className="mt-5">
// //         <h3>Users</h3>
// //         <ul className="list-group">
// //           {users.map((user) => (
// //             <li key={user.id} className="list-group-item">
// //               {user.name} - {user.email}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Vendor List */}
// //       <div className="mt-5">
// //         <h3>Vendors</h3>
// //         <ul className="list-group">
// //           {vendors.map((vendor) => (
// //             <li key={vendor.id} className="list-group-item">
// //               {vendor.name} - {vendor.contact}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Membership List */}
// //       <div className="mt-5">
// //         <h3>Memberships</h3>
// //         <ul className="list-group">
// //           {memberships.map((membership) => (
// //             <li key={membership.id} className="list-group-item">
// //               {membership.name} - {membership.price}$
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminMainPage;

// // import axios from 'axios';
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { ADD_UPD_USER_API_END_POINT, ADD_UPD_VENDOR_API_END_POINT, ADDMEM_API_END_POINT } from '../../utils/Constrient';

// // function AdminMainPage() {
// //   const navigate = useNavigate();

// //   // State to hold data
// //   const [users, setUsers] = useState([]);
// //   const [vendors, setVendors] = useState([]);
// //   const [memberships, setMemberships] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch data from API
// //   useEffect(() => {
// //     setLoading(true);

// //     // Fetch Users
// //     axios.get(`${ADD_UPD_USER_API_END_POINT}`)
// //       .then((response) => {
// //         console.log("Users Data:", response.data); // Debugging
// //         setUsers(response.data.users || response.data || []);
// //       })
// //       .catch((error) => console.error("Error fetching users:", error));

// //     // Fetch Vendors
// //     axios.get(`${ADD_UPD_VENDOR_API_END_POINT}`)
// //       .then((response) => {
// //         console.log("Vendors Data:", response.data); // Debugging
// //         setVendors(response.data.vendors || response.data || []);
// //       })
// //       .catch((error) => console.error("Error fetching vendors:", error));

// //     // Fetch Memberships
// //     axios.get(`${ADDMEM_API_END_POINT}`)
// //       .then((response) => {
// //         console.log("Memberships Data:", response.data); // Debugging
// //         setMemberships(response.data.memberships || response.data || []);
// //       })
// //       .catch((error) => console.error("Error fetching memberships:", error));

// //     setLoading(false);
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h2 className="text-center mt-4">Admin Dashboard</h2>

// //       <div className="d-flex flex-column align-items-center mt-5">
// //         <button className="btn btn-primary mb-3" onClick={() => navigate("/add-update-user")}>
// //           Manage Users
// //         </button>
// //         <button className="btn btn-warning mb-3" onClick={() => navigate("/add-update-vendor")}>
// //           Manage Vendors
// //         </button>
// //         <button className="btn btn-success mb-3" onClick={() => navigate("/add-membership")}>
// //           Add Membership
// //         </button>
// //         <button className="btn btn-info" onClick={() => navigate("/update-membership")}>
// //           Update Membership
// //         </button>
// //       </div>

// //       {loading ? (
// //         <p className="text-center mt-5">Loading data...</p>
// //       ) : (
// //         <>
// //           {/* User List */}
// //           <div className="mt-5">
// //             <h3>Users</h3>
// //             {users.length === 0 ? <p>No users found.</p> : (
// //               <ul className="list-group">
// //                 {users.map((user) => (
// //                   <li key={user.id} className="list-group-item">
// //                     {user.name} - {user.email}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>

// //           {/* Vendor List */}
// //           <div className="mt-5">
// //             <h3>Vendors</h3>
// //             {vendors.length === 0 ? <p>No vendors found.</p> : (
// //               <ul className="list-group">
// //                 {vendors.map((vendor) => (
// //                   <li key={vendor.id} className="list-group-item">
// //                     {vendor.name} - {vendor.contact}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>

// //           {/* Membership List */}
// //           <div className="mt-5">
// //             <h3>Memberships</h3>
// //             {memberships.length === 0 ? <p>No memberships found.</p> : (
// //               <ul className="list-group">
// //                 {memberships.map((membership) => (
// //                   <li key={membership.id} className="list-group-item">
// //                     {membership.name} - {membership.price}$
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default AdminMainPage;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ADD_UPD_USER_API_END_POINT,
//   ADD_UPD_VENDOR_API_END_POINT,
//   ADDMEM_API_END_POINT,
// } from "../../utils/Constrient";

// function AdminMainPage() {
//   const navigate = useNavigate();

//   // State to hold data
//   const [users, setUsers] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [memberships, setMemberships] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from API
//   useEffect(() => {
//     setLoading(true);

//     Promise.all([
//       axios
//         .post(`${ADD_UPD_USER_API_END_POINT}`)
//         .then((res) => setUsers(res.data.users || res.data || [])),
//       axios
//         .post(`${ADD_UPD_VENDOR_API_END_POINT}`)
//         .then((res) => setVendors(res.data.vendors || res.data || [])),
//       axios
//         .post(`${ADDMEM_API_END_POINT}`)
//         .then((res) => setMemberships(res.data.memberships || res.data || [])),
//     ])
//       .catch((error) => console.error("Error fetching data:", error))
//       .finally(() => setLoading(false)); // Stop loading after all calls complete
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-center mt-4">Admin Dashboard</h2>

//       <div className="d-flex flex-column align-items-center mt-5">
//         <button
//           className="btn btn-primary mb-3"
//           onClick={() => navigate("/add-update-user")}
//         >
//           Manage Users
//         </button>
//         <button
//           className="btn btn-warning mb-3"
//           onClick={() => navigate("/add-update-vendor")}
//         >
//           Manage Vendors
//         </button>
//         <button
//           className="btn btn-success mb-3"
//           onClick={() => navigate("/add-membership")}
//         >
//           Add Membership
//         </button>
//         <button
//           className="btn btn-info"
//           onClick={() => navigate("/update-membership")}
//         >
//           Update Membership
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center mt-5">Loading data...</p>
//       ) : (
//         <>
//           {/* User List */}
//           <div className="mt-5">
//             <h3>Users</h3>
//             {users.length === 0 ? (
//               <p>No users found.</p>
//             ) : (
//               <ul className="list-group">
//                 {users.map((user) => (
//                   <li key={user._id} className="list-group-item">
//                     {user.name} - {user.email}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Vendor List */}
//           <div className="mt-5">
//             <h3>Vendors</h3>
//             {vendors.length === 0 ? (
//               <p>No vendors found.</p>
//             ) : (
//               <ul className="list-group">
//                 {vendors.map((vendor) => (
//                   <li key={vendor._id} className="list-group-item">
//                     {vendor.name} - {vendor.contact}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Membership List */}
//           <div className="mt-5">
//             <h3>Memberships</h3>
//             {memberships.length === 0 ? (
//               <p>No memberships found.</p>
//             ) : (
//               <ul className="list-group">
//                 {memberships.map((membership) => (
//                   <li key={membership._id} className="list-group-item">
//                     {membership.title} - ${membership.price}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default AdminMainPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ vendors: [], users: [], memberships: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/all-data"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div>
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
      <h2>Admin Dashboard</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Email / Price</th>
          </tr>
        </thead>
        <tbody>
          {data.vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor._id}</td>
              <td>Vendor</td>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
            </tr>
          ))}
          {data.users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>User</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          {data.memberships.map((membership) => (
            <tr key={membership._id}>
              <td>{membership._id}</td>
              <td>Membership</td>
              <td>{membership.type}</td>
              <td>{membership.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
