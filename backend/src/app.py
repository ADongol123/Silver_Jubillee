# app.py
from flask import Flask
from users import users_bp  # Import the users Blueprint
from database import test_connection  # Import to verify connection

# Initialize Flask app
app = Flask(__name__)

# Register the users Blueprint
app.register_blueprint(users_bp)

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