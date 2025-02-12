

// src/components/vendor/ProductList.js
import React from 'react';

const ViewProduct = ({ products }) => {
  return (
    <div className="mb-4">
      <h4>Product List</h4>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img src={product.image} alt={product.name} width="50" />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Status: {product.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};



export default ViewProduct;
