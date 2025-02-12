


// import React, { useState } from 'react';
// import axios from 'axios';
// import { ADDMEM_API_END_POINT } from '../../utils/Constrient';

// const AddMembership = () => {
//   const [membershipData, setMembershipData] = useState({
//     title: '',
//     benefits: '',
//     price: '',
//     validUntil: '',
//   });

//   const handleChange = (e) => {
//     setMembershipData({ ...membershipData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(ADDMEM_API_END_POINT, membershipData)
//       .then((response) => {
//         alert('Membership added successfully');
//       })
//       .catch((error) => {
//         alert('Error: ' + error.message);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       <h3>Add Membership</h3>
//       <div className="mb-3">
//         <label>Title</label>
//         <input
//           type="text"
//           className="form-control"
//           name="title"
//           value={membershipData.title}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label>Benefits</label>
//         <textarea
//           className="form-control"
//           name="benefits"
//           value={membershipData.benefits}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label>Price</label>
//         <input
//           type="number"
//           className="form-control"
//           name="price"
//           value={membershipData.price}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label>Valid Until</label>
//         <input
//           type="date"
//           className="form-control"
//           name="validUntil"
//           value={membershipData.validUntil}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Add Membership
//       </button>
//     </form>
//   );
// };

// export default AddMembership;
import React, { useState } from 'react';
import axios from 'axios';
import { ADDMEM_API_END_POINT } from '../../utils/Constrient';

const AddMembership = () => {
  const [membershipData, setMembershipData] = useState({
    title: '',
    benefits: '',
    price: '',
    validUntil: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembershipData({ ...membershipData, [name]: value });
  };

  const validateForm = () => {
    const { title, benefits, price, validUntil } = membershipData;
    if (!title || !benefits || !price || !validUntil) {
      setError('All fields are required.');
      return false;
    }
    if (price <= 0) {
      setError('Price must be a positive number.');
      return false;
    }
    if (new Date(validUntil) < new Date()) {
      setError('Valid Until must be a future date.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess('');
    try {
      await axios.post(ADDMEM_API_END_POINT, membershipData);
      setSuccess('Membership added successfully!');
      setMembershipData({
        title: '',
        benefits: '',
        price: '',
        validUntil: '',
      });
    } catch (err) {
      setError('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3>Add Membership</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
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
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Adding...' : 'Add Membership'}
      </button>
    </form>
  );
};

export default AddMembership;
