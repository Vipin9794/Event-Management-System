import React, { useState } from 'react';

function Vendor() {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Catering Service', description: 'Provides food and drinks for events' },
    { id: 2, name: 'Decoration Team', description: 'Handles decoration and venue setup' },
    { id: 3, name: 'Sound and Lights', description: 'Provides sound and lighting equipment' }
  ]);

  const addVendor = (newVendor) => {
    setVendors([...vendors, newVendor]);
  };

  const deleteVendor = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  return (
    <div className="mt-4">
      <h2>Event Vendor Management</h2>
      <div className="mb-3">
        <h4>Add New Vendor</h4>
        <button
          onClick={() => {
            const newVendor = {
              id: vendors.length + 1,
              name: `Vendor ${vendors.length + 1}`,
              description: 'New vendor offering event services',
            };
            addVendor(newVendor);
          }}
          className="btn btn-success"
        >
          Add Vendor
        </button>
      </div>

      <h4>List of Event Vendors</h4>
      <ul className="list-group">
        {vendors.map((vendor) => (
          <li key={vendor.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{vendor.name}</strong>
              <p>{vendor.description}</p>
            </div>
            <button
              onClick={() => deleteVendor(vendor.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vendor;
