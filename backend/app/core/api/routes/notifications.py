'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers import NotificationsController


@api_bp.route("/notifications", methods=["GET"])
@jwt_required()
def notifications():
    if request.method == "GET":
        return NotificationsController.get_notifications()


@api_bp.route("/notifications/<notification_id>", methods=["GET", "DELETE"])
@jwt_required()
def manage_notifications(notification_id):
    if request.method == "GET":
        return NotificationsController.get_notification(notification_id)
    elif request.method == "DELETE":
        return NotificationsController.delete_notification(notification_id)