'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ....utils.decorators import roles_required
from ..controllers import ProfileController


@api_bp.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def profile():
    if request.method == "GET":
        return ProfileController.get_profile()
    if request.method == "PUT":
        return ProfileController.edit_profile()
