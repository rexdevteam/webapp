'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers import ItineraryCatController


@api_bp.route("/itinerary-cats", methods=["GET"])
def itinerary_cats():
    if request.method == "GET":
        return ItineraryCatController.get_itinerary_cats()


@api_bp.route("/itinerary-cats/<itinerary_cat_id>", methods=["GET"])
def manage_itinerary_cats(itinerary_cat_id):
    if request.method == "GET":
        return ItineraryCatController.get_itinerary_cat(itinerary_cat_id)