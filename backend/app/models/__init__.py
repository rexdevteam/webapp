'''
This package contains the database models for the Flask application.

It includes models for AppUser, Role, etc. Each model corresponds to a table in the database.

@author Emmanuel Olowu
@link: https://github.com/zeddyemy
'''

from .media import Media
from .user import AppUser, Profile, create_default_super_admin
from .role import Role, RoleNames, user_roles,  create_roles
from .trip import Trip, Itinerary, ItineraryCategory
from .category import Category
from .expense import Expense
from .notifications import Notification, NotificationType