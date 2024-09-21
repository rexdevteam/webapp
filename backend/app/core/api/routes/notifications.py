'''
@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ....utils.decorators import roles_required
from ..controllers import NotificationsController


@api_bp.route("/notifications", methods=["GET"])
@roles_required("Super Admin", "Admin", "Customer")
def notifications():
    if request.method == "GET":
        return NotificationsController.get_notifications()


@api_bp.route("/notifications/<notification_id>", methods=["GET", "DELETE"])
@roles_required("Super Admin", "Admin", "Customer")
def manage_notifications(notification_id):
    if request.method == "Get":
        return NotificationsController.get_notification(notification_id)
    elif request.method == "DELETE":
        return NotificationsController.delete_notification(notification_id)