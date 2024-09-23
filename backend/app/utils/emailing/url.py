from flask import Flask
from threading import Thread
from flask import render_template, current_app
from flask_mail import Message
from enum import Enum

from config import Config
from ...extensions import mail
from ..helpers.loggers import console_log, log_exception
from ...models import AppUser


class EmailType(Enum):
    VERIFY_EMAIL = 'verify_email'
    PWD_RESET = 'pwd_reset'
    TWO_FA = '2FA'
    WELCOME = 'welcome'
    TASK_APPROVED = 'task_approved'
    TASK_REJECTED = 'task_rejected'
    CREDIT = 'credit'
    DEBIT = 'debit'

# SEND VERIFICATION CODE TO USER'S EMAIL
def send_url_async_email(app: Flask, user_email:str, reset_url:int | str, url_typ:str):
    """
    Sends an email asynchronously.

    This function runs in a separate thread and sends an email to the user. 
    It uses the Flask application context to ensure the mail object works correctly.

    Args:
        app (Flask): The Flask application instance.
        user_email (str): The email address of the user.
        reset_url (str): The Frontend Url to include in the email.
        url_typ (str): The type of the code ('verify_email', 'pwd_reset', '2FA').

    Returns:
        None
    """
    with app.app_context():
        user: AppUser = AppUser.query.filter(AppUser.email == user_email).first()
        firstname = user.profile.firstname if user else ''
        
        subject = 'Reset your password'
        template = render_template(
                "mail/pwd-reset.html",
                reset_url=reset_url,
                user_email=user_email,
                user=user,
                firstname=firstname
            )
        
        msg = Message(subject, sender=Config.MAIL_ALIAS, recipients=[user_email], html=template)
        
        try:
            mail.send(msg)
        except Exception as e:
            log_exception(f"An error occurred while sending the {url_typ} url", e)

def send_url_to_email (user_email: str, url: str, url_type:str = 'pwd_reset'):
    Thread(target=send_url_async_email, args=(current_app._get_current_object(), user_email, url, url_type)).start()
