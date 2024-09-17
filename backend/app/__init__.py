from flask import Flask
from apscheduler.triggers.cron import CronTrigger
from apscheduler.schedulers.background import BackgroundScheduler

from .utils.date_time import timezone
from .utils.hooks import register_hooks
from .core.cpanel.setup import create_admin
from .scheduled_tasks import test_update_admin
from .extensions import initialize_extensions, login_manager
from .models import AppUser, create_roles, create_default_super_admin
from config import Config, config_by_name, configure_logging


def create_app(config_name=Config.ENV, create_defaults=True):
    '''
    Creates and configures the Flask application instance.

    Args:
        config_name: The configuration class to use (Defaults to Config).

    Returns:
        The Flask application instance.
    '''
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    
    # Initialize Flask extensions
    initialize_extensions(app=app)
    
    @login_manager.user_loader
    def load_user(user_id):
        return AppUser.query.get(int(user_id))
    
    # Set up flask admin
    create_admin(app)
    
    # Set up background Jobs
    with app.app_context():
        scheduler = BackgroundScheduler(timezone=timezone.utc)
        scheduler.add_job(func=test_update_admin, trigger=CronTrigger(hour=0, minute=0), args=[app])
        scheduler.start()
    
    # Register before and after request hooks
    register_hooks(app=app)
    
    # Configure logging
    configure_logging(app)
    
    # Register blueprints
    from .blueprints import register_all_blueprints
    register_all_blueprints(app)
    
    if create_defaults:
        with app.app_context():
            create_roles()
            create_default_super_admin()
    
    return app