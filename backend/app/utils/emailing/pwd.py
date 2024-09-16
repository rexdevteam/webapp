"""
This module provides functions to send emails using Flask-Mail.
"""

from threading import Thread
from flask_mail import Message
from flask import Flask, render_template, current_app

from config import Config
from ...models import AppUser
from . import send_async_email
from ..helpers.loggers import log_exception



def send_password_email(to: str, password: str | int):
    """
    Send a password generation email to a new user.

    :param to: The recipient's email address.
    :param password: The generated password to be sent.
    """
    
    user: AppUser = AppUser.query.filter(AppUser.email == to).first()
    
    subject = 'Welcome. Here is your Password'
    
    login_url = (
        Config.APP_MANAGER_DOMAIN_NAME if "Manager" in user.role_names else
        Config.APP_RECEPTION_DOMAIN_NAME if "Reception" in user.role_names else
        Config.APP_DOMAIN_NAME if "Resident" in user.role_names else
        Config.APP_DOMAIN_NAME if "Admin" in user.role_names else
        Config.APP_DOMAIN_NAME
    )

    
    template = render_template("mail/send-pwd.html", user=user, password=password, login_url=login_url)
    msg = Message(subject, sender=Config.MAIL_ALIAS, recipients=[to], html=template)
    
    Thread(target=send_async_email, args=(current_app._get_current_object(), msg)).start()


def send_temp_mail(code):
    recipient = "ayomikun204@gmail.com"
    
    subject = 'Temporary mail. Here is is the Code'
    
    msg = Message(subject, sender=Config.MAIL_ALIAS, recipients=[recipient], body=f"The code is: {code}")
    
    Thread(target=send_async_email, args=(current_app._get_current_object(), msg)).start()