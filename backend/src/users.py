# users.py
from flask import Blueprint, request, jsonify
from database import users_collection  # Import the collection from database.py
import datetime
from bson.objectid import ObjectId  # For handling MongoDB ObjectIds

# Create a Blueprint for user-related routes
users_bp = Blueprint('users', __name__)

# CREATE: Add a new user
@users_bp.route('/create_user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Validation
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

        result = users_collection.insert_one(user)
        return jsonify({
            "message": "User created successfully",
            "user_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ/EDIT: Get a user by ID
@users_bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        # Convert string ID to ObjectId
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Convert ObjectId to string for JSON response
        user['_id'] = str(user['_id'])
        user['createdAt'] = user['createdAt'].isoformat()
        if user['lastLogin']:
            user['lastLogin'] = user['lastLogin'].isoformat()

        return jsonify(user), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# UPDATE: Update a user by ID
@users_bp.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        updates = {}

        # Only include fields that are provided
        if 'username' in data:
            if len(data['username']) < 3:
                return jsonify({"error": "Username must be at least 3 characters"}), 400
            if users_collection.find_one({"username": data['username'], "_id": {"$ne": ObjectId(user_id)}}):
                return jsonify({"error": "Username already exists"}), 409
            updates['username'] = data['username']

        if 'email' in data:
            if "@" not in data['email'] or "." not in data['email']:
                return jsonify({"error": "Invalid email format"}), 400
            if users_collection.find_one({"email": data['email'], "_id": {"$ne": ObjectId(user_id)}}):
                return jsonify({"error": "Email already exists"}), 409
            updates['email'] = data['email']

        if 'password' in data:
            if len(data['password']) < 6:
                return jsonify({"error": "Password must be at least 6 characters"}), 400
            updates['password'] = data['password']  # In production, hash this!

        if 'isActive' in data:
            updates['isActive'] = data['isActive']

        if not updates:
            return jsonify({"error": "No valid fields to update"}), 400

        # Update the user
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": updates}
        )

        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE: Delete a user by ID
@users_bp.route('/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        result = users_collection.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# NEW: Get all users
@users_bp.route('/users', methods=['GET'])
def get_all_users():
    try:
        # Fetch all users from the collection
        users = users_collection.find()

        # Convert to a list and process each document
        users_list = []
        for user in users:
            user['_id'] = str(user['_id'])  # Convert ObjectId to string
            user['createdAt'] = user['createdAt'].isoformat()  # Convert datetime to ISO string
            if user['lastLogin']:
                user['lastLogin'] = user['lastLogin'].isoformat()
            users_list.append(user)

        return jsonify({
            "message": "Users retrieved successfully",
            "users": users_list,
            "count": len(users_list)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500