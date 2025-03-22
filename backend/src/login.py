# login.py
from flask import Blueprint, request, jsonify
from database import users_collection
import bcrypt
import jwt
import datetime
from bson.objectid import ObjectId

# Create a Blueprint for login-related routes
login_bp = Blueprint('login', __name__)

# Secret key for JWT (in production, store this in .env)
SECRET_KEY = "your-secret-key-keep-this-safe"

# LOGIN: Authenticate user and return JWT
@login_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validation
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Find user by email
        user = users_collection.find_one({"email": email})
        if not user:
            return jsonify({"error": "Invalid credentials"}), 401

        # Check if account is active
        if not user.get('isActive', True):
            return jsonify({"error": "Account is deactivated"}), 403

        # Verify password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return jsonify({"error": "Invalid credentials"}), 401

        # Update lastLogin
        users_collection.update_one(
            {"_id": user['_id']},
            {"$set": {"lastLogin": datetime.datetime.utcnow()}}
        )

        # Generate JWT
        token = jwt.encode({
            'user_id': str(user['_id']),
            'email': user['email'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expires in 24 hours
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user_id": str(user['_id'])
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Add this to login.py
def token_required(f):
    from functools import wraps
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            if token.startswith("Bearer "):
                token = token.split(" ")[1]
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated