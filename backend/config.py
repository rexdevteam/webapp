import os, logging

class Config:
    ENV = os.environ.get("ENV") or "development"
    SECRET_KEY = os.getenv("SECRET_KEY") or os.environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    DEBUG = (ENV == "development")  # Enable debug mode only in development
    EMERGENCY_MODE = os.getenv("EMERGENCY_MODE") or os.environ.get("EMERGENCY_MODE") or False
    
    CLIENT_ORIGINS = os.getenv("CLIENT_ORIGINS") or os.environ.get("CLIENT_ORIGINS") or "http://localhost:3000,http://localhost:5173"
    CLIENT_ORIGINS = [origin.strip() for origin in CLIENT_ORIGINS.split(",")]
    
    DEFAULT_SUPER_ADMIN_USERNAME = os.getenv("DEFAULT_SUPER_ADMIN_USERNAME")
    DEFAULT_SUPER_ADMIN_PASSWORD = os.getenv("DEFAULT_SUPER_ADMIN_PASSWORD")
    
    # JWT configurations
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY") or os.environ.get('JWT_SECRET_KEY')
    
    # mail configurations
    MAIL_SERVER = os.environ.get("MAIL_SERVER") or 'smtp.gmail.com'
    MAIL_PORT = os.environ.get("MAIL_PORT") or 587
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
    MAIL_ALIAS = (f"{MAIL_DEFAULT_SENDER}", f"{MAIL_USERNAME}")
    
    # Domains
    API_DOMAIN_NAME = os.environ.get("API_DOMAIN_NAME") or "https://estate-backend-erre.onrender.com"
    APP_DOMAIN_NAME = os.environ.get("APP_DOMAIN_NAME") or "https://mellow-malasada-712092.netlify.app"
    APP_MANAGER_DOMAIN_NAME = os.environ.get("APP_MANAGER_DOMAIN_NAME") or "https://mellow-malasada-712092.netlify.app"
    APP_RECEPTION_DOMAIN_NAME = os.environ.get("APP_RECEPTION_DOMAIN_NAME") or "https://mellow-malasada-712092.netlify.app"
    
    # Sendchamp
    SENDCHAMP_BASE_URL = os.environ.get("SENDCHAMP_BASE_URL")
    SENDCHAMP_PUBLIC_KEY = os.environ.get("SENDCHAMP_PUBLIC_KEY")

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or os.getenv("DATABASE_URL") or "sqlite:///db.sqlite3"

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:zeddy@localhost:5432/expense_voyage"


# Map config based on environment
config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig
}

def configure_logging(app):
    if not app.logger.handlers:
        formatter = logging.Formatter("[%(asctime)s] ==> %(levelname)s in %(module)s: %(message)s")
        
        # Stream handler
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        app.logger.addHandler(stream_handler)
        
        app.logger.setLevel(logging.DEBUG)  # Set the desired logging level