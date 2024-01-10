import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const date = moment().format("YYYY-MM-DD");
  // console.log(date);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `http://api.exchangeratesapi.io/v1/${date}?access_key=${
            import.meta.env.VITE_API_ACCESS_KEY
          }`
        );
        const currencyList = Object.keys(response.data.rates);
        // console.log(currencyList);
        setCurrencies(currencyList);
        setFromCurrency(currencyList[0]);
        setToCurrency(currencyList[1]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [date]);

  const convertCurrency = () => {
    const convertedAmount = amount * exchangeRate;
    console.log(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
  };

  return (
    <div>
      <h1>Real-time Currency Converter</h1>
      <div>
        <label>From Currency:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={convertCurrency}>Convert</button>
    </div>
  );
};

export default Home;
