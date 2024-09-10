import React from 'react';

const Cart = ({ cart }) => (
  <div className="cart">
    <h2>Shopping Cart</h2>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cart.map((organ, index) => (
          <li key={index}>{organ.name} - {organ.price}</li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
