import os

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

# Load environment variables from .env file. Not needed if env file loaded via docker-compose
load_dotenv()

UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_KEY = os.getenv('UNSPLASH_KEY')
FLASK_ENV = os.getenv('FLASK_ENV', 'production')

if not UNSPLASH_KEY:
    raise OSError('Please create .env file with UNSPLASH_KEY')
app = Flask(__name__)
CORS(app, resources=[r'/new-image', r'/images', r'/images/<image_id>'])

# Set debug mode based on environment
app.config['DEBUG'] = FLASK_ENV == 'development'

# Other configurations based on environment
if FLASK_ENV == 'development' or FLASK_ENV == 'testing':
    app.config['TESTING'] = True
    # Add test-specific configs here
else:  # production
    app.config['TESTING'] = False
    # Add production-specific configs here


def fetch_subjects(headers, params=None):
    with httpx.Client() as client:
        try:
            response = client.get(UNSPLASH_URL, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f'Error fetching subjects: {e.response.status_code}')
            return []
        except Exception as e:
            print(f'Unexpected error: {e}')
            return []


@app.route('/new-image', methods=['GET'])
def new_image():
    word = request.args.get('query')
    headers = {'Accept-Version': 'v1', 'Authorization': f'Client-ID {UNSPLASH_KEY}'}
    params = {'query': word}
    return fetch_subjects(headers, params)


@app.route('/images', methods=['GET', 'POST'])
def images():
    if request.method == 'GET':
        # read images from the database
        images = images_collection.find({})
        return jsonify([image for image in images])

    elif request.method == 'POST':
        # save image to the database
        image = request.json
        image['_id'] = image['id']
        result = images_collection.insert_one(image)
        inserted_at = result.inserted_id
        return {'inserted_at': inserted_at}


@app.route('/images/<string:image_id>', methods=['DELETE'])
def delete_image(image_id):
    result = images_collection.delete_one({'_id': image_id})
    if not result:
        return jsonify({'error': 'Image was not deleted, please try again later'}), 500
    elif result.deleted_count == 1:
        return jsonify({'message': 'Image deleted successfully'}), 200
    else:
        return jsonify({'error': 'Image not found'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
