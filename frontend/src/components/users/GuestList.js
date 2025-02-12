import React, { useState } from 'react';
import { addToGuestList, removeFromGuestList } from '../../api';

const GuestList = ({ userId }) => {
  const [vendorId, setVendorId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleAddToGuestList = async () => {
    try {
      await addToGuestList(userId, vendorId);
      setStatusMessage('Guest added to list successfully!');
    } catch (error) {
      console.error('Error adding guest to list:', error);
      setStatusMessage('Failed to add guest.');
    }
  };

  const handleRemoveFromGuestList = async () => {
    try {
      await removeFromGuestList(vendorId);
      setStatusMessage('Guest removed from list successfully!');
    } catch (error) {
      console.error('Error removing guest:', error);
      setStatusMessage('Failed to remove guest.');
    }
  };

  return (
    <div>
      <h2>Manage Guest List</h2>
      <input 
        type="text" 
        placeholder="Enter Vendor ID" 
        value={vendorId} 
        onChange={(e) => setVendorId(e.target.value)} 
      />
      <button onClick={handleAddToGuestList}>Add to Guest List</button>
      <button onClick={handleRemoveFromGuestList}>Remove from Guest List</button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default GuestList;
