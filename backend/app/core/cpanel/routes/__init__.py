from flask import Blueprint, redirect, url_for
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user


cpanel_bp = Blueprint('panel', __name__, url_prefix="/cpanel")

from . import auth
