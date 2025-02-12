import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [productId]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <img src={product.image} alt={product.name} style={{ width: '300px' }} />
    </div>
  );
}

export default ProductDetails;
