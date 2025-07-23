import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../api/api';
import trolleyLogo from '../logo-image/trolley-image.jpg'; // ✅ Import your logo image

export default function Header() {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRates = () => {
    setLoading(true);
    setError(false);
    getExchangeRates()
      .then(res => {
        const kes = res.data?.conversion_rates?.KES;
        if (kes) {
          setRate(kes);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        color: '#333',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        fontFamily: 'Segoe UI, sans-serif',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={trolleyLogo}
          alt="QuickMart Logo"
          style={{
            height: '60px',
            width: '60px',
            marginRight: '0.6rem',
            objectFit: 'contain',
            borderRadius:'35px'
          }}
        />
        <h1 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '600',
          fontFamily: 'Montserrat, sans-serif',
          color: '#0073e6'
        }}>
          QuickMart
        </h1>
      </div>

      <div style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
        {loading && ' Updating exchange rate...'}
        {error && (
          <>
            ⚠️ Error loading rates
            <button
              onClick={fetchRates}
              style={{
                marginLeft: '0.5rem',
                background: '#0073e6',
                color: '#fff',
                border: 'none',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Retry
            </button>
          </>
        )}
        {rate && !loading && !error && (
          <span style={{ color: '#0073e6', fontWeight: '500' }}>
             1 USD = {rate.toFixed(2)} KES
          </span>
        )}
      </div>
    </header>
  );
}
