'''
This module defines the controller methods for authentication operations in the QUAS Flask application.

It includes methods for checking username, checking email, signing up, resending email verification code, and logging in.

@author: Emmanuel Olowu
@link: https://github.com/zeddyemy
'''

from datetime import timedelta
from flask import request
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, OperationalError )
from werkzeug.exceptions import UnsupportedMediaType
from flask_jwt_extended import create_access_token
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, DecodeError
from email_validator import validate_email, EmailNotValidError, ValidatedEmail


from ....extensions import db
from ....models import Role, RoleNames, AppUser
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import get_app_user


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
            username = data.get('username', '')
            password = data.get('password', '')
            
            if not email:
                return error_response('Email is required', 400)
            
            try:
                email_info = validate_email(email, check_deliverability=True)
                email = email_info.normalized
            except EmailNotValidError as e:
                return error_response(str(e), 400)

            if AppUser.query.filter_by(email=email).first():
                return error_response('Email already taken', 409)
            
            if AppUser.query.filter_by(username=username).first():
                return error_response('Username already taken', 409)

            
            # Generate a random six-digit number
            # verification_code = generate_random_number()
            
            # try:
            #     send_code_to_email(email, verification_code) # send verification code to user's email
            # except Exception as e:
            #     log_exception("Error sending Email", e)
            #     return error_response(f'An error occurred sending the verification email', 500)
            
            
            
            # Check if any field is empty
            if not all([firstname, lastname, username, password]):
                return {"error": "A required field is not provided."}, 400
            
            new_user = AppUser(name=firstname, email=email, username=username, password=password)
            
            role = Role.query.filter_by(name=RoleNames.CUSTOMER).first()
            
            if role:
                new_user.roles.append(role)
            
            db.session.add_all([
                new_user
            ])
            
            db.session.commit()
            user_data = new_user.to_dict()
            
            # create access token.
            expires = timedelta(minutes=2880) # 48 hours
            access_token = create_access_token(identity=new_user.id, expires_delta=expires, additional_claims={'type': 'access'})
            
            extra_data = {
                'user_data': user_data,
                'access_token':access_token
            }
            
            api_response = success_response('Verification code sent successfully', 200, extra_data)
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
            
            if not user.verify_password(pwd):
                return error_response('Password is incorrect', 401)
            
            if not user.signed_in:
                user.update(signed_in=True)
            
            access_token = create_access_token(identity={"user_id": user.id}, expires_delta=timedelta(minutes=2880), additional_claims={'type': 'access'})
            user_data = user.to_dict()
            
            extra_data = {
                'access_token':access_token,
                'user_data':user_data
            }
            
            api_response = success_response("Logged in successfully", 200, extra_data)
        
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

