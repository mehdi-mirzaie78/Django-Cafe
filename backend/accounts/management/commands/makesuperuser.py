from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        phone = settings.SUPERUSER_PHONE
        email = settings.SUPERUSER_EMAIL
        first_name = settings.SUPERUSER_FIRST_NAME
        last_name = settings.SUPERUSER_LAST_NAME
        try:
            if (
                not User.objects.filter(phone=phone).exists()
                and not User.objects.filter(is_superuser=True).exists()
            ):
                print("admin user not found, creating one")
                new_password = settings.SUPERUSER_PASSWORD
                u = User.objects.create_superuser(
                    phone, email, first_name, last_name, new_password
                )
                print(f"===================================")
                print(
                    f"A superuser '{phone}' was created with password '{new_password}'"
                )
                print(f"===================================")
            else:
                print("admin user found. Skipping super user creation")

        except Exception as e:
            print(f"There was an error: {e}")
