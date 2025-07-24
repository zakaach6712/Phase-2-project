import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { getProducts, getCartItems } from '../api/api';

export default function Home({products}) {
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    
    getCartItems()
    .then(res => setCartItems(res.data))
     .catch(err => console.error('Error fetching cart items:'))
  }, []);

  return (
    <main style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      <ProductList products={products} refreshCart={setCartItems} />
      <Cart cartItems={cartItems} refreshCart={setCartItems} />
    </main>
  );
}
