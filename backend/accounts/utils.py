import jwt
from uuid import uuid4
from datetime import datetime, timedelta
from django.conf import settings


class JWTHandler:
    SECRET_KEY = settings.SECRET_KEY
    ALGORITHM = settings.ALGORITHM
    ACCESS_TOKEN_EXPIRATION_MINUTES = settings.ACCESS_TOKEN_EXPIRATION_MINUTES
    REFRESH_TOKEN_EXPIRATION_MINUTES = settings.REFRESH_TOKEN_EXPIRATION_MINUTES

    @staticmethod
    def generate_jti():
        return uuid4().hex

    @classmethod
    def generate_access_token(cls, user):
        payload = {
            "type": "access",
            "id": user.id,
            "email": user.email,
            "phone": user.phone,
            "exp": datetime.utcnow()
            + timedelta(minutes=cls.ACCESS_TOKEN_EXPIRATION_MINUTES),
            "iat": datetime.utcnow(),
            "jti": cls.generate_jti(),
        }
        access_token = cls.encode(payload)
        return access_token

    @classmethod
    def generate_refresh_token(cls, user):
        payload = {
            "type": "refresh",
            "id": user.id,
            "exp": datetime.utcnow()
            + timedelta(minutes=cls.REFRESH_TOKEN_EXPIRATION_MINUTES),
            "iat": datetime.utcnow(),
            "jti": cls.generate_jti(),
        }
        refresh_token = cls.encode(payload)
        return refresh_token

    @classmethod
    def encode(cls, payload):
        return jwt.encode(payload, cls.SECRET_KEY, algorithm=cls.ALGORITHM).decode()

    @classmethod
    def decode(cls, token):
        return jwt.decode(token, cls.SECRET_KEY, algorithms=[cls.ALGORITHM])
