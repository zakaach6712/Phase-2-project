import React, { useState } from 'react';
import {
  updateCartItem,
  removeCartItem,
  getCartItems,
  clearCartItems
} from '../api/api';

export default function Cart({ cartItems, refreshCart }) {
  const [isOpen, setIsOpen] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

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

  const handleCheckout = () => {
    setCheckingOut(true);
    clearCartItems().then(() =>
      getCartItems().then(res => {
        refreshCart(res.data);
        alert('Checkout complete! ');
        setCheckingOut(false);
      })
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <aside
      style={{
        width: isOpen ? '300px' : '40px',
        transition: 'width 0.3s ease',
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          marginBottom: '1rem',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.25rem 0.5rem'
        }}
      >
        {isOpen ? '➖ Hide' : '➕ Cart'}
      </button>

      {isOpen && (
        <>
          <h2>Your Cart</h2>
          {cartItems.length === 0 && <p>No items yet.</p>}
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                background: 'white',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '0.75rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
              }}
            >
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => handleQty(item.id, item.quantity - 1)}>
                  –
                </button>
                <span style={{ margin: '0 0.75rem' }}>{item.quantity}</span>
                <button onClick={() => handleQty(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </div>
          ))}
          <hr />
          <h3>Total: ${total.toFixed(2)}</h3>
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || checkingOut}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              marginTop: '0.5rem'
            }}
          >
            {checkingOut ? 'Processing...' : 'Checkout'}
          </button>
        </>
      )}
    </aside>
  );
}
