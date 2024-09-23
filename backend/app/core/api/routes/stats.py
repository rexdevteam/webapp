'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers import StatsController


@api_bp.route("/stats", methods=["GET"])
@jwt_required()
def stats():
    if request.method == "GET":
        return StatsController.get_stat_numbers()
