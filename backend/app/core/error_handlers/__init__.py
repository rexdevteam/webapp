'''
This module contains the Error Handlers that return 
proper Error responses on the QUAS Flask application.

It includes error handling for:
    * HTTP Status Errors
    * JWT Errors

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''

from flask import Blueprint, Flask

errors_bp = Blueprint('errorHandlers', __name__)

from . import db_errors, http_errors, jwt_errors, rate_limit


# def register_error_handlers(app: Flask) -> None:
#     """ Register error handlers"""
    
#     app.errorhandler(OperationalError)(operational_error)