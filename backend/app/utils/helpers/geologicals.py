'''
This module defines helper functions for handling geo-specific operations

These functions assist with tasks such as: 
    * retrieving currency information for a given country
    * getting the currency code for a given country
    * getting Nigerian states and local government areas.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Trendit³
'''
import requests, logging
from flask import jsonify, json

# from app.utils import AppJSON
from config import Config
from .loggers import console_log, log_exception
from .http_response import error_response, success_response



def get_currency_info(country:str) -> dict:
    try:
        response = requests.get(f'https://restcountries.com/v3/name/{country}?fullText=true')
        response.raise_for_status()  # raise an exception if the request failed
        data = response.json()
        
        currency_data = data[0]['currencies']
        
        # Extract the currency code, name, and symbol
        currency_code = list(currency_data.keys())[0]  # Get the first currency code
        currency_name = currency_data[currency_code]['name']
        currency_symbol = currency_data[currency_code]['symbol']
        
        currency_info = {
            'code': currency_code,
            'name': currency_name,
            'symbol': str(currency_symbol)
        }
        
        return currency_info
    except requests.exceptions.RequestException as e:
        console_log('Request failed', str(e))
    except IndexError:
        console_log('IndexError', 'Country not found')
    except Exception as e:
        console_log('An error occurred', str(e))

    return None  # Return None if there was an error


def get_currency_code(country):
    try:
        currency_info = get_currency_info(country)
        
        return currency_info['code']
    except requests.exceptions.RequestException as e:
        console_log('Request failed', e)
    except IndexError:
        console_log('IndexError', 'Country not found')
    except Exception as e:
        console_log('An error occurred', e)

    return None  # Return None if there was an error


# def get_9ja_states_lga():
#     return jsonify(AppJSON.9ja_states)
