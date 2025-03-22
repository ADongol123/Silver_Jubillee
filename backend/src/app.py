# app.py
from flask import Flask
from users import users_bp  # Import the users Blueprint
from groups import groups_bp
from login import login_bp
from createevent import events_bp
from database import test_connection  # Import to verify connection

# Initialize Flask app
app = Flask(__name__)

# Register the users Blueprint
app.register_blueprint(users_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(events_bp)
app.register_blueprint(login_bp)

# Root route (optional)
@app.route('/')
def home():
    return "Welcome to the User API!"

if __name__ == '__main__':
    if test_connection():
        print("Starting Flask app with valid DB connection...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Cannot start Flask app due to DB connection failure.")