import jwt
from django.conf import settings
from django.middleware.csrf import CsrfViewMiddleware
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser
from django.db.models import Q
from django.http.request import HttpRequest
from rest_framework.authentication import BaseAuthentication
from rest_framework.request import Request
from rest_framework.exceptions import PermissionDenied
from .utils import JWTHandler
from .exceptions import (
    ExpiredAccessTokenError,
    InActiveUserError,
    InvalidTokenError,
    NotFoundPrefixError,
    UserNotFoundError,
    AuthorizationHeaderError,
)


# class CSRFCheck(CsrfViewMiddleware):
#     def _reject(self, request, reason):
#         # Return the failure reason instead of an HttpResponse
#         return reason


class JWTAuthentication(BaseAuthentication):
    AUTH_HEADER_NAME = settings.AUTH_HEADER_NAME
    JWT = JWTHandler

    def authenticate(self, request: Request):
        header = self.get_header(request)
        if header is None:
            raise AuthorizationHeaderError
        payload = self.get_payload(header)
        payload = self.validate_payload(payload)
        user = self.get_user(payload)
        # self.enforce_csrf(request)
        return user, None

    def get_header(self, request):
        header = request.headers.get(self.AUTH_HEADER_NAME)
        if not header:
            return None
        return header

    def get_payload(self, header):
        try:
            access_token = header.split()[1]
            payload = self.JWT.decode(access_token)
        except jwt.ExpiredSignatureError:
            raise ExpiredAccessTokenError
        except IndexError:
            raise NotFoundPrefixError
        return payload

    def validate_payload(self, payload):
        if payload["type"] != "access":
            raise InvalidTokenError
        return payload

    def get_user(self, payload):
        User = get_user_model()
        user = User.objects.filter(id=payload["id"]).first()
        if user is None:
            raise UserNotFoundError
        if not user.is_active:
            raise InActiveUserError
        return user

    def get_user_by_refresh_token(self, refresh_token):
        payload = self.JWT.decode(refresh_token)
        user = self.get_user(payload)
        return user

    # def enforce_csrf(self, request):
    #     """
    #     Enforce CSRF validation
    #     """
    #     check = CSRFCheck()
    #     # populates request.META['CSRF_COOKIE'], which is used in process_view()
    #     check.process_request(request)
    #     reason = check.process_view(request, None, (), {})
    #     print(reason)
    #     if reason:
    #         # CSRF failed, bail with explicit error message
    #         raise PermissionDenied("CSRF Failed: %s" % reason)


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
