'''
This module defines the `roles_required` decorator for the Flask application.

Used for handling role-based access control.
The `roles_required` decorator is used to ensure that the current user has all of the specified roles.
If the user does not have the required roles, it returns a 403 error.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models import AppUser
from ..helpers.http_response import error_response
from ..helpers.users import get_current_user

def roles_required(*required_roles):
    """
    Decorator to ensure that the current user has all of the specified roles.

    This decorator will return a 403 error if the current user does not have
    all of the roles specified in `required_roles`.

    Args:
        *required_roles (str): The required roles to access the route.

    Returns:
        function: The decorated function.

    Raises:
        HTTPException: A 403 error if the current user does not have the required roles.
    """
    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = get_current_user()
            
            if not user:
                return error_response("Unauthorized", 401)
            
            if user and any(role.name.value in required_roles for role in user.roles):
                return fn(*args, **kwargs)
            else:
                return error_response("Access denied: You do not have the required roles to access this resource", 403)
        return wrapper
    return decorator
