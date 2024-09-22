'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers import CurrenciesController


@api_bp.route("/currencies", methods=["GET", "POST"])
@jwt_required()
def currencies():
    if request.method == "GET":
        return CurrenciesController.get_currencies()
    elif request.method == "POST":
        return CurrenciesController.update_currency()
