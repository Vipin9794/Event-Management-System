import React, { useState } from 'react';

function UpdateMembership() {
  const [membershipId, setMembershipId] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Membership ID: ${membershipId} updated to ${updatedDetails}`);
  };

  return (
    <div className="mt-4">
      <h2>Update Membership</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Membership ID</label>
          <input
            type="text"
            className="form-control"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Updated Details</label>
          <input
            type="text"
            className="form-control"
            value={updatedDetails}
            onChange={(e) => setUpdatedDetails(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">Update</button>
      </form>
    </div>
  );
}

export default UpdateMembership;
