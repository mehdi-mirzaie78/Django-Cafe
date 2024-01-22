from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser
from django.db.models import Q
from django.http.request import HttpRequest


class PhoneEmailAuthBackend(ModelBackend):
    @staticmethod
    def authenticate(
        request: HttpRequest, username=None, password=None, **kwargs
    ) -> AbstractBaseUser | None:
        User = get_user_model()
        try:
            user = User.objects.get(Q(phone=username) | Q(email=username))
            return user if user.check_password(password) else None
        except User.DoesNotExist:
            return None

    @staticmethod
    def get_user(pk) -> AbstractBaseUser | None:
        User = get_user_model()
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None
