'''
This module initializes the extensions used in the Flask application.

It sets up SQLAlchemy, Flask-Mail, and Celery with the configurations defined in the Config class.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''

from flask_cors import CORS
from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_caching import Cache
from flask_admin import Admin
from flask_login import LoginManager, UserMixin, current_user

from config import Config

cors = CORS()
mail = Mail()
db = SQLAlchemy()
migration = Migrate()
jwt_extended = JWTManager()
app_cache = Cache(config={'CACHE_TYPE': 'simple'})
login_manager = LoginManager()

def initialize_extensions(app: Flask):
    db.init_app(app)
    mail.init_app(app) # Initialize Flask-Mail
    
    login_manager.init_app(app)
    login_manager.login_view = 'panel.login'
    
    jwt = jwt_extended.init_app(app) # Setup the Flask-JWT-Extended extension
    app_cache.init_app(app)
    migrate = migration.init_app(app, db=db)
    
    # Set up CORS. Allow '*' for origins.
    cors.init_app(app=app, resources={r"/*": {"origins": Config.CLIENT_ORIGINS}}, supports_credentials=True)
