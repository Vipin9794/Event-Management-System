import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your API URL
});

// Add item to cart
export const addToCart = (userId, productId, quantity) => {
  return api.post('/cart', { userId, productId, quantity });
};

// Remove item from cart
export const removeFromCart = (userId, productId) => {
  return api.delete(`/cart/${productId}`, { data: { userId } });
};

// View cart items
export const viewCart = (userId) => {
  return api.get(`/cart`, { params: { userId } });
};

// Make payment
export const makePayment = (userId, amount, items) => {
  return api.post('/payment', { userId, amount, items });
};

// Add guest to list
export const addToGuestList = (userId, vendorId) => {
  return api.post('/guest-list', { userId, vendorId });
};

// Update guest list status
export const updateGuestList = (userId, vendorId, status) => {
  return api.put('/guest-list', { userId, vendorId, status });
};

// Remove guest from list
export const removeFromGuestList = (vendorId) => {
  return api.delete(`/guest-list/${vendorId}`);
};

// Check order status
export const checkOrderStatus = (orderId) => {
  return api.get(`/order-status`, { params: { orderId } });
};
