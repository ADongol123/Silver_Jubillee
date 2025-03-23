# app.py
import eventlet
eventlet.monkey_patch()  # Patch eventlet to avoid initialization issues

from flask import Flask
from flask_cors import CORS
from users import users_bp
from groups import groups_bp  # Note: your import says 'groups', not 'group'
from login import login_bp
from recommender import recommend_bp
from createevent import events_bp
from chat import chat_bp, socketio  # Import chat_bp and socketio
from database import test_connection

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Register Blueprints
app.register_blueprint(users_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(events_bp)
app.register_blueprint(login_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(chat_bp)

# Initialize SocketIO with the app
socketio.init_app(app, async_mode='eventlet')

# Root route
@app.route('/')
def home():
    return "Welcome to the User API!"

# Initialize group cache for recommendations on startup
with app.app_context():
    try:
        from recommender import init_group_cache
        init_group_cache()
        print("Group cache initialized successfully.")
    except Exception as e:
        print(f"Failed to initialize group cache: {e}")

if __name__ == '__main__':
    if test_connection():
        print("Starting Flask app with valid DB connection...")
        socketio.run(app, debug=True, host='0.0.0.0', port=5000)
    else:
        print("Cannot start Flask app due to DB connection failure.")