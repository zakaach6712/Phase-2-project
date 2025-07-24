import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#FFA500',
        padding: '1rem 2rem',
        marginTop: '2rem',
        textAlign: 'center'
      }}
    >
      <p>
        &copy; 2025 QuickMart •{' '}
        <a href="/terms">Terms</a> •{' '}
        <a href="/contact">Contact</a>
      </p>
    </footer>
  );
}
