'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers import TripsController


@api_bp.route("/trips", methods=["GET", "POST"])
@jwt_required()
def trips():
    if request.method == "GET":
        return TripsController.get_trips()
    elif request.method == "POST":
        return TripsController.add_trip()


@api_bp.route("/trips/<trip_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def manage_trips(trip_id):
    if request.method == "GET":
        return TripsController.get_trip(trip_id)
    if request.method == "PUT":
        return TripsController.edit_trip(trip_id)
    elif request.method == "DELETE":
        return TripsController.delete_trip(trip_id)