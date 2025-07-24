import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import BannerCarousel from './components/BannerCarousel';
import Home from './pages/Home';
import CompareModal from './components/CompareModal';

import axios from 'axios';

const API_URL = 'http://localhost:3001/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products', err));
  }, []);

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <SearchBar value={search} onChange={setSearch} />
      <BannerCarousel />

      {/* Product Display + Selection */}
      <Home
        products={filtered}
        selectedProducts={selectedProducts}
        handleSelect={handleSelect}
      />

      

      {/* Modal */}
      {showCompareModal && (
        <CompareModal
          products={products}
          selectedProducts={selectedProducts}
          onClose={() => setShowCompareModal(false)}
        />
      )}
     

      <Footer />
    </div>
  );
}
