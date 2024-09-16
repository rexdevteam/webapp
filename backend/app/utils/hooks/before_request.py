import time
import requests, socket
from flask import request, abort, current_app

from ..helpers.loggers import console_log
from ..helpers.http_response import error_response



def log_request() -> None:
    """
    Function to log details about the incoming request.
    Logs the request path, method, and headers.
    """
    console_log("Request INFO", f"Request Path: {request.path}, \nMethod: {request.method}, \nHeaders: {request.headers}")


def json_check() -> None:
    # Check if request content type is JSON
    if request.method in ['POST', 'PUT', 'PATCH']:
        if not request.is_json:
            abort(415)
        elif not request.json:
            abort(400, "Empty JSON body")


def setup_resources() -> None:
    """
    Function to set up resources before each request.
    Initializes a context dictionary with the start time.
    """
    request.context = {}
    request.context['start_time'] = time.time()
