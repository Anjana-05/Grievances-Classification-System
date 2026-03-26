import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from datetime import datetime
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Initialize MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["smart_city"]
grievances_col = db["grievances"]

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
        
    result = model.predict([text])[0]
    
    # Save the grievance with the predicted department
    new_grievance = {
        "text": text,
        "department": result,
        "created_at": datetime.now().isoformat()
    }
    
    grievances_col.insert_one(new_grievance)
        
    return jsonify({"department": result, "message": "Grievance saved successfully"})

@app.route("/grievances", methods=["GET"])
def get_grievances():
    # Fetch from MongoDB and sort by created_at descending
    cursor = grievances_col.find().sort("created_at", -1)
    
    grievances = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])  # Convert ObjectId to string for JSON serialization
        grievances.append(doc)
        
    return jsonify(grievances)

if __name__ == "__main__":
    app.run(debug=True)