'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers import ItineraryController


@api_bp.route("/itineraries", methods=["GET", "POST"])
@jwt_required()
def itineraries():
    if request.method == "GET":
        return ItineraryController.get_itineraries()
    elif request.method == "POST":
        return ItineraryController.add_itinerary()


@api_bp.route("/itineraries/<itinerary_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def manage_itineraries(itinerary_id):
    if request.method == "Get":
        return ItineraryController.get_itinerary(itinerary_id)
    if request.method == "PUT":
        return ItineraryController.edit_itinerary(itinerary_id)
    elif request.method == "DELETE":
        return ItineraryController.delete_itinerary(itinerary_id)