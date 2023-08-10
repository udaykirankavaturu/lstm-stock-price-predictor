import React from 'react';
import './about.css';

const About = () => {
    return (
        <div className='about'>
        <h1>About</h1>
        <p>
            This app is a stock price predictor that takes stock symbol and exchange as input and predicts the next day's closing price as output.
            <br/>
            <br/>
            <b>Tech Stack: </b><br/>
            Front end: React JS, HTML, CSS<br/>
            Backend: Python

            <br/>
            <br/>
            <b>Deployment: </b><br/>
            Front end: Google Cloud App Engine<br/>
            Backend: Google Cloud Function in Python

            <br/>
            <br/>
            <b>Machine Learning Model: </b><br/>
            The model is a deep learning Long Short Term Memory (LSTM) Recurrent Neural Network (RNN).
            <br/>
            <br/>
            <b>Training Data: </b><br/>
            National Stock Exchange (NSE) India's Nifty 50 Stocks. Data obtained for the period 2010-01-01 to 2023-06-22 at the time of training the model.
            <br/>
            <br/>

            <b>Code Repository: </b><br/>
            <a href='https://github.com/udaykirankavaturu/lstm-stock-price-predictor' target="_blank" rel="noopener noreferrer">Link</a>
            
            <br/>
            <br/>
            <b>Detailed explanation: </b><br/>
            <a href='https://udaykiran.tech/predicting-stock-prices-through-deep-learning' target="_blank" rel="noopener noreferrer">Predicting Stock Prices Through Deep Learning.</a>

            <br/>
            <br/>
            <b>How to use: </b><br/>
            Select any exchange from the dropdown. Type a stock symbol like INFY or SBIN and press enter.
            <br/>
            <br/>
            <b>Note:</b><br/> Results could take a minute initially as the cloud function needs to wake up.
            <br/>
            <br/>
            <b>Disclaimer: </b><br/>
            This is a mathematical experiment and should not be used as an investment/trading tool. 


        </p>
    </div>
    );
};

export default About;