# from werkzeug.urls import url_parse
from urllib.parse import urlparse
from flask import render_template, request, Response, flash, redirect, url_for, abort
from flask_login import login_user, logout_user, current_user

from . import cpanel_bp
from ....utils.helpers.loggers import console_log
from ....utils.helpers.users import get_app_user, get_current_user
from ....utils.helpers.basics import redirect_url
from ....utils.forms.auth import LoginForm


## Route to Login
@cpanel_bp.route("/login", methods=["GET", "POST"])
def login():
    form: LoginForm = LoginForm()
    
    if current_user.is_authenticated:
        return redirect(redirect_url("admin.index"))
    
    if request.method == "POST":
        if form.validate_on_submit():
            console_log("form", request.form)
            
            email_phone = form.email_phone.data
            pwd = form.pwd.data
            
            
            # get next argument fro url
            next = request.args.get("next")
            if not next or urlparse(next).netloc != "":
                next = url_for("admin.index")
            
            
            # get user from db with the email/username.
            user = get_app_user(email_phone)
            
            if user:
                if user.check_password(pwd):
                    login_user(user)
                    flash("Welcome back " + user.name, "success")
                    return redirect(next)
                else:
                    flash("Incorrect password", "error")
            else:
                flash("Email or Phone No. is incorrect or doesn't exist", "error")
            
        else:
            console_log("Form Errors", form.errors)
            flash("Something went Wrong. Please Try Again.", "error")
    
    return render_template("panel/auth/login.html", form=form, page="auth")



@cpanel_bp.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("panel.login"))