# group.py
from flask import Blueprint, request, jsonify
from database import groups_collection, users_collection  # Import both collections
from bson.objectid import ObjectId
import datetime
from login import token_required

# Create a Blueprint for group-related routes
groups_bp = Blueprint('groups', __name__)


# CREATE: Create a new group
@groups_bp.route('/create_group', methods=['POST'])
# @token_required
def create_group():
    try:
        data = request.get_json()
        group_name = data.get('name')
        owner_id = data.get('user_id')  # The ID of the user creating the group
        description = data.get('description')
        interests = data.get('interests',[])

        # Validation
        if not group_name or not owner_id:
            return jsonify({"error": "Group name and user_id are required"}), 400

        if not isinstance(interests, list) or not all(isinstance(interest, str) for interest in interests):
            return jsonify({"error": "Interests must be a list of strings"}), 400
        
        owner = users_collection.find_one({"_id": ObjectId(owner_id)})
        if not owner:
            return jsonify({"error": "User not found"}), 404

        # Create group document
        group = {
            "name": group_name,
            "owner_id": ObjectId(owner_id),
            "description": description,
            "interests": interests,
            "members": [ObjectId(owner_id)],  # Owner is the first member
            "createdAt": datetime.datetime.utcnow()
        }

        result = groups_collection.insert_one(group)
        return jsonify({
            "message": "Group created successfully",
            "group_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# JOIN: Add a user to an existing group
@groups_bp.route('/join_group', methods=['POST'])
# @token_required
def join_group():
    try:
        data = request.get_json()
        group_id = data.get('group_id')
        user_id = str(request.current_user['_id'])

        # Validation
        if not group_id or not user_id:
            return jsonify({"error": "Group ID and user_id are required"}), 400

        # Verify the group exists
        group = groups_collection.find_one({"_id": ObjectId(group_id)})
        if not group:
            return jsonify({"error": "Group not found"}), 404

        # Verify the user exists
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if user is already a member
        if ObjectId(user_id) in group['members']:
            return jsonify({"error": "User is already a member of this group"}), 409

        # Add user to the group
        result = groups_collection.update_one(
            {"_id": ObjectId(group_id)},
            {"$push": {"members": ObjectId(user_id)}}
        )

        if result.modified_count == 0:
            return jsonify({"error": "Failed to join group"}), 500

        return jsonify({
            "message": "User joined group successfully",
            "group_id": group_id
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: Get all groups (for testing)
@groups_bp.route('/groups', methods=['GET'])
@token_required
def get_all_groups():
    try:
        groups = groups_collection.find()
        groups_list = []
        for group in groups:
            group['_id'] = str(group['_id'])
            group['owner_id'] = str(group['owner_id'])
            group['description'] = str(group['description'])
            group['interests'] = group.get('interests', [])
            group['members'] = [str(member) for member in group['members']]
            group['createdAt'] = group['createdAt'].isoformat()
            groups_list.append(group)

        return jsonify({
            "message": "Groups retrieved successfully",
            "groups": groups_list,
            "count": len(groups_list)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# DELETE: Delete a group (only by owner)
@groups_bp.route('/group/<group_id>', methods=['DELETE'])
# @token_required
def delete_group(group_id):
    try:
        # Get the user_id from the request (assuming it's sent in the body)
        user_id = str(request.current_user['_id'])

        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        # Verify the group exists
        group = groups_collection.find_one({"_id": ObjectId(group_id)})
        if not group:
            return jsonify({"error": "Group not found"}), 404

        # Check if the requesting user is the owner
        if str(group['owner_id']) != user_id:
            return jsonify({"error": "Only the group owner can delete this group"}), 403

        # Delete the group
        result = groups_collection.delete_one({"_id": ObjectId(group_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Failed to delete group"}), 500

        return jsonify({
            "message": "Group deleted successfully",
            "group_id": group_id
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# NEW: Get groups by user_id (via path parameter)
@groups_bp.route('/my_groups/<user_id>', methods=['GET'])
# @token_required
def get_my_groups(user_id):
    try:
        # Validate user_id format and existence
        try:
            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({"error": "User not found"}), 404
        except ValueError:
            return jsonify({"error": "Invalid user_id format"}), 400

        # Find groups where the user is a member
        groups = groups_collection.find({"members": ObjectId(user_id)})
        groups_list = []
        for group in groups:
            group['_id'] = str(group['_id'])
            group['owner_id'] = str(group['owner_id'])
            group['description'] = str(group.get('description', ''))
            group['interests'] = group.get('interests', [])
            group['members'] = [str(member) for member in group['members']]
            group['createdAt'] = group['createdAt'].isoformat()
            groups_list.append(group)

        return jsonify({
            "message": "User's groups retrieved successfully",
            "groups": groups_list,
            "count": len(groups_list)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500