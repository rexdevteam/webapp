'''
This module contains the Error Handlers that return 
proper Error responses on the Flask application.

It includes error handling for the following JWT errors:
    * NoAuthorizationError
    * ExpiredSignatureError
    * InvalidHeaderError
    * WrongTokenError
    * CSRFError
    * JSONDecodeError

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''

from requests.exceptions import JSONDecodeError
from flask_jwt_extended.exceptions import NoAuthorizationError, InvalidHeaderError, WrongTokenError, CSRFError, JWTDecodeError
from jwt import ExpiredSignatureError, InvalidSignatureError, DecodeError

from . import errors_bp
from ...utils.helpers.loggers import console_log
from ...utils.helpers.http_response import error_response

@errors_bp.app_errorhandler(NoAuthorizationError)
def jwt_auth_error(error):
    console_log('JWT error', error)
    return error_response("User is not logged in", 401)

@errors_bp.app_errorhandler(ExpiredSignatureError)
def expired_jwt(error):
    return error_response("Access token has expired. Please log in again.", 401)

@errors_bp.app_errorhandler(InvalidHeaderError)
def jwt_invalid_header(error):
    return error_response("Invalid JWT header. Token may be tampered.", 401)

@errors_bp.app_errorhandler(WrongTokenError)
def wrong_jwt_token(error):
    return error_response("Wrong type of JWT token.", 401)

@errors_bp.app_errorhandler(CSRFError)
def jwt_csrf_error(error):
    return error_response("CSRF token is missing or invalid.", 401)

@errors_bp.app_errorhandler(DecodeError)
def jwt_decode_error(error):
    return error_response(f"token is missing or invalid: {str(error)}", 401)

@errors_bp.app_errorhandler(InvalidSignatureError)
def jwt_invalid_signature_error(error):
    return error_response(f"token error: {str(error)}", 401)

@errors_bp.app_errorhandler(JSONDecodeError)
def json_decode_error(error):
    return error_response("response body does not contain valid json.", 500)