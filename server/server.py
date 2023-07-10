from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app)

# Load the LSTM model
model_path = '../model'
model = tf.keras.models.load_model(model_path)
model.summary()

# create scaler
scaler = MinMaxScaler(feature_range=(0, 1))

# Define a route for prediction


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if request.method == 'OPTIONS':
            # Handle preflight request
            response = jsonify({})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'GET, OPTIONS')
            return response 

        # Get the input data from the request
        data = request.json['data']

        if not data:
            return {
            'status_code': 400,
            'message': 'data is required'
        }

        if 'symbol' not in data:
            return {
                'status_code': 400,
                'message': 'symbol is required'
            }

        symbol = data['symbol']
        exchange = data['exchange']

        if exchange == 'NSE':
            symbol = symbol + '.NS'

        if exchange == 'BSE':
            symbol = symbol + '.BO'

        if exchange == 'NYSE':
            symbol = symbol + '.N'

        if exchange == 'SHANGHAI':
            symbol = symbol + '.SS'
        
        if exchange == 'SHENZHEN':
            symbol = symbol + '.SZ'

        if exchange == 'JAPAN':
            symbol = symbol + '.JP'

        if exchange == 'EUROPE':
            symbol = symbol + '.E'
        
        if exchange == 'LONDON':
            symbol = symbol + '.L'

        stock_data = yf.download(f'{symbol}', start="2010-01-01", end=(
            datetime.now().date() + timedelta(days=1)).strftime("%Y-%m-%d"))

        # Preprocess the input data (if required)
        # ...
        stock_data = stock_data[['Open', 'High', 'Low', 'Close']]
        if (len(stock_data)):
            last_closing_date = stock_data.index[-1]
            last_closing_date = last_closing_date.strftime("%Y-%m-%d")
            last_closing_price = round(stock_data['Close'][-1], 2)

            stock_data = scaler.fit_transform(stock_data)
            stock_data = np.reshape(stock_data, (1, stock_data.shape[0], 4))
            stock_data = np.array(stock_data[:, -3324:])

            # Perform prediction using the loaded model
            predictions = model.predict(stock_data)

            # Postprocess the predictions (if required)
            # ...
            predictions = scaler.inverse_transform(predictions)
            predictions = predictions.tolist()
            next_predicted_closing_price = round(predictions[0][-1], 2)

            # Return the predictions in the API response
            response = {
                'status_code': 200,
                'message': 'success',
                'data': {
                    'exchange': exchange,
                    'symbol': symbol,
                    'last_closing_date': last_closing_date,
                    'last_closing_price': last_closing_price,
                    'next_predicted_closing_price': next_predicted_closing_price}
            }

            return jsonify(response)
        else:
            return {
                'status_code': 200,
                'message': 'No data found',
                'data': {}
            }
    except Exception as error:
        return {
            'status_code': 200,
            'message': 'Server error',
            'data': {
                error: error
            }
        }


if __name__ == '__main__':
    app.run(debug=True)
