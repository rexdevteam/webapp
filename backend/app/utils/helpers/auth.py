'''
This module defines helper functions for handling 
authorization and authentication in the QUAS Flask application.

These functions assist with tasks such as code generation, 
saving password reset token, and saving 2FA token

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from threading import Thread
from flask import render_template, current_app
from flask_mail import Message
from enum import Enum

from app import mail
from config import Config
from ...extensions import db

from .loggers import console_log, log_exception
from ...models import AppUser
