'''
This module contains the Error Handlers that return 
proper Error responses on the Flask application.

It includes error handling for HTTPS status error:
    * bad request(400)
    * not found(404)
    * method not allowed(405)
    * unsupported media type(415)
    * unprocessable (422)
    * internal server error (500)


@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''

from . import errors_bp
from ...utils.helpers.loggers import log_exception
from ...utils.helpers.http_response import error_response


@errors_bp.app_errorhandler(400)
def bad_request(error):
    return error_response(f"{str(error)}", 400)

@errors_bp.app_errorhandler(404)
def not_found(error):
    return error_response("resource not found", 404)

@errors_bp.app_errorhandler(405)
def method_not_allowed(error):
    return error_response("method not allowed", 405)

@errors_bp.app_errorhandler(415)
def unsupported_media_type(error):
    return error_response(f"{str(error)}", 415)

@errors_bp.app_errorhandler(422)
def unprocessable(error):
    log_exception("An unprocessable error occurred:", str(error))
    return error_response("The request was well-formed but was unable to be followed due to semantic errors.", 422)

@errors_bp.app_errorhandler(500)
def internal_server_error(error):
    return error_response('An unexpected error. Our developers are already looking into it.', 500)
