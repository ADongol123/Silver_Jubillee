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
        current_time = datetime.datetime.utcnow()
        users_collection.update_one(
            {"_id": user['_id']},
            {
                "$set": {
                    "lastLogin": current_time,
                    "last_active": current_time.isoformat()  # Set initial last_active on login
                }
            }
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
            data= jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = data['user_id']
            user = users_collection.find_one({"_id": ObjectId(user_id)})
            last_active = user.get('last_active')
            if last_active:
                last_active = datetime.datetime.fromisoformat(last_active)
                current_time = datetime.datetime.utcnow()
                inactivity_duration = (current_time - last_active).total_seconds() / 60  # Convert to hours

                # Check if the user has been inactive for more than 2 hours
                if inactivity_duration > 10:
                    return jsonify({"error": "Session expired due to inactivity. Please log in again."}), 401

            # Update the user's last_active timestamp
            users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"last_active": datetime.datetime.utcnow().isoformat()}}
            )
            request.current_user = user
            if not user:
                return jsonify({"error": "User not found"}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        return f(*args, **kwargs)
    return decorated