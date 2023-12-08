// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const headerStyle = {
  backgroundColor: 'lightgoldenrodyellow',
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color 0.5s ease',
  fontFamily: 'IBM Plex Mono, monospace', // Apply the Google Font
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
};

const labelStyle = {
  fontFamily: 'IBM Plex Mono, monospace', // Apply the Google Font
  marginBottom: '10px',
};

const buttonStyle = {
  fontFamily: 'IBM Plex Mono, monospace', // Apply the Google Font
  marginBottom: '10px',
  cursor: 'pointer',
};

const API_KEY = 'fca_live_TP1MXg6oso076o2N0v0G79hWLvLLe1BGV01QKXne'; // Your API key

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch available currencies when the component mounts
    async function fetchCurrencies() {
      try {
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
        const availableCurrencies = Object.keys(response.data);
        setCurrencies(availableCurrencies);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCurrencies();
  }, []);

  const convert = async () => {
    try {
      const response = await axios.get(`https://api.freecurrencyapi.com/v1/convert?from=${fromCurrency}&to=${toCurrency}&apikey=${API_KEY}`);
      const convertedResult = amount * response.data.rate;
      setResult(`${convertedResult.toFixed(2)} ${toCurrency}`);
    } catch (error) {
      console.error(error);
      alert('Failed to convert currency. Please try again.');
    }
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={{ margin: 0, color: 'darkgoldenrod' }}>Jason's Currency Converter</h1>
      </header>

      <div style={containerStyle}>
        <label htmlFor="amount" style={labelStyle}>
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        <label htmlFor="fromCurrency" style={labelStyle}>
          From Currency:
        </label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{ marginBottom: '10px' }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label htmlFor="toCurrency" style={labelStyle}>
          To Currency:
        </label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ marginBottom: '10px' }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button onClick={convert} style={buttonStyle}>
          Convert
        </button>

        <p id="result">Result: {result}</p>
      </div>
    </div>
  );
}

export default CurrencyConverter;





