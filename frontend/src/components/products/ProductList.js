import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/products/${productId}`)
      .then((response) => {
        fetchProducts(); // Refresh product list after deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdated = () => {
    setSelectedProduct(null); // Reset form after updating product
    fetchProducts(); // Fetch updated list
  };

  return (
    <div>
      <h1>Product Management</h1>

      <button onClick={() => setSelectedProduct(null)}>Add New Product</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            {products.map((product) => (
              <div key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductForm
          productId={selectedProduct._id}
          vendorId={selectedProduct.vendor}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}

export default ProductList;
