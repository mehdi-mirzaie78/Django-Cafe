import jwt
from django.conf import settings
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser
from django.db.models import Q
from django.http.request import HttpRequest
from rest_framework.authentication import BaseAuthentication
from rest_framework.request import Request
from .utils import JWTHandler
from .exceptions import (
    ExpiredAccessTokenError,
    InActiveUserError,
    InvalidTokenError,
    NotFoundPrefixError,
    NotLoggedInError,
    UserNotFoundError,
    AuthorizationHeaderError,
    ExpiredRefreshTokenError,
    TokenError,
)


class JWTAuthentication(BaseAuthentication):
    AUTH_HEADER_NAME = settings.AUTH_HEADER_NAME
    AUTH_HEADER_TYPES = settings.AUTH_HEADER_TYPES
    JWT = JWTHandler

    def authenticate(self, request: Request):
        header = self.get_and_validate_header(request)
        if header is None:
            return None
        payload = self.validate_access_token(header)
        user = self.get_user(payload)
        return user, payload

    def get_and_validate_header(self, request):
        header = request.headers.get(self.AUTH_HEADER_NAME)
        if header is None:
            return None

        self._validate_header(header)
        try:
            header = header.split()[1]
        except IndexError:
            raise NotFoundPrefixError
        if len(header) < 6:
            raise TokenError
        return header

    def get_payload(self, token):
        payload = self.JWT.decode(token)
        return payload

    def validate_access_token(self, header):
        try:
            payload = self.get_payload(header)
            if self.JWT.cache.get(self.JWT.access_key(payload)) is None:
                raise ExpiredAccessTokenError
        except jwt.ExpiredSignatureError:
            raise ExpiredAccessTokenError
        payload = self._validate_access_payload(payload)
        return payload

    def _validate_header(self, header):
        # if header is None:
        #     raise AuthorizationHeaderError
        if not any(header.startswith(prefix) for prefix in self.AUTH_HEADER_TYPES):
            raise NotFoundPrefixError

    @staticmethod
    def _validate_access_payload(payload):
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

    def _get_payload_of_refresh_token(self, refresh_token):
        try:
            payload = self.JWT.decode(refresh_token)
        except jwt.ExpiredSignatureError:
            raise ExpiredRefreshTokenError
        except jwt.DecodeError:
            raise TokenError
        return payload

    def get_user_by_refresh_token(self, refresh_token):
        payload = self._get_payload_of_refresh_token(refresh_token)
        if self.JWT.cache.get(self.JWT.refresh_key(payload)) is None:
            raise NotLoggedInError
        user = self.get_user(payload)
        return user

    def logout(self, refresh_token):
        payload = self._get_payload_of_refresh_token(refresh_token)
        self.JWT.cache.delete(self.JWT.refresh_key(payload))


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
