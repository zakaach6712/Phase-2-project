import React from 'react';
import { updateCartItem, removeCartItem, getCartItems } from '../api/api';

export default function Cart({ cartItems, refreshCart }) {
  const handleQty = (id, qty) => {
    if (qty < 1) {
      removeCartItem(id).then(() =>
        getCartItems().then(res => refreshCart(res.data))
      );
    } else {
      updateCartItem(id, qty).then(() =>
        getCartItems().then(res => refreshCart(res.data))
      );
    }
  };

  const total = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <aside style={{ width: '300px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>No items yet.</p>}
      {cartItems.map(item => (
        <div
          key={item.id}
          style={{
            background: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            marginBottom: '0.5rem'
          }}
        >
          <h4>{item.name}</h4>
          <p>${item.price.toFixed(2)}</p>
          <div>
            <button
              onClick={() =>
                handleQty(item.id, item.quantity - 1)
              }
            >
              –
            </button>
            <span style={{ margin: '0 0.5rem' }}>
              {item.quantity}
            </span>
            <button
              onClick={() =>
                handleQty(item.id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <hr />
      <h3>Total: ${total.toFixed(2)}</h3>
      <button disabled={cartItems.length === 0}>
        Checkout
      </button>
    </aside>
  );
}
