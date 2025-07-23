import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, refreshCart }) {
  return (
    <section style={{ flex: 1 }}>
      <h2>Products</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}
      >
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            refreshCart={refreshCart}
          />
        ))}
      </div>
    </section>
  );
}
