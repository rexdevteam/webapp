from flask import redirect, url_for, abort, request
from flask_admin import Admin, AdminIndexView
from flask_admin.menu import MenuLink
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user

from ....utils.helpers.loggers import console_log



class MyAdminIndexView(AdminIndexView):
    def is_accessible(self):
        if not current_user or not current_user.is_authenticated:
            return False
        
        if "Super Admin" in current_user.role_names:
            return True
        
        return False

    
    def inaccessible_callback(self, name, **kwargs):
        console_log(str(current_user))
        return redirect(url_for('panel.login', next=request.url)) # Redirect to login page if user doesn't have access

class SuperAdminModelView(ModelView):
    def is_accessible(self):
        if not current_user or not current_user.is_authenticated:
            return False
        
        if "Super Admin" in current_user.role_names:
            return True
        
        return False

    
    def inaccessible_callback(self, name, **kwargs):
        console_log(str(current_user))
        return redirect(url_for('panel.login', next=request.url)) # Redirect to login page if user doesn't have access
    
    list_template = "panel/model/list.html"
    edit_template = "panel/model/edit.html"
    create_template = "panel/model/create.html"
    
    # can_export = True
    edit_modal = True


class UserView(SuperAdminModelView):
    can_delete = True
    form_columns = ["name", "email", "phone", "remark", "address_room_no", "roles"]
    column_list = ["name", "email", "phone", "remark", "signed_in", "address_room_no", "roles", "date_joined"]
    
    # make columns searchable
    column_searchable_list = ['name', 'email']
    column_filters = ["name", "email", "phone"]
    
    # inline editing
    column_editable_list = ["phone"]
