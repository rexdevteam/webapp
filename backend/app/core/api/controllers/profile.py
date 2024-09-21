from datetime import timedelta
from flask import request, current_app
from werkzeug.datastructures import FileStorage
from werkzeug.exceptions import BadRequestKeyError
from sqlalchemy.exc import ( IntegrityError, DataError, DatabaseError, InvalidRequestError, )
from flask_jwt_extended import create_access_token, decode_token, get_jwt_identity
from flask_jwt_extended.exceptions import JWTDecodeError

from ....extensions import db
from ....models import Role, RoleNames, AppUser, Profile
from ....utils.helpers.basics import generate_random_number
from ....utils.helpers.loggers import console_log, log_exception
from ....utils.helpers.http_response import error_response, success_response
from ....utils.helpers.users import  get_current_user, is_email_exist, save_profile_pic
from ....utils.helpers.export_xl import export_to_excel
from ....utils.emailing.pwd import send_password_email
from ....utils.helpers.media import save_media
from ....utils.helpers.geologicals import get_currency_info


class ProfileController:
    @staticmethod
    def get_profile():
        
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            user_info = current_user.to_dict()
    
            extra_data = {'user_data': user_info}
            api_response = success_response("Profile fetched successfully", 200, extra_data)
        except Exception as e:
            log_exception("An exception occurred while getting user profile.", e)
            api_response = error_response("An unexpected error occurred. Our developers are already looking into it.", 500)
        
        return api_response


    @staticmethod
    def edit_profile():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            
            user_profile: Profile = current_user.profile
            
            # Get the request data
            data = request.form.to_dict()
            
            firstname = data.get('firstname', user_profile.firstname if user_profile else '')
            lastname = data.get('lastname', user_profile.lastname if user_profile else '')
            gender = data.get('gender', user_profile.gender if current_user else '')
            phone = data.get('phone', user_profile.phone if current_user else '')
            country = data.get('country', user_profile.country if user_profile else '')
            state = data.get('state', user_profile.state if user_profile else '')
            
            profile_picture = request.files.get('profile_picture', '')
            profile_picture = request.files.getlist('profile_picture') or profile_picture
            
            console_log("gender", gender)
            
            currency_info = {}
            if country != user_profile.country:
                currency_info = get_currency_info(country)
                
                if currency_info is None:
                    return error_response("Could not get your country's currency", 500)
            
            currency_name=currency_info.get("name", user_profile.currency_name)
            currency_code=currency_info.get("code", user_profile.currency_code)
            currency_symbol=currency_info.get("symbol", user_profile.currency_symbol)
            
            if profile_picture:
                save_profile_pic(current_user, profile_picture)
            
            # update user details
            user_profile.update(firstname=firstname, lastname=lastname, gender=gender, phone=phone, country=country, state=state, currency_name=currency_name, currency_code=currency_code, currency_symbol=currency_symbol)
            
            
            extra_data={'user_data': current_user.to_dict()}
            api_response = success_response('Profile updated successfully', 200, extra_data)
            
        except (DataError, DatabaseError) as e:
            db.session.rollback()
            log_exception('Database error occurred updating user profile', e)
            api_response = error_response('Error interacting with the database.', 500)
        except Exception as e:
            db.session.rollback()
            log_exception('An exception occurred updating user profile.', e)
            api_response = error_response('An error occurred while updating profile', 500)
        finally:
            db.session.close()
        
        return api_response



    @staticmethod
    def user_email_edit():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            data = request.get_json()
            new_email = data.get('new_email')
            
            if new_email == current_user.email:
                return error_response("email provided isn't a new email", 406)
            
            if is_email_exist(new_email, current_user):
                return error_response("Email already Taken", 409)
                
            verification_code = generate_random_number() # Generate a random six-digit number
            
            # TODO:
            # try:
            #     send_code_to_email(new_email, verification_code) # send verification code to user's email
            # except Exception as e:
            #     return error_response(f'An error occurred while sending the verification email: {str(e)}', 500)
            
            # Create a JWT that includes the user's info and the verification code
            expires = timedelta(minutes=30)
            edit_email_token = create_access_token(identity={
                'new_email': new_email,
                'user_id': get_jwt_identity(),
                'verification_code': verification_code
            }, expires_delta=expires)
            
            extra_data = {'edit_email_token': edit_email_token}
            api_response = success_response("Verification code sent successfully", 200, extra_data)
        
        except Exception as e:
            log_exception("An exception occurred changing the email.", e)
            api_response = error_response("An unexpected error occurred. Our developers are already looking into it.", 500)
        
        return api_response


    @staticmethod
    def verify_email_edit():
        try:
            data = request.get_json()
            edit_email_token = data.get('edit_email_token')
            entered_code = data.get('entered_code')
            
            # Decode the JWT and extract the user's info and the verification code
            decoded_token = decode_token(edit_email_token)
            user_info = decoded_token['sub']
            new_email = user_info['new_email']
            
            current_user = AppUser.query.get(get_jwt_identity())
            
            if int(entered_code) == int(user_info['verification_code']):
                current_user.email = new_email
                db.session.commit()
                extra_data = {'user_email': current_user.email}
                api_response = success_response("Email updated successfully", 201, extra_data)
            else:
                api_response = error_response("Verification code is incorrect", 400)
        except (DataError, DatabaseError) as e:
            db.session.rollback()
            api_response = error_response('Error interacting to the database.', 500)
            log_exception('Database error occurred', e)
        except Exception as e:
            db.session.rollback()
            api_response = error_response("An unexpected error occurred. Our developers are already looking into it.", 500)
            log_exception("An exception occurred changing your email.", e)
        finally:
            db.session.close()
            
        return api_response


    @staticmethod
    def get_profile_pic():
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            user_info = current_user.to_dict
            extra_data = {
                'profile_pic': user_info.get('profile_picture', '')
            }
            api_response = success_response("profile pic fetched successfully", 200, extra_data)
        except Exception as e:
            log_exception("An exception occurred while getting user's profile pic.", e)
            api_response = error_response("An unexpected error occurred. Our developers are already looking into it.", 500)
        
        return api_response


    @staticmethod
    def update_profile_pic():
        
        try:
            current_user = get_current_user()
            if not current_user:
                return error_response("Unauthorized", 401)
            
            user_profile: Profile = current_user.profile
            profile_picture = request.files.get('profile_picture', '')
            
            if profile_picture.filename != '':
                try:
                    profile_picture_id = save_media(profile_picture) # This saves image file, saves the path in db and return the id of the image
                except Exception as e:
                    current_app.logger.error(f"An error occurred while saving profile image: {str(e)}")
                    return error_response(f"An error occurred saving profile image: {str(e)}", 400)
            elif profile_picture.filename == '' and current_user:
                if user_profile.profile_picture_id:
                    profile_picture_id = user_profile.profile_picture_id
                else:
                    profile_picture_id = None
            else:
                profile_picture_id = None
            
            user_profile.update(profile_picture_id=profile_picture_id)
            extra_data = {'profile_picture': user_profile.profile_pic}
            
            api_response = success_response("profile pic updated successfully", 200, extra_data)
        except BadRequestKeyError as e:
            db.session.rollback()
            log_exception("An exception occurred while updating user's profile pic.", e)
            api_response = error_response(f'{e} Make sure profile picture is sent properly', 400)
        except (DataError, DatabaseError) as e:
            db.session.rollback()
            log_exception("Database error occurred updating user's profile pic", e)
            api_response = error_response('Error connecting to the database.', 500)
        except Exception as e:
            db.session.rollback()
            log_exception("An exception occurred updating user's profile pic.", 3)
            api_response = error_response('An unexpected error. Our developers are already looking into it.', 500)
        finally:
            db.session.close()
        
        return api_response

