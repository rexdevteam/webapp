'''
This module defines the routes for authentication operations in the Flask application.

It includes routes for signing up, verifying email, logging in, verifying 2FA, forgetting password, and resetting password.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from flask import request
from flask_jwt_extended import jwt_required

from . import api_bp
from ..controllers.auth import AuthController


@api_bp.route("/signup", methods=["POST"])
def signUp():

    return AuthController.signUp()

@api_bp.route("/login", methods=["POST"])
def login():
    return AuthController.login()

@api_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    return AuthController.forgot_password()

@api_bp.route("/reset-password", methods=["POST"])
def reset_password():
    return AuthController.reset_password()