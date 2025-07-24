import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CompareModal from './CompareModal';

export default function ProductList({ products, refreshCart }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  };

  return (
    <section style={{ flex: 1, padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Products</h2>
      
      {/* Compare Button */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          disabled={selectedProducts.length < 2}
          onClick={() => setShowCompare(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: selectedProducts.length < 2 ? '#ccc' : '#10b981',
            color: 'white',
            borderRadius: '6px',
            cursor: selectedProducts.length < 2 ? 'not-allowed' : 'pointer',
            border: 'none'
          }}
        >
          Compare Selected
        </button>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ position: 'relative' }}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(p.id)}
              onChange={() => handleSelect(p.id)}
              style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 2 }}
            />
            <ProductCard product={p} refreshCart={refreshCart} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCompare && (
        <CompareModal
          products={products}
          selectedProducts={selectedProducts}
          onClose={() => setShowCompare(false)}
        />
      )}
    </section>
  );
}
