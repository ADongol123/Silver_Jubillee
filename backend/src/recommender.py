from flask import Blueprint, jsonify, request, abort
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from bson.objectid import ObjectId
from database import uri
from login import token_required  # Import for securing the endpoint

# MongoDB setup
client = MongoClient(uri)
db = client["myAppDB"]
sdb = client["recommendation_db"]
users_collection = db["users"]
groups_collection = sdb["groups"]
user_groups = db['groups']
# Load the SentenceTransformer model
model = SentenceTransformer("all-MiniLM-L6-v2")
group_cache = {}

# Create a Blueprint for recommendation-related routes
recommend_bp = Blueprint('recommend', __name__)

# Function to initialize group cache (to be called in app.py)
def init_group_cache():
    global group_cache
    groups = groups_collection.find()
    print("Groups cursor:", groups)  # Debug: Check if groups are fetched
    for group in groups:
        group_id = group["_id"]
        description = group.get("description", "")
        embedding = model.encode(description.lower())
        group_cache[group_id] = {"name": group["name"], "embedding": embedding}
        # print(f"Cached group {group_id}: {group['name']}")  # Debug: Log each cached group
    # print(f"Cached embeddings for {len(group_cache)} groups")
init_group_cache()
# Function to get user profile
def get_user_profile(user_id: str):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        # print("Raw user document:", user)  # Debug: Log the raw user data
    except ValueError:
        abort(400, description="Invalid user_id format")
    if not user:
        abort(404, description="User not found")
    
    # Handle interests robustly
    interests_raw = user.get("interests")
    if interests_raw is None:
        interests = ""  # Handle None case
    elif isinstance(interests_raw, str):
        interests = interests_raw  # Use as-is if it's a string
    elif isinstance(interests_raw, (list, tuple)):
        interests = " ".join(str(item) for item in interests_raw)  # Convert list/tuple to string
    else:
        interests = ""  # Fallback for unexpected types (e.g., int)
    # print("Processed interests:", interests)  # Debug: Log processed interests
    
    # Handle hobbies similarly
    hobbies_raw = user.get("hobbies")
    if hobbies_raw is None:
        hobbies = ""
    elif isinstance(hobbies_raw, str):
        hobbies = hobbies_raw
    elif isinstance(hobbies_raw, (list, tuple)):
        hobbies = " ".join(str(item) for item in hobbies_raw)
    else:
        hobbies = ""
    # print("Processed hobbies:", hobbies)  # Debug: Log processed hobbies
    
    profile = f"{interests} {hobbies}".lower().replace(",", " ").strip()
    # print("Final user profile:", profile)  # Debug: Log final profile
    return profile if profile else "default user interests"  # Fallback if empty

# Function to recommend groups
def recommend_groups(user_id: str, top_n: int = 3):
    user_profile = get_user_profile(user_id)
    if not group_cache:
        abort(404, description="No groups available")
    group_ids = list(group_cache.keys())
    group_names = [group_cache[gid]["name"] for gid in group_ids]
    group_embeddings = np.array([group_cache[gid]["embedding"] for gid in group_ids])
    user_embedding = model.encode(user_profile)
    similarities = cosine_similarity([user_embedding], group_embeddings).flatten()
    top_indices = np.argsort(similarities)[::-1][:top_n]
    
    # Prepare recommendations with the actual group ObjectId
    recommendations = [
        {"group_id": group_ids[i], "name": group_names[i], "similarity": float(similarities[i])}
        for i in top_indices
    ]
    return recommendations

# Route to get recommendations (secured with token)
@recommend_bp.route('/recommend/<user_id>', methods=['GET'])
@token_required
def get_recommendations(user_id):
    try:
        top_n = int(request.args.get('top_n', 5))
        recommendations = recommend_groups(user_id, top_n)
        return jsonify({
            "user_id": user_id,
            "recommended_groups": recommendations
        }), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        if hasattr(e, 'description'):
            return jsonify({"error": e.description}), e.code if hasattr(e, 'code') else 500
        return jsonify({"error": "Internal server error"}), 500
    
