'''
This module defines helper functions for managing users of the Flask application.

These functions assist with tasks such as:
    * fetching user info
    * checking if username or email exist
    * generating referral code. e.t.c...

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from flask_jwt_extended import get_jwt_identity

from ...extensions import db
from ...models import AppUser, RoleNames, Role
from .loggers import console_log

def get_current_user() -> AppUser:
    jwt_identity = get_jwt_identity()
    
    console_log("jwt_identity", jwt_identity)
    
    current_user_id = jwt_identity.get("user_id", 0)
    current_user: AppUser = AppUser.query.get(current_user_id)
    
    return current_user

def get_user_info(user_id: int) -> dict:
    """Gets profile details of a particular user"""
    
    if user_id is None:
        user_info = {}
    else:
        app_user = AppUser.query.get(user_id)
        user_info = app_user.to_dict()
    
    for key in user_info:
        if user_info[key] is None:
            user_info[key] = ""
    
    return user_info

def is_user_exist(identifier: str, field: str, user: AppUser | None = None):
    """
    Checks if a user exists in the database with the given identifier and field.

    Args:
        identifier: The identifier to search for (email or username).
        field: The field to search in ("email" or "username").
        user: An optional user object. If provided, the check excludes the user itself.

    Returns:
        True if the user exists, False otherwise.
    """
    base_query = AppUser.query.filter(getattr(AppUser, field) == identifier)
    if user:
        base_query = base_query.filter(AppUser.id != user.id)
    return base_query.scalar() is not None

def is_username_exist(username: str, user: AppUser | None = None):
    """
    Checks if a username exists in the database, excluding the current user if provided.

    Args:
        username: The username to search for.
        user: An optional user object. If provided, the check excludes the user itself.

    Returns:
        True if the username is already taken, False if it's available.
    """
    base_query = AppUser.query.filter(AppUser.username == username)
    if user:
        # Query the database to check if the username is available, excluding the user's own username
        base_query = base_query.filter(AppUser.id != user.id)
    
    return base_query.scalar() is not None


def is_email_exist(email: str, user: AppUser | None = None):
    """
    Checks if an email address exists in the database, excluding the current user if provided.

    Args:
        email: The email address to search for.
        user: An optional user object. If provided, the check excludes the user itself.

    Returns:
        True if the email address is already taken, False if it's available.
    """
    base_query = AppUser.query.filter(AppUser.email == email)
    if user:
        # Query the database to check if the email is available, excluding the user's own email
        base_query = base_query.filter(AppUser.id != user.id)
    
    return base_query.scalar() is not None

def get_app_user(email_phone: str) -> AppUser:
    """
    Retrieves a AppUser object from the database based on email or phone number.

    Args:
        email_phone: The email address or phone number to search for.

    Returns:
        The AppUser object if found, or None if not found.
    """
    
    user = AppUser.query.filter(AppUser.email == email_phone).first()
    if user:
        return user
    
    return AppUser.query.filter(AppUser.phone == email_phone).first()

def get_users_by_role(role_name: RoleNames):
    return AppUser.query.join(AppUser.roles).filter(Role.name == role_name).all()
