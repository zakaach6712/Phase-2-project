import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../api/api';

export default function Header() {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    getExchangeRates()
      .then(res => setRate(res.data.conversion_rates.KES))
      .catch(() => console.warn('Failed to load rates'));
  }, []);

  return (
    <header
      style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <h1>QuickMart</h1>
      <div>
        {rate
          ? `1 USD = ${rate.toFixed(2)} KES`
          : 'Loading rates...'}
      </div>
    </header>
  );
}
