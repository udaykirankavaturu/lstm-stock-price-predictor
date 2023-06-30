from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Load the LSTM model
model_path = '../model'
model = tf.keras.models.load_model(model_path)
model.summary()

# Define a route for prediction


@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.json['data']

    # Preprocess the input data (if required)
    # ...

    # Convert the input data to numpy array (if required)
    input_data = np.array(data)

    # Perform prediction using the loaded model
    predictions = model.predict(input_data)

    # Postprocess the predictions (if required)
    # ...

    # Return the predictions in the API response
    response = {'predictions': predictions.tolist()}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
