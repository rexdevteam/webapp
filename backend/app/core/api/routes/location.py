from flask import request

from . import api_bp
from ..controllers import LocationController


@api_bp.route('/countries', methods=['GET'])
def get_countries():
    return LocationController.get_supported_countries()


@api_bp.route('/states', methods=['POST'])
def get_states():
    return LocationController.get_supported_country_states()

# @api_bp.route('/states/lga', methods=['POST'])
# def naija_states_lga():
#     return LocationController.get_naija_state_lga()
