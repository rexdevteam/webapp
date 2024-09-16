"""
This package contains functions for sending sms using Twilio.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
"""

import os, requests
from flask import current_app, Flask
from twilio.rest import Client

from ..helpers.loggers import console_log, log_exception


def send_sms(msg: str, phone: str) -> None:
    """Send SMS using Twilio."""
    
    account_sid = current_app.config["TWILIO_ACCOUNT_SID"]
    auth_token = current_app.config["TWILIO_AUTH_TOKEN"]
    twilio_number = current_app.config["TWILIO_PHONE_NUMBER"]
    
    client = Client(account_sid, auth_token)
    
    try:
        client.messages.create(
            from_=twilio_number,
            body=msg,
            to=phone
        )
        console_log(data=f"SMS sent to {phone}")
    except Exception as e:
        log_exception(f"Failed to send SMS to {phone}", e)


def termii_send_sms(msg: str, phone: str) -> None:
    """Send SMS using Termii."""
    
    termii_base_url = current_app.config.get("TERMII_BASE_URL")
    url = f"{termii_base_url}/api/sms/send"
    
    payload = {
        "to": phone,
        "from": "VisitVENUE",
        "sms": msg,
        "type": "plain",
        "channel": "generic",
        "api_key": current_app.config.get("TERMII_API_KEY")
    }
    headers = {
        'Content-Type': 'application/json',
    }
    
    try:
        response = requests.request("POST", url, headers=headers, json=payload)
        console_log("response", response)
        
        response_data = response.json()
        console_log("response data", response_data)
        
        console_log(data=f"SMS sent to {phone}")
    except Exception as e:
        log_exception(f"Failed to send SMS to {phone}", e)


def sendchamp_send_sms(msg: str, phone: str) -> None:
    """Send SMS using SENDCHAMP."""
    
    sendchamp_base_url = current_app.config.get("SENDCHAMP_BASE_URL")
    pub_key = current_app.config.get("SENDCHAMP_PUBLIC_KEY")
    url = f"{sendchamp_base_url}/sms/send"
    
    payload = {
        "to": [phone],
        "message": msg,
        "sender_name": "VISITME24",
        "route": "dnd"
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {pub_key}"
    }
    
    try:
        response = requests.request("POST", url, headers=headers, json=payload)
        
        console_log("response data", response.json())
        
        console_log(data=f"SMS sent to {phone}")
    except Exception as e:
        log_exception(f"Failed to send SMS to {phone}", e)