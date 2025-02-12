

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ADDMEM_API_END_POINT } from '../../utils/Constrient';

const MaintenanceMenu = ({ membershipId }) => {
  const [membershipData, setMembershipData] = useState({
    title: '',
    benefits: '',
    price: '',
    validUntil: '',
  });

  useEffect(() => {
    if (membershipId) {
      axios.get(`${ADDMEM_API_END_POINT}/${membershipId}`).then((response) => {
        setMembershipData(response.data);
      });
    }
  }, [membershipId]);

  const handleChange = (e) => {
    setMembershipData({ ...membershipData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/memberships/${membershipId}`, membershipData)
      .then((response) => {
        alert('Membership updated successfully');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3>Update Membership</h3>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={membershipData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Benefits</label>
        <textarea
          className="form-control"
          name="benefits"
          value={membershipData.benefits}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={membershipData.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Valid Until</label>
        <input
          type="date"
          className="form-control"
          name="validUntil"
          value={membershipData.validUntil}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Membership
      </button>
    </form>
  );
};



export default MaintenanceMenu;
