from flask import Flask
from flask_cors import CORS
from pathlib import Path

BASE_PATH = Path(__file__).parent.parent

template_folder = BASE_PATH / 'client/dist'
static_folder = BASE_PATH / 'client/dist/assets'

app = Flask(__name__, template_folder=template_folder,
            static_folder=static_folder)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
