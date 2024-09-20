'''
This module contains error handlers for rate limit exceeded scenarios in the Flask application.

Author: Emmanuel Olowu
GitHub: https://github.com/zeddyemy
Package: Estate Management

The error handler in this module provides custom responses for RateLimitExceeded exceptions,
returning a 429 Too Many Requests status code.

'''

from flask_limiter.errors import RateLimitExceeded

from . import errors_bp
from ...utils.helpers.loggers import console_log, log_exception
from ...utils.helpers.http_response import error_response


# Define custom error handler for RateLimitExceeded exception
@errors_bp.app_errorhandler(RateLimitExceeded)
def handle_rate_limit_exceeded(error):
    log_exception('Rate Limit Exceeded', error)
    return error_response(f'Rate Limit Exceeded: {str(error)}', 429) # Return 429 Too Many Requests status code
