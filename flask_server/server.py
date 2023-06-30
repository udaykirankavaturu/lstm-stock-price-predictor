from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime, timedelta


app = Flask(__name__)

# Load the LSTM model
model_path = '../model'
model = tf.keras.models.load_model(model_path)
model.summary()

# create scaler
scaler = MinMaxScaler(feature_range=(0, 1))

# Define a route for prediction


@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.json['data']

    symbol = data['symbol']
    stock_data = yf.download(f'{symbol}', start="2010-01-01", end=(
        datetime.now().date() + timedelta(days=1)).strftime("%Y-%m-%d"))

    # Preprocess the input data (if required)
    # ...
    stock_data = stock_data[['Open', 'High', 'Low', 'Close']]
    if (len(stock_data)):
        print(stock_data)
        last_closing_date = stock_data.index[-1]
        last_closing_date = last_closing_date.strftime("%Y-%m-%d")
        last_closing_price = round(stock_data['Close'][-1], 2)
        print(last_closing_date)
        print(last_closing_price)
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
        print(predictions)
        # Return the predictions in the API response
        response = {
            'status_code': 200,
            'message': 'success',
            'symbol': symbol,
            'last_closing_date': last_closing_date,
            'last_closing_price': last_closing_price,
            'next_predicted_closing_price': next_predicted_closing_price}
        return jsonify(response)
    else:
        return "No data found"


if __name__ == '__main__':
    app.run(debug=True)
