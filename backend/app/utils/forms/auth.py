from random import choices
from wsgiref.validate import validator
import phonenumbers
from flask_wtf import FlaskForm
from wtforms import (StringField, IntegerField, TextAreaField, EmailField, PasswordField, SelectField, SelectMultipleField, BooleanField, HiddenField, ValidationError, widgets)
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms.validators import InputRequired, DataRequired, EqualTo, Length, Optional, Email, Regexp
from sqlalchemy import desc


# form for user to login
class LoginForm(FlaskForm):
    email_phone = StringField(
        'Email or Phone', validators=[DataRequired(), Length(1, 64)]
    )
    pwd = PasswordField(
        'Password', validators=[
            DataRequired(), Length(min=4, max=72)
        ]
    )
