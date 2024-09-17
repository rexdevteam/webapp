from flask_admin import Admin
from flask_admin.menu import MenuLink

from ....models import AppUser
from ....extensions import db
from .views import MyAdminIndexView, UserView


app_admin = Admin(name="VisitMe24", index_view=MyAdminIndexView(template="panel/index.html"), template_mode="bootstrap3")


def create_admin(app):
    app_admin.init_app(app)
    
    # Add custom links
    app_admin.add_link(MenuLink(name='Logout', category='', url='/admin/logout'))
    
    # Add views with restricted access
    app_admin.add_view(UserView(AppUser, db.session, "Users"))
