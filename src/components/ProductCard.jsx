import React, { useState } from 'react';
import { addToCart } from '../api/api';

const fallbackImage = '/assets/placeholder.jpg'; // Optional default image

export default function ProductCard({ product, refreshCart }) {
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    addToCart(product)
      .then(() => {
        // Refresh cart state
        refreshCart(prev => [...prev]);
      })
      .finally(() => setLoading(false));
  };
   
  


  return (
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <img
        src={imageError ? fallbackImage : product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      />
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
        {product.name}
      </h3>
      <p style={{ color: 'gray', marginBottom: '0.75rem', fontWeight: 'bold' }}>
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={handleAdd}
        disabled={loading}
        style={{
          backgroundColor: 'var(--button)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Adding…' : 'Add to Cart'}
      </button>
    </div>
  );
}
