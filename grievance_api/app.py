from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data["text"]
    result = model.predict([text])[0]
    return jsonify({"department": result})

if __name__ == "__main__":
    app.run(debug=True)