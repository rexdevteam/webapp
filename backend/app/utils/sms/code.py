"""
This module provides functions to send codes via SMS
"""

from string import Template
from threading import Thread
from flask import Flask, current_app

from config import Config
from . import send_sms, sendchamp_send_sms, termii_send_sms
from ...models import AppUser, Venue, Visitor, ResidentVenue
from ..helpers.loggers import log_exception
from ..date_time import DateTimeUtils


def send_async_resident_code_sms(app: Flask, venue_id: int, phone: str, code: str):
    
    with app.app_context():
        resident: AppUser = AppUser.query.filter_by(phone=phone).first()
        venue: Venue = Venue.query.get(venue_id)
        
        msg_template = Template("Welcome $resident_name. You have been added a new venue at '$venue_name.' \n\nVisit $domain to explore it!")
        
        msg = msg_template.safe_substitute(resident_name = resident.name, venue_name = venue.name, domain = current_app.config["APP_DOMAIN_NAME"])
        
        if code:
            msg_template = Template("Welcome $resident_name. You have been added as a resident at the venue name: \n '$venue_name.' \n\nHere is the Code to login: \n $code")
        
            msg = msg_template.safe_substitute(resident_name = resident.name, venue_name = venue.name, code = code)
        
        sendchamp_send_sms(msg, phone)


def send_resident_code_sms(venue_id: int, phone: str, code: str | int):
    """
    Send a code sms to a resident.

    :param venue_id: Id of the Manager's Venue.
    :param phone: The recipient's phone number.
    :param code: The generated code to be sent.
    """
    
    Thread(target=send_async_resident_code_sms, args=(current_app._get_current_object(), venue_id, phone, code)).start()


def send_async_visitor_code_sms(app: Flask, phone: str, name: str, code: str | int, resident_venue_id: int, date):
    with app.app_context():
        resident_venue: ResidentVenue = ResidentVenue.query.get(resident_venue_id)
        resident: AppUser = resident_venue.resident
        venue: Venue = resident_venue.venue
        
        msg_template = Template(
            "Invitation by $resident_name. \
            \nPlease show this code $code to Reception when visiting $resident_name at $address today, $date. \
            \n\nThanks for visiting."
        )
        
        date = DateTimeUtils.format_datetime(date)
        
        msg = msg_template.substitute(
            resident_name=resident.name,
            code=code,
            address=venue.name,
            date=date
        )
        
        sendchamp_send_sms(msg, phone)

def send_visitor_code_sms(phone: str, name: str, code: str | int, resident_venue_id: str | int, date):
    """
    Send a code sms to a visitor.

    :param phone: The recipient's phone number.
    :param code: The generated code to be sent.
    """
    
    Thread(target=send_async_visitor_code_sms, args=(current_app._get_current_object(), phone, name, code, resident_venue_id, date)).start()
