

import React, { useState } from 'react';
import InsertItem from './InsertItem';
import ProductStatus from './ProductStatus';

const VendorDashboard = () => {
  const [status, setStatus] = useState(""); // ✅ Status state maintain karega

  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <InsertItem vendorId="12345" setStatus={setStatus} />  {/* ✅ Pass setStatus */}
      <ProductStatus status={status} />  {/* ✅ Status pass karein */}
    </div>
  );
};

export default VendorDashboard;
