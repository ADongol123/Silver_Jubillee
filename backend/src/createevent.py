from flask import Blueprint, request, jsonify
from database import events_collection ,users_collection # Import the events collection
from bson.objectid import ObjectId
import datetime
from dateutil import parser
import geopy.distance

# Create a Blueprint for event-related routes
events_bp = Blueprint('events', __name__)

# Helper function to calculate distance between two coordinates
def calculate_distance(coord1, coord2):
    return geopy.distance.distance(
        (coord1['lat'], coord1['lon']),
        (coord2['lat'], coord2['lon'])
    ).miles

# CREATE: Create a new event (POST /events)
@events_bp.route('/events', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        title = data.get('title')
        date = data.get('date')
        description = data.get('description', '')
        location = data.get('location', '')
        coordinates = data.get('coordinates', {'lat': 0, 'lon': 0})
        event_type = data.get('event_type', 'General')

        # Validation
        if not title or not date:
            return jsonify({"error": "Title and date are required"}), 400

        # Create event document
        new_event = {
            "title": title,
            "date": date,
            "description": description,
            "location": location,
            "coordinates": coordinates,
            "attendees": 0,
            "event_type": event_type,
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        # Insert the new event into MongoDB
        result = events_collection.insert_one(new_event)
        new_event['_id'] = str(result.inserted_id)  # Convert ObjectId to string for JSON response
        return jsonify({
            "message": "Event created successfully",
            "event": new_event
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ: Get all events with filters and sorting (GET /events)
@events_bp.route('/events', methods=['GET'])
def get_events():
    try:
        # Get query parameters
        event_type = request.args.get('event_type', 'All Events')
        date_range = request.args.get('date_range', 'Upcoming')
        location_miles = request.args.get('location_miles', type=int)
        user_coords = {
            'lat': request.args.get('lat', type=float, default=41.3083),  # Default: New Haven
            'lon': request.args.get('lon', type=float, default=-72.9279)
        }
        sort_by = request.args.get('sort_by', 'newest')

        # Build the query
        query = {}

        # Filter by event type
        if event_type != 'All Events':
            query['event_type'] = event_type

        # Filter by date range
        now = datetime.datetime.utcnow()
        if date_range == 'Upcoming':
            query['date'] = {'$gt': now.isoformat()}

        # Fetch events from MongoDB
        events_cursor = events_collection.find(query)
        filtered_events = list(events_cursor)

        # Filter by location (within X miles)
        if location_miles:
            filtered_events = [
                event for event in filtered_events
                if calculate_distance(user_coords, event['coordinates']) <= location_miles
            ]

        # Sort events
        if sort_by == 'newest':
            filtered_events.sort(key=lambda x: parser.parse(x['created_at']), reverse=True)
        else:
            filtered_events.sort(key=lambda x: parser.parse(x['created_at']))

        # Convert ObjectId to string for JSON serialization
        for event in filtered_events:
            event['_id'] = str(event['_id'])

        return jsonify({
            "message": "Events retrieved successfully",
            "events": filtered_events,
            "total": len(filtered_events)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ: Get a single event by ID (GET /events/<event_id>)
@events_bp.route('/events/<event_id>', methods=['GET'])
def get_event(event_id):
    try:
        # Fetch the event
        event = events_collection.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"error": "Event not found"}), 404

        event['_id'] = str(event['_id'])
        return jsonify({
            "message": "Event retrieved successfully",
            "event": event
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# UPDATE: Update an event by ID (PUT /events/<event_id>)
@events_bp.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        # Verify the event exists
        event = events_collection.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"error": "Event not found"}), 404

        data = request.get_json()
        update_data = {
            'title': data.get('title', event['title']),
            'date': data.get('date', event['date']),
            'description': data.get('description', event['description']),
            'location': data.get('location', event['location']),
            'coordinates': data.get('coordinates', event['coordinates']),
            'event_type': data.get('event_type', event['event_type'])
        }

        events_collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": update_data}
        )
        updated_event = events_collection.find_one({"_id": ObjectId(event_id)})
        updated_event['_id'] = str(updated_event['_id'])
        return jsonify({
            "message": "Event updated successfully",
            "event": updated_event
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE: Delete an event by ID (DELETE /events/<event_id>)
@events_bp.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        # Verify the event exists
        event = events_collection.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"error": "Event not found"}), 404

        # Delete the event
        result = events_collection.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Failed to delete event"}), 500

        return jsonify({
            "message": "Event deleted successfully",
            "event_id": event_id
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# REGISTER: Register for an event (POST /events/<event_id>/register)
@events_bp.route('/events/<event_id>/register', methods=['POST'])
def register_event(event_id):
    try:
        # Verify the event exists
        event = events_collection.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"error": "Event not found"}), 404

        # Get the user_id from the request body
        data = request.get_json()
        user_id = data.get('user_id')
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        # Verify the user exists
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if the user is already registered
        registered_users = event.get('registered_users', [])
        if ObjectId(user_id) in registered_users:
            return jsonify({"error": "User is already registered for this event"}), 409

        # Add the user to the registered_users list
        registered_users.append(ObjectId(user_id))
        new_attendees = len(registered_users)

        # Update the event with the new registered_users list and attendees count
        events_collection.update_one(
            {"_id": ObjectId(event_id)},
            {
                "$set": {
                    "registered_users": registered_users,
                    "attendees": new_attendees
                }
            }
        )

        # Fetch the updated event to return in the response
        updated_event = events_collection.find_one({"_id": ObjectId(event_id)})
        updated_event['_id'] = str(updated_event['_id'])
        updated_event['registered_users'] = [str(user_id) for user_id in updated_event.get('registered_users', [])]

        return jsonify({
            "message": "Registered successfully",
            "event": updated_event
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500