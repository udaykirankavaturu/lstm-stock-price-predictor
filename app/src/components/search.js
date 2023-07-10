import React, { useState } from 'react';
import ObjectToTable from '../utilities/obj_to_table';
import './search.css'

const Search = () => {
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
        if (e.key === 'Enter') {
            try {
                const response = await fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            symbol: stockSymbol,
                            exchange: exchange,
                        }
                    }),
                });

                const result = await response.json();
                if (result && result.status_code === 200) {
                    if (Object.keys(result.data).length === 0)
                        setSearchResults(<div>No results found</div>);
                    else
                        setSearchResults((
                            <div>
                                <ObjectToTable object={result.data} />
                            </div>
                        ))
                }


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="select-input-container">
                <select value={exchange} onChange={handleExchangeChange}>
                    <option value="NSE">NSE</option>
                    <option value="NSE">BSE</option>
                    <option value="NASDAQ">NASDAQ</option>
                    <option value="NYSE">NYSE</option>
                    <option value="SHANGHAI">SHANGHAI</option>
                    <option value="SHENZHEN">SHENZHEN</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="EUROPE">EUROPE</option>
                    <option value="LONDON">LONDON</option>
                </select>
                <input
                    type="text"
                    placeholder="Stock symbol ex: SBIN"
                    value={stockSymbol}
                    onChange={handleSymbolChange}
                    onKeyDown={handleKeyPress}
                    tabIndex="0"
                />
                <br></br>
            </div>
            <div className="search-results">
                {searchResults}
            </div>
        </div>
    );
};

export default Search;