'''
This package contains the main routes for the QUAS Flask application.

A Flask blueprint named 'main' is created to group these routes.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from flask import Blueprint, render_template

web_bp: Blueprint = Blueprint('web', __name__)

@web_bp.route("/", methods=['GET'])
def index():
    return render_template('api/index.jinja-html')