# database.py
from pymongo import MongoClient

# MongoDB Atlas connection string (replace with your own)
uri = "mongodb+srv://mahajuh:ftezd8DIUoHpbsyZ@silverjubliee.d6ue4.mongodb.net/?retryWrites=true&w=majority&appName=SilverJubliee"

# Initialize the MongoDB client
client = MongoClient(uri)

# Select the database and collection
db = client['myAppDB']
users_collection = db['users']
groups_collection = db['groups']
events_collection = db['events']

# Function to test the connection (optional)
def test_connection():
    try:
        client.server_info()
        print("Connected to MongoDB Atlas from database.py!")
        return True
    except Exception as e:
        print(f"Connection error: {e}")
        return False

# Optional: Run test when file is executed directly
if __name__ == "__main__":
    test_connection()