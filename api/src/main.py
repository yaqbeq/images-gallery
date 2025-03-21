import os

import httpx
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_KEY = os.getenv('UNSPLASH_KEY')
FLASK_ENV = os.getenv('FLASK_ENV', 'production')

if not UNSPLASH_KEY:
    raise OSError('Please create .env file with UNSPLASH_KEY')
app = Flask(__name__)
CORS(app, resources=r'/new-image')

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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
