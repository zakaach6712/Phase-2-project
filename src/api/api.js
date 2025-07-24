import axios from 'axios';

const BASE = 'http://localhost:3001'; // Local json-server endpoint
const EX_BASE = 'https://v6.exchangerate-api.com/v6'; // Exchange rate API
const KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY; // Key from .env

//  PRODUCTS
export const getProducts = () => axios.get(`${BASE}/products`);

//  CART OPERATIONS

// Fetch cart items
export const getCartItems = () => axios.get(`${BASE}/cart`);

// Smart add to cart: updates quantity if item already exists
export const addToCart = async (product) => {
  const existing = await axios.get(`${BASE}/cart?id=${product.id}`);
  if (existing.data.length > 0) {
    const currentQty = existing.data[0].quantity;
    return axios.patch(`${BASE}/cart/${product.id}`, { quantity: currentQty + 1 });
  }
  return axios.post(`${BASE}/cart`, { ...product, quantity: 1 });
};

// Update quantity
export const updateCartItem = (id, quantity) =>
  axios.patch(`${BASE}/cart/${id}`, { quantity });

// Remove an item
export const removeCartItem = id =>
  axios.delete(`${BASE}/cart/${id}`);

// Clear cart entirely (e.g. during checkout)
export const clearCartItems = () =>
  axios.get(`${BASE}/cart`).then(res => {
    const deletePromises = res.data.map(item =>
      axios.delete(`${BASE}/cart/${item.id}`)
    );
    return Promise.all(deletePromises);
  });

//  EXCHANGE RATE API
export const getExchangeRates = () =>
  axios.get(`${EX_BASE}/${KEY}/latest/USD`);
