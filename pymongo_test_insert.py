import os
from dotenv import load_dotenv

def get_database():
    from pymongo import MongoClient
    
    load_dotenv()
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://" + os.getenv("USERNAME") + ":" + os.getenv("PASSWORD") + "@cluster0.mzcqw3a.mongodb.net"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['sweintern']
    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":

    # Get the database
    dbname = get_database()