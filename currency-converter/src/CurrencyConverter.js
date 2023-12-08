import React, {useState, useEffect} from 'react';
import axious from 'axios';

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
          const response = await axios.get('YOUR_API_ENDPOINT');
          const availableCurrencies = Object.keys(response.data.rates);
          setCurrencies(availableCurrencies);
        } catch (error) {
          console.error(error);
        }
      }

      fetchCurrencies();
  }, []);

  const convert = async () => {
    try {
      const response = await axios.get('/api/currency');
      const rates = response.data;

      // Perform the currency conversion
      const convertedResult = (amount * rates[toCurrency]) / rates[fromCurrency];
      setResult(`${convertedResult.toFixed(2)} ${toCurrency}`);
    } catch (error) {
      console.error(error);
      alert('Failed to convert currency. Please try again.');
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label htmlFor="fromCurrency">From Currency:</label>
      <select
        id="fromCurrency"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <label htmlFor="toCurrency">To Currency:</label>
      <select
        id="toCurrency"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <button onClick={convert}>Convert</button>

      <p id="result">Result: {result}</p>
    </div>
  );
}

export default CurrencyConverter;