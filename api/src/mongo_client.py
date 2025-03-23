import os

from pymongo import MongoClient

# load_dotenv()
MONGO_URL = os.environ.get('MONGO_URL', 'mongo')
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', 'root')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', '')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)

mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    port=MONGO_PORT,
)


def insert_test_document():
    """Insert a sample document into the test_collection"""
    db = mongo_client.test
    test_collection = db.test_collection
    test_collection.insert_one({'name': 'Jake', 'instructor': False})
