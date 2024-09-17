from sqlalchemy.exc import ( DataError, DatabaseError, OperationalError )

from ..extensions import db
from ..models import AppUser
from ..utils.date_time import DateTimeUtils
from ..utils.helpers.loggers import console_log
from ..utils.decorators.retry import retry

@retry(retries=3, delay=2)
def test_update_admin(app):
    """Automatically signs out visitors who are still signed in when it's midnight."""

    with app.app_context():
        try:
            with db.engine.connect() as connection:  # Ensure a fresh connection
                now = DateTimeUtils.aware_utcnow()
                app_users: list[AppUser] = AppUser.query.filter(
                    AppUser.username == "admin"
                ).first()
                
                app_users.username = "admin"

                db.session.commit()
                
                console_log("Testing update", f"Successfully updated admin at {now}")
        except (OperationalError, DataError, DatabaseError) as e:
            db.session.rollback()
            console_log("Testing update", "Failed to update admin")
            raise e
        except Exception as e:
            db.session.rollback()
            console_log("Testing update", "Failed to update admin")
            raise e