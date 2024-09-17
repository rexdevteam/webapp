from flask import Flask

def register_all_blueprints(app: Flask) -> None:
    
    from .core.cpanel.routes import cpanel_bp
    app.register_blueprint(cpanel_bp)
    
    from .core.api.routes import api_bp
    app.register_blueprint(api_bp)
    
    from .core.web.routes import web_bp
    app.register_blueprint(web_bp)
    
    # Swagger setup
    from flask_swagger_ui import get_swaggerui_blueprint

    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
