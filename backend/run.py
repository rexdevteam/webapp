'''
This is the entry point of the Flask application.

It creates an instance of the application and runs it.

@author Emmanuel Olowu
@link: https://github.com/zeddyemy
@package: Estate Management
'''
from app import create_app

flask_app = create_app()
flask_app.app_context().push()