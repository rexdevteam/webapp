'''
This package contains the database models for the Flask application.

It includes models for AppUser, Role, etc. Each model corresponds to a table in the database.

@author Emmanuel Olowu
@link: https://github.com/zeddyemy
'''

from .media import Media
from .user import AppUser, create_default_super_admin
from .role import Role, RoleNames, user_roles,  create_roles