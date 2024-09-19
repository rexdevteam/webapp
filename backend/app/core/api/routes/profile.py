'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ....utils.decorators import roles_required
from ..controllers.trips import TripsController


@api_bp.route("/profile", methods=["GET", "PUT"])
@roles_required("Super Admin", "Admin", "Customer")
def profile():
    if request.method == "GET":
        return TripsController.get_profile()
    if request.method == "PUT":
        return TripsController.edit_profile()
