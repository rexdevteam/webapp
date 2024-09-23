'''
This module defines the controller methods for authentication operations in the QUAS Flask application.

It includes methods for checking username, checking email, signing up, resending email verification code, and logging in.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''

from datetime import timedelta
from flask import request, current_app
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )
from werkzeug.security import generate_password_hash
from werkzeug.exceptions import UnsupportedMediaType
from flask_jwt_extended import create_access_token, decode_token
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, DecodeError
from email_validator import validate_email, EmailNotValidError, ValidatedEmail


from ....extensions import db
from ....models import Role, RoleNames, AppUser, Profile, Notification, NotificationType
from ....utils.helpers.basics import generate_random_number
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import get_app_user
from ....utils.helpers.geolocation import get_currency_info
from ....utils.emailing.url import send_url_to_email

class AuthController:
    @staticmethod
    def signUp():
        """
        Handle user signup by collecting email and referral code, 
        checking for existing users, and sending a verification code.
        """
        try:
            data = request.get_json()
            email = data.get('email', '').lower()
            firstname = data.get('firstname', '')
            lastname = data.get('lastname', '')
            gender = data.get('gender', '')
            country = data.get('country', '')
            password = data.get('password', '')
            
            if not email:
                return error_response('Email is required', 400)
            
            try:
                email_info = validate_email(email, check_deliverability=True)
                email = email_info.normalized.lower()
            except EmailNotValidError as e:
                return error_response(str(e), 400)

            if AppUser.query.filter_by(email=email).first():
                return error_response('Email already taken', 409)
            
            
            currency_info = get_currency_info(country)
                
            if not currency_info:
                return error_response("Could not get your country's currency", 500)
            
            currency_name=currency_info.get("name")
            currency_code=currency_info.get("code")
            currency_symbol=currency_info.get("symbol")
            
            
            # Generate a random six-digit number
            # verification_code = generate_random_number()
            
            # try:
            #     send_code_to_email(email, verification_code) # send verification code to user's email
            # except Exception as e:
            #     log_exception("Error sending Email", e)
            #     return error_response(f'An error occurred sending the verification email', 500)
            
            
            
            # Check if any field is empty
            if not all([firstname, lastname, country, password]):
                return {"error": "A required field is not provided."}, 400
            
            new_user = AppUser(email=email, password=password)
            new_user_profile = Profile(app_user=new_user, firstname=firstname, lastname=lastname, gender=gender, country=country, currency_name=currency_name, currency_code=currency_code, currency_symbol=currency_symbol)
            
            role = Role.query.filter_by(name=RoleNames.CUSTOMER).first()
            
            if role:
                new_user.roles.append(role)
            
            db.session.add_all([
                new_user,
                new_user_profile
            ])
            
            Notification.add_notification(
                recipients=new_user,
                notification_type=NotificationType.NOTIFICATION,
                body="Welcome. We hope to assist you in managing your expenses",
                title="Welcome",
                commit=False
            )
            
            db.session.commit()
            user_data = new_user.to_dict()
            
            # create access token.
            expires = timedelta(minutes=2880) # 48 hours
            access_token = create_access_token(identity=new_user.id, expires_delta=expires, additional_claims={'type': 'access'})
            
            extra_data = {
                'user_data': user_data,
                'access_token':access_token
            }
            
            api_response = success_response('Sign up successful.', 200, extra_data)
        except IntegrityError as e:
            db.session.rollback()
            log_exception('Integrity Error:', e)
            return error_response(f'User already exists: {str(e)}', 409)
        except (DataError, DatabaseError, OperationalError) as e:
            db.session.rollback()
            log_exception('Error connecting to the database', e)
            return error_response('Error interacting to the database.', 500)
        except Exception as e:
            db.session.rollback()
            log_exception(f"An exception occurred during registration", e)
            api_response = error_response('An unexpected error. Our developers are already looking into it.', 500)
        finally:
            db.session.close()
        
        return api_response
    
    
    @staticmethod
    def login():
        """
        Handle user login by verifying email/username and password,
        checking for two-factor authentication, and returning an access token.
        """
        
        try:
            data = request.get_json()
            email = data.get('email')
            pwd = data.get('password')
            
            if not email:
                return error_response("email is empty", 400)
            
            if not pwd or pwd is None:
                return error_response("password not provided", 400)
            
            # check if email is an email. And convert to lowercase if it's an email
            try:
                email_info = validate_email(email, check_deliverability=False)
                email = email_info.normalized.lower()
                console_log("email", email)
            except EmailNotValidError as e:
                email = email
            
            
            # get user from db with the email/username.
            user = get_app_user(email)
            
            if not user:
                return error_response('Email/username is incorrect or doesn\'t exist', 401)
            
            if not user.password_hash:
                return error_response("This user doesn't have a password yet", 400)
            
            if not user.check_password(pwd):
                return error_response('Password is incorrect', 401)
            
            access_token = create_access_token(identity={"user_id": user.id}, expires_delta=timedelta(minutes=2880), additional_claims={'type': 'access'})
            user_data = user.to_dict()
            
            extra_data = {
                'access_token':access_token,
                'user_data':user_data
            }
            
            api_response = success_response(f"Welcome back {user.profile.firstname}", 200, extra_data)
        
        except UnsupportedMediaType as e:
            log_exception("An UnsupportedMediaType exception occurred", e)
            api_response = error_response("unsupported media type", 415)
        except (DataError, DatabaseError, OperationalError) as e:
            db.session.rollback()
            log_exception('Error connecting to the database', e)
            return error_response('Error interacting to the database.', 500)
        except Exception as e:
            log_exception("An exception occurred trying to login", e)
            api_response = error_response('An unexpected error. Our developers are already looking into it.', 500)
        finally:
            db.session.close()
        
        return api_response

    @staticmethod
    def forgot_password():
        
        try:
            data = request.get_json()
            email = data.get('email').lower()
            
            # get user from db with the email/username.
            user = get_app_user(email)
            
            if not user:
                return error_response('Sorry, the provided email is not registered with us.', 404)
            
            
            # Generate a password reset token
            expires = timedelta(minutes=15)
            reset_token = create_access_token(identity={
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }, expires_delta=expires, additional_claims={'type': 'reset-pwd', "reset": True})
            
            app_domain_name = current_app.config["APP_DOMAIN_NAME"]
            reset_url = f"{app_domain_name}/reset-password?reset_token={reset_token}"
            
            try:
                send_url_to_email(user.email, reset_url, url_type='pwd_reset') # send reset code to user's email
            except Exception as e:
                return error_response(f'An error sending the reset URL to provided email address', 500)
            
            
            extra_data = {
                'email': user.email,
                "msg": "An email with instructions to reset your password has been sent"
            }
            api_response = success_response(f'An Email has been sent to {user.email}', 200, extra_data)
            
        except Exception as e:
            log_exception(f"An exception occurred processing the request", e)
            api_response = error_response('An unexpected error. Our developers are already looking into it.', 500)
        finally:
            db.session.close()
        
        return api_response


    @staticmethod
    def reset_password():
        
        try:
            data = request.get_json()
            reset_token = data.get('reset_token', '')
            new_password = data.get('new_password')
            hashed_pwd = generate_password_hash(new_password, "pbkdf2:sha256")
            
            console_log('reset token', reset_token)
            try:
                # Decode the JWT and extract the user's info and the reset code
                decoded_token = decode_token(reset_token)
                if not decoded_token:
                    return error_response('Invalid or expired reset code', 401)
                
                token_data = decoded_token['sub']
            except DecodeError as e:
                log_exception("DecodeError", e)
                return error_response(f"Invalid or expired reset code", 401)
            except ExpiredSignatureError as e:
                log_exception("ExpiredSignatureError", e)
                return error_response("This reset code has expired. Please request a new one.", 401)
            except Exception as e:
                log_exception("An exception occurred decoding token", e)
                return error_response(f"Invalid or expired reset code", 401)
            
            
            # Reset token is valid, update user password
            # get user from db with the email.
            user = get_app_user(token_data['email'])
            
            user.update(password_hash=hashed_pwd)
            
            
            api_response = success_response('Password changed! You can  now login with your new password.', 200)
        except UnsupportedMediaType as e:
            db.session.rollback()
            log_exception("An UnsupportedMediaType exception occurred", e)
            api_response = error_response(f"UnsupportedMediaType: {str(e)}", 415)
        except JWTDecodeError:
            db.session.rollback()
            api_response = error_response(f"Invalid or expired reset Code", 401)
        except Exception as e:
            db.session.rollback()
            log_exception(f"An exception occurred processing the request", e)
            api_response = error_response('An unexpected error. Our developers are already looking into it.', 500)
        finally:
            db.session.close()
        
        return api_response
