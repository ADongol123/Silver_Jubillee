from pymongo import MongoClient
import datetime

# MongoDB Atlas connection string
uri = "mongodb+srv://mahajuh:<db_password>@silverjubliee.d6ue4.mongodb.net/?retryWrites=true&w=majority&appName=SilverJubliee"

# Connect to MongoDB Atlas
client = MongoClient(uri)

# Select the database
db = client['myAppDB']

# Select the 'users' collection (equivalent to your USERS table)
users_collection = db['users']

# Function to validate and insert a user
def add_user(username, email, password):
    # Define the user document (schema-like structure)
    user = {
        "username": username,
        "email": email,
        "password": password,  # In production, hash this!
        "createdAt": datetime.datetime.utcnow(),
        "lastLogin": None,
        "isActive": True
    }

    # Basic validation
    if len(username) < 3:
        print("Error: Username must be at least 3 characters")
        return
    if len(password) < 6:
        print("Error: Password must be at least 6 characters")
        return
    if "@" not in email or "." not in email:
        print("Error: Invalid email format")
        return

    # Check for duplicates
    if users_collection.find_one({"username": username}):
        print("Error: Username already exists")
        return
    if users_collection.find_one({"email": email}):
        print("Error: Email already exists")
        return

    # Insert the user into the 'users' collection
    result = users_collection.insert_one(user)
    print(f"User added with ID: {result.inserted_id}")

# Example usage
if __name__ == "__main__":
    try:
        # Test the connection
        client.server_info()  # This will raise an error if connection fails
        print("Connected to MongoDB Atlas!")

        # Add a sample user
        add_user("johndoe", "john@example.com", "secure123")

        # Verify by fetching all users
        for user in users_collection.find():
            print(user)

    except Exception as e:
        print(f"Error: {e}")