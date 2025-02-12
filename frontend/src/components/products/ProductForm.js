import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ productId, vendorId, onProductUpdated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  // If productId is provided, fetch the product details for update
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/products/${productId}`)
        .then((response) => {
          const product = response.data;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setImage(product.image);
        })
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name,
      description,
      price,
      image,
      vendorId,
    };

    if (productId) {
      axios
        .put(`http://localhost:5000/products/${productId}`, productData)
        .then((response) => {
          setLoading(false);
          onProductUpdated();
        })
        .catch((error) => {
          console.error('Error updating product:', error);
          setLoading(false);
        });
    } else {
      axios
        .post('http://localhost:5000/products', productData)
        .then((response) => {
          setLoading(false);
          onProductUpdated();
        })
        .catch((error) => {
          console.error('Error creating product:', error);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <h2>{productId ? 'Update Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : productId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
