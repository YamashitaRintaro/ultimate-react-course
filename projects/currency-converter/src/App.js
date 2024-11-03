// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [conversionAmount, setConversionAmount] = useState(1);
  const [sourceCurrency, setSourceCurrency] = useState('EUR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [conversionResult, setConversionResult] = useState('OUTPUT');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  function handleAmountChange(e) {
    setConversionAmount(e.target.value);
  }

  function handleSourceCurrencyChange(e) {
    setSourceCurrency(e.target.value);
  }

  function handleTargetCurrencyChange(e) {
    setTargetCurrency(e.target.value);
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchCurrencyConversion() {
      try {
        setIsLoading(true);
        setFetchError("");

        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${conversionAmount}&from=${sourceCurrency}&to=${targetCurrency}`,
          { signal: abortController.signal }
        );

        if (!response.ok) throw new Error("Failed to fetch currency conversion data.");

        const data = await response.json();

        setConversionResult(data.rates[targetCurrency]);
        setFetchError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.message);
          setFetchError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (sourceCurrency === targetCurrency) return setConversionResult(conversionAmount)
    fetchCurrencyConversion();

    return () => {
      abortController.abort();
    };
  }, [conversionAmount, sourceCurrency, targetCurrency]);

  return (
    <div>
      <input type="text" value={conversionAmount} onChange={handleAmountChange} disabled={isLoading} />
      <select value={sourceCurrency} onChange={handleSourceCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? <LoadingIndicator /> : null}
      {!isLoading && !fetchError && <p>{conversionResult} {targetCurrency}</p>}
      {fetchError ? <ErrorDisplay message={fetchError} /> : null}
    </div>
  );

  function LoadingIndicator() {
    return <p>Loading...</p>;
  }

  function ErrorDisplay({ message }) {
    return (
      <p className="error">
        <span>⛔️</span> {message}
      </p>
    );
  }
}
