import React, { useState } from 'react';
import { addToCart, getCartItems } from '../api/api';

const fallbackImage = '/assets/placeholder.jpg'; // Optional fallback image

export default function ProductCard({ product, refreshCart }) {
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // ✨ Hover state

  const handleAdd = () => {
    setLoading(true);
    addToCart(product)
      .then(() => getCartItems())
      .then(res => refreshCart(res.data))
      .finally(() => setLoading(false));
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '1rem',
        boxShadow: isHovered
          ? '0 4px 12px rgba(0, 0, 0, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        textAlign: 'center',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
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
          backgroundColor: 'var(--button)', // define this in global styles or CSS
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold',
          boxShadow: isHovered ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? 'Adding…' : 'Add to Cart'}
      </button>
    </div>
  );
}
