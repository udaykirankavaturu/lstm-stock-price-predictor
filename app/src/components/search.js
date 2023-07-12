import React, { useState } from 'react';
import ObjectToTable from '../utilities/obj_to_table';
import './search.css'

const API_URL = process.env.REACT_APP_API_URL;
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT, 10) || 10000; // Default timeout of 10 seconds

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
                const controller = new AbortController();
                const signal = controller.signal;

                const timeoutId = setTimeout(() => {
                    controller.abort();
                    setSearchResults(<div>Request timed out. Please try again later.</div>);
                }, API_TIMEOUT);

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            symbol: stockSymbol,
                            exchange: exchange,
                        },
                    }),
                    signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('Server Error');
                }

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
                if (error.name === 'AbortError') {
                    console.error('Request aborted:', error);
                } else {
                    console.error('Error fetching data:', error);
                    setSearchResults(<div>Error fetching data. Please try again later.</div>);
                }
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