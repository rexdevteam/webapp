"""
This package contains the decorators for the Flask application.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
"""
from .auth import roles_required
from .timing import get_time