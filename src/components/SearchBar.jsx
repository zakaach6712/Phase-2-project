import React from 'react';

export default function SearchBar({value, onChange}) {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '1rem 2rem',
      textAlign: 'center',
      borderBottom: '1px solid #eee',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
    }}>
      <input
        type="text"
        value={value}
        onChange={e  => onChange(e.target.value)}
        placeholder="Search products..."
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          width: '300px',
          maxWidth: '100%',
          backgroundColor: '#f9f9f9',
          color: '#333',
          outline: 'none'
        }}
      />
    </div>
  );
}
