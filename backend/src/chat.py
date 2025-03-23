# chat.py
from flask import Blueprint, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from database import groups_collection, db  # Assuming uri is set in database.py
from login import token_required, SECRET_KEY
import jwt
from bson.objectid import ObjectId
import datetime

# Create a Blueprint for chat-related routes
chat_bp = Blueprint('chat', __name__)

# Initialize SocketIO (will be attached to the Flask app in app.py)
socketio = SocketIO(cors_allowed_origins="*")  # Allow all origins for testing; restrict in production

# MongoDB collection for chat messages
messages_collection = db["messages"]

# Middleware to verify JWT for WebSocket connections
@socketio.on('connect')
def handle_connect():
    token = request.args.get('token')
    if not token:
        return False  # Disconnect if no token
    try:
        if token.startswith("Bearer "):
            token = token.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        request.user_id = payload['user_id']  # Store user_id in request context
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return False  # Disconnect if token is invalid or expired
    print(f"Client connected: {request.user_id}")

@socketio.on('disconnect')
def handle_disconnect():
    print(f"Client disconnected: {request.user_id}")

# Join a group chat room
@socketio.on('join_group')
def on_join_group(data):
    group_id = data.get('group_id')
    if not group_id:
        emit('error', {'error': 'group_id is required'})
        return

    # Verify group exists and user is a member
    try:
        group = groups_collection.find_one({"_id": ObjectId(group_id)})
        if not group:
            emit('error', {'error': 'Group not found'})
            return
        if ObjectId(request.user_id) not in group['members']:
            emit('error', {'error': 'User is not a member of this group'})
            return
    except ValueError:
        emit('error', {'error': 'Invalid group_id format'})
        return

    join_room(group_id)
    emit('joined', {'message': f"User {request.user_id} joined group {group_id}"}, room=group_id)
    print(f"User {request.user_id} joined group {group_id}")

# Leave a group chat room
@socketio.on('leave_group')
def on_leave_group(data):
    group_id = data.get('group_id')
    if not group_id:
        emit('error', {'error': 'group_id is required'})
        return

    leave_room(group_id)
    emit('left', {'message': f"User {request.user_id} left group {group_id}"}, room=group_id)
    print(f"User {request.user_id} left group {group_id}")

# Send a message to the group
@socketio.on('send_message')
def handle_message(data):
    group_id = data.get('group_id')
    message = data.get('message')

    if not group_id or not message:
        emit('error', {'error': 'group_id and message are required'})
        return

    # Verify group exists and user is a member
    try:
        group = groups_collection.find_one({"_id": ObjectId(group_id)})
        if not group:
            emit('error', {'error': 'Group not found'})
            return
        if ObjectId(request.user_id) not in group['members']:
            emit('error', {'error': 'User is not a member of this group'})
            return
    except ValueError:
        emit('error', {'error': 'Invalid group_id format'})
        return

    # Save message to MongoDB
    timestamp = datetime.datetime.utcnow()
    msg_doc = {
        "group_id": ObjectId(group_id),
        "user_id": ObjectId(request.user_id),
        "message": message,
        "timestamp": timestamp
    }
    messages_collection.insert_one(msg_doc)

    # Broadcast message to group via WebSocket
    emit('message', {
        "user_id": request.user_id,
        "message": message,
        "timestamp": timestamp.isoformat()
    }, room=group_id)
    print(f"Message sent to group {group_id} by {request.user_id}: {message}")

# REST API to get message history
@chat_bp.route('/group/<group_id>/messages', methods=['GET'])
@token_required
def get_message_history(group_id):
    try:
        # Verify group exists
        try:
            group = groups_collection.find_one({"_id": ObjectId(group_id)})
            if not group:
                return jsonify({"error": "Group not found"}), 404
        except ValueError:
            return jsonify({"error": "Invalid group_id format"}), 400

        # Fetch messages from MongoDB
        messages = messages_collection.find({"group_id": ObjectId(group_id)}).sort("timestamp", 1)
        messages_list = [
            {
                "user_id": str(msg["user_id"]),
                "message": msg["message"],
                "timestamp": msg["timestamp"].isoformat()
            }
            for msg in messages
        ]

        return jsonify({
            "group_id": group_id,
            "messages": messages_list,
            "count": len(messages_list)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500