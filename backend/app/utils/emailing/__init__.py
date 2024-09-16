"""
This package contains functions for sending emails using Flask-Mail.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
"""

from flask import Flask
from flask_mail import Message

from ...extensions import mail
from ..helpers.loggers import log_exception

def send_async_email(app: Flask, msg: Message) -> None:
    """
    Send an email asynchronously.

    :param app: The Flask application instance.
    :param msg: The email message to be sent.
    """
    with app.app_context():
        
        try:
            mail.send(msg)
        except Exception as e:
            log_exception('EXCEPTION SENDING MAIL', e)