from flask import Flask
from flask_cors import CORS  # Import the CORS module
from users import users_bp  # Import the users Blueprint
from groups import groups_bp
from login import login_bp
from recommender import recommend_bp
from createevent import events_bp
from database import test_connection  # Import to verify connection
from chat import chat_bp, socketio  


# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes (allow all origins)
CORS(app)

# Register the users Blueprint
app.register_blueprint(users_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(events_bp)
app.register_blueprint(login_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(chat_bp)


# Root route (optional)
@app.route('/')
def home():
    return "Welcome to the User API!"

# Initialize group cache for recommendations on startup
# with app.app_context():
#     from recommender import init_group_cache
#     init_group_cache()

if __name__ == '__main__':
    if test_connection():
        print("Starting Flask app with valid DB connection...")
        # socketio.run(app, debug=True, host='0.0.0.0', port=5000)
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Cannot start Flask app due to DB connection failure.")


# Initialize group cache for recommendations on startup
with app.app_context():
    try:
        from recommender import init_group_cache
        init_group_cache()
        print("Group cache initialized successfully.")
    except Exception as e:
        print(f"Failed to initialize group cache: {e}")