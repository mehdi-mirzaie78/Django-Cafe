import re
from django.contrib.auth.models import BaseUserManager
from django.core.validators import ValidationError
from core.validators import phone_regex, name_regex


class MyUserManager(BaseUserManager):
    def create_user(self, phone, email, first_name, last_name, password):
        if not phone:
            raise ValueError("User must have a phone number")

        if not email:
            raise ValueError("user must have an email")

        if not first_name:
            raise ValueError("user must have a first name")

        if not last_name:
            raise ValueError("user must have a last name")

        user = self.model(
            phone=self.normalize_phone_number(phone),
            email=self.normalize_email(email),
            first_name=self.normalize_name(first_name),
            last_name=self.normalize_name(last_name),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, email, first_name, last_name, password):
        user = self.create_user(phone, email, first_name, last_name, password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    @staticmethod
    def normalize_phone_number(phone_number, pattern=phone_regex):
        valid_phone = re.compile(pattern)
        if not valid_phone.match(phone_number):
            raise ValidationError(
                "Phone number can be one of these forms: +989XXXXXXXXX | 09XXXXXXXXX"
            )
        return phone_number

    @staticmethod
    def normalize_name(name, pattern=name_regex):
        valid_name = re.compile(pattern)
        if not valid_name.match(name):
            raise ValidationError(
                "Invalid name. name must only contain alphabet letters."
            )
        return name
