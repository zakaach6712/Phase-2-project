
import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import BannerCarousel from './components/BannerCarousel';
import axios from 'axios';


export default function App() {
      const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products', err));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <Header />
      <SearchBar value={search} onChange={setSearch} />
    
      <BannerCarousel />
      <Home products={filtered} />
      <Footer />
      
    </div>
  );
}
