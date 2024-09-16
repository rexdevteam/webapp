from flask import Flask

from .after_request import set_access_control_allows, add_security_headers, log_response, close_resources
from .before_request import log_request, setup_resources


def register_hooks(app: Flask) -> None:
    """
    Function to register all before_request and after_request hooks.
    
    Args:
        app (Flask): The Flask application instance.
    """
    app.before_request(setup_resources)
    app.before_request(log_request)
    
    app.after_request(close_resources)
    app.after_request(log_response)
    app.after_request(add_security_headers)
    app.after_request(set_access_control_allows)
    