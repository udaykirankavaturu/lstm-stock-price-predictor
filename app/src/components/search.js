import React, { useState } from 'react';

const Search = () => {
    console.log('test')
    const [stockSymbol, setStockSymbol] = useState('');
    const [exchange, setExchange] = useState('NSE');
    const [searchResults, setSearchResults] = useState([]);

    const handleSymbolChange = (e) => {
        setStockSymbol(e.target.value);
    };

    const handleExchangeChange = (e) => {
        setExchange(e.target.value);
    };

    const handleKeyPress = async (e) => {
        console.log(e, 'key pressed')
        if (e.key === 'Enter') {
            try {
                console.log('reached here');
                const response = await fetch(`API_URL?symbol=${stockSymbol}&exchange=${exchange}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <div>
            <select value={exchange} onChange={handleExchangeChange}>
                <option value="NSE">NSE</option>
                <option value="NASDAQ">NASDAQ</option>
            </select>
            <input
                type="text"
                placeholder="Stock symbol"
                value={stockSymbol}
                onChange={handleSymbolChange}
                onKeyDown={handleKeyPress}
                tabIndex="0"
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;