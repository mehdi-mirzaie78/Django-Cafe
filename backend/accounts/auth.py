from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest


class PhoneAuthBackend(ModelBackend):
    def authenticate(
        self, request: HttpRequest, username=None, password=None, **kwargs
    ) -> AbstractBaseUser | None:
        User = get_user_model()
        try:
            user = User.objects.get(phone=username)
            return user if user.check_password(password) else None
        except User.DoesNotExist:
            return None

    def get_user(self, pk) -> AbstractBaseUser | None:
        User = get_user_model()
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None


class EmailAuthBackend(ModelBackend):
    def authenticate(
        self, request: HttpRequest, username=None, password=None, **kwargs
    ) -> AbstractBaseUser | None:
        User = get_user_model()
        try:
            user = User.objects.get(email=username)
            return user if user.check_password(password) else None
        except User.DoesNotExist:
            return None

    def get_user(self, pk) -> AbstractBaseUser | None:
        User = get_user_model()
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None
