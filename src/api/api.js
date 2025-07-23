import axios from 'axios';

const BASE = 'http://localhost:3001';
const EX_BASE = 'https://v6.exchangerate-api.com/v6';
const KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const getProducts = () =>
  axios.get(`${BASE}/products`);

export const getCartItems = () =>
  axios.get(`${BASE}/cart`);

export const addToCart = product =>
  axios.post(`${BASE}/cart`, { ...product, quantity: 1 });

export const updateCartItem = (id, quantity) =>
  axios.patch(`${BASE}/cart/${id}`, { quantity });

export const removeCartItem = id =>
  axios.delete(`${BASE}/cart/${id}`);

export const getExchangeRates = () =>
  axios.get(`${EX_BASE}/${KEY}/latest/USD`);
