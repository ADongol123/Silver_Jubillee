from flask import Flask, request, jsonify
from pymongo import MongoClient
import datetime

# Initialize Flask app
app = Flask(__name__)

# MongoDB Atlas connection string (replace with your own)
uri = "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myAppDB?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient(uri)
db = client['myAppDB']
users_collection = db['users']

# API endpoint to create a user
@app.route('/create_user', methods=['POST'])
def create_user():
    try:
        # Get data from the request (expecting JSON)
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Basic validation
        if not all([username, email, password]):
            return jsonify({"error": "Missing required fields"}), 400
        
        if len(username) < 3:
            return jsonify({"error": "Username must be at least 3 characters"}), 400
        if len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters"}), 400
        if "@" not in email or "." not in email:
            return jsonify({"error": "Invalid email format"}), 400

        # Check for duplicates
        if users_collection.find_one({"username": username}):
            return jsonify({"error": "Username already exists"}), 409
        if users_collection.find_one({"email": email}):
            return jsonify({"error": "Email already exists"}), 409

        # Create user document
        user = {
            "username": username,
            "email": email,
            "password": password,  # In production, hash this!
            "createdAt": datetime.datetime.utcnow(),
            "lastLogin": None,
            "isActive": True
        }

        # Insert into MongoDB
        result = users_collection.insert_one(user)
        
        # Return success response
        return jsonify({
            "message": "User created successfully",
            "user_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    # Test connection to MongoDB Atlas
    try:
        client.server_info()
        print("Connected to MongoDB Atlas!")
    except Exception as e:
        print(f"Connection error: {e}")
    
    app.run(debug=True, host='0.0.0.0', port=5000)