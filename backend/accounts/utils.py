import jwt
from uuid import uuid4
from datetime import datetime, timedelta
from django.conf import settings
from django.core.cache import cache


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
        return jwt.encode(payload, cls.SECRET_KEY, algorithm=cls.ALGORITHM)

    @classmethod
    def decode(cls, token):
        return jwt.decode(token, cls.SECRET_KEY, algorithms=[cls.ALGORITHM])

    @classmethod
    def generate_access_refresh_token(cls, user) -> dict:
        access_token = cls.generate_access_token(user)
        refresh_token = cls.generate_refresh_token(user)
        data = {"access_token": access_token, "refresh_token": refresh_token}
        return data


class OTPHandler:
    MAX_DIGIT = settings.OTP_MAX_DIGIT
    TIMEOUT = settings.OTP_TIMEOUT
    VERIFICATION_KEY = "is_verified"
    OTP_KEY = "otp"

    @classmethod
    def get_otp_key(cls, phone):
        return f"{phone}-{cls.OTP_KEY}"

    @classmethod
    def get_verification_key(cls, phone):
        return f"{phone}-is_verified"

    @classmethod
    def generate_random_otp(cls):
        return str(uuid4().node)[: cls.MAX_DIGIT]

    @classmethod
    def save(cls, key, value, timeout=None):
        if timeout is None:
            cache.set(key, value)
        else:
            cache.set(key, value, timeout)

    @classmethod
    def save_otp(cls, phone, otp):
        key = cls.get_otp_key(phone)
        cls.save(key, otp, cls.TIMEOUT)

    @classmethod
    def send_otp(cls, phone):
        # some steps
        otp = cls.generate_random_otp()
        cls.save_otp(phone, otp)
        print(f"{phone} - {otp}")
        return otp

    @classmethod
    def is_verified(cls, phone):
        key = cls.get_verification_key(phone)
        return cache.get(key)

    @classmethod
    def check_otp(cls, phone, otp):
        key = cls.get_otp_key(phone)
        stored_otp = cache.get(key)
        return stored_otp == otp

    @classmethod
    def save_verified_phone(cls, phone):
        key = cls.get_verification_key(phone)
        cache.set(key, True)

    @classmethod
    def clean_cache(cls, phone):
        otp_key = cls.get_otp_key(phone)
        verification_key = cls.get_verification_key(phone)
        cache.delete(otp_key)
        cache.delete(verification_key)
