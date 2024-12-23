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
import os
from enum import Enum
from threading import Thread
from flask import Flask, current_app
from flask_jwt_extended import get_jwt_identity
from werkzeug.datastructures import FileStorage
from sqlalchemy.exc import ( DataError, DatabaseError, SQLAlchemyError )

from ...extensions import db
from ...models import AppUser, RoleNames, Role, Profile
from .media import save_media, save_media_files_to_temp
from .loggers import console_log, log_exception
from .basics import generate_random_string



def async_save_profile_pic(app: Flask, user: AppUser, media_file_paths):
    with app.app_context():
        try:
            user_profile: Profile = user.profile
            console_log("user_profile", f"{user_profile}")
            console_log("user_profile", f"ID: {user_profile.id} Pic path: {user_profile.profile_pic}")
            
            console_log("async media_file_paths", media_file_paths)
            if media_file_paths:
                for file_path in media_file_paths:
                    filename = os.path.basename(file_path)
                    console_log("filename", filename)
                    with open(file_path, 'rb') as media_file:
                        profile_picture = save_media(media_file, filename) # This saves image file, saves the path in db and return the Media instance
                        profile_picture_id = profile_picture.id
                        console_log("r profile_picture_id", profile_picture_id)
            elif not media_file_paths and user:
                if user_profile.profile_picture_id:
                    profile_picture = user_profile.profile_picture
                    profile_picture_id = profile_picture.id
                else:
                    profile_picture = None
                    profile_picture_id = None
            else:
                profile_picture = None
                profile_picture_id = None
            
            user_profile.update(profile_picture=profile_picture)
        except Exception as e:
            log_exception()
            raise e

def save_profile_pic(user: AppUser, media_file: FileStorage):
    media_file_paths = save_media_files_to_temp(media_file)
    console_log("media_file_paths", media_file_paths)
    Thread(target=async_save_profile_pic, args=(current_app._get_current_object(), user, media_file_paths)).start()
    
    
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
    # return AppUser.query.filter(AppUser.phone == email_phone).first()
    return AppUser.query.filter(AppUser.username == email_phone).first()

def get_users_by_role(role_name: RoleNames):
    return AppUser.query.join(AppUser.roles).filter(Role.name == role_name).all()
