'''
This package contains the API routes for the Flask application.

It includes routes for authentication, profile, e.t.c

A Flask blueprint named 'api' is created to group these routes, and it is registered under the '/api' URL prefix.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from flask import Blueprint, render_template

api_bp: Blueprint = Blueprint('api', __name__, url_prefix='/api')

from . import auth, trips, itineraries, itinerary_categories, expenses, profile, notifications


@api_bp.route("/", methods=['GET'])
def index():
    return render_template('api/index.jinja-html')
