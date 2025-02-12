// import React, { useState } from 'react';

// function Cart() {
//   const [cart, setCart] = useState([
//     { id: 1, name: 'Catering Service', quantity: 2, price: 500 },
//     { id: 2, name: 'Decoration Team', quantity: 1, price: 700 }
//   ]);

//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);

//   return (
//     <div className="mt-4">
//       <h2>Your Cart</h2>
//       <ul className="list-group">
//         {cart.map(item => (
//           <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//               <strong>{item.name}</strong>
//               <p>Quantity: {item.quantity} - Price: ${item.price}</p>
//             </div>
//             <button
//               onClick={() => removeItem(item.id)}
//               className="btn btn-danger"
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//       <h4>Total: ${totalAmount}</h4>
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState } from 'react';
//import { viewCart, removeFromCart } from '../api';
import { viewCart, removeFromCart } from '../../api';  // Adjust the relative path


const Cart = ({ userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await viewCart(userId);
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [userId]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(userId, productId);
      const updatedCart = cart.items.filter(item => item.productId !== productId);
      setCart({ ...cart, items: updatedCart });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart ? (
        <div>
          <ul>
            {cart.items.map(item => (
              <li key={item.productId}>
                <span>{item.productId.name} - {item.quantity} x {item.productId.price}</span>
                <button onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: {cart.items.reduce((total, item) => total + (item.quantity * item.productId.price), 0)}</p>
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
};

export default Cart;
