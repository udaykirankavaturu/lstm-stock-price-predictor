## Libraries required

- Tensorflow
- Yfinance
- Sklearn
- Flask
- Pandas
- NumPy
- Matplotlib
- flask-cors


# Deploy the google cloud function
gcloud functions deploy predict --runtime python37 --trigger-http --set-env-vars ENDPOINT_ID=6257043596743016448,PROJECT_ID=497584664360 --memory 1GB