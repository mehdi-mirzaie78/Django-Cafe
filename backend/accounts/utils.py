import jwt
from uuid import uuid4
from datetime import datetime, timedelta
from django.conf import settings
from django.core.cache import caches
from django.utils.translation import gettext_lazy as _
from sms_ir import SmsIr


class JWTHandler:
    SECRET_KEY = settings.SECRET_KEY
    ALGORITHM = settings.ALGORITHM
    ACCESS_TOKEN_EXPIRATION_MINUTES = settings.ACCESS_TOKEN_EXPIRATION_MINUTES
    REFRESH_TOKEN_EXPIRATION_MINUTES = settings.REFRESH_TOKEN_EXPIRATION_MINUTES
    cache = caches["auth"]

    @staticmethod
    def generate_jti():
        return uuid4().hex

    @staticmethod
    def access_key(payload):
        return f"{payload['id']}:access:{payload['jti']}"

    @staticmethod
    def refresh_key(payload):
        return f"{payload['id']}:refresh:{payload['jti']}"

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
        cls.cache.set(
            cls.access_key(payload),
            access_token,
            cls.ACCESS_TOKEN_EXPIRATION_MINUTES * 2,
        )
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
        cls.cache.set(
            cls.refresh_key(payload),
            refresh_token,
            cls.REFRESH_TOKEN_EXPIRATION_MINUTES * 2,
        )
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
    VERIFICATION_KEY_PREFIX = settings.VERIFICATION_KEY_PREFIX
    OTP_KEY_PREFIX = settings.OTP_KEY_PREFIX
    DATABASE_NAME = "auth"
    OTP_API_KEY = settings.OTP_API_KEY
    OTP_LINE_NUMBER = settings.OTP_LINE_NUMBER

    def __init__(self, phone):
        self.cache = caches[self.DATABASE_NAME]
        self.phone = phone
        self.otp_key = f"{self.OTP_KEY_PREFIX}:{self.phone}"
        self.verification_key = f"{self.VERIFICATION_KEY_PREFIX}:{self.phone}"
        self.sms = SmsIr(self.OTP_API_KEY, self.OTP_LINE_NUMBER)

    def send_verification_code(self, code):
        response = self.sms.send_verify_code(
            number=self.phone,
            template_id=100000,
            parameters=[
                {
                    "name": "code",
                    "value": code,
                },
            ],
        )
        if response.status_code != 200:
            raise Exception(_("The code didn't send successfully"))

    def generate_random_otp(self):
        return str(uuid4().node)[: self.MAX_DIGIT]

    def save_otp(self, otp):
        key = self.otp_key
        self.cache.set(key, otp, self.TIMEOUT)

    def send_otp(self):
        otp = self.generate_random_otp()
        self.save_otp(otp)
        # self.send_verification_code(otp)
        print(f"{self.phone} - {otp}")
        return otp

    def is_verified(self):
        return self.cache.get(self.verification_key) == "yes"

    def check_otp(self, user_otp):
        stored_otp = self.cache.get(self.otp_key)
        return stored_otp == user_otp

    def save_verified_phone(self):
        key = self.verification_key
        self.cache.set(key, "yes")

    def clean_cache(self):
        self.cache.delete(self.otp_key)
        self.cache.delete(self.verification_key)

    def is_code_available(self):
        return self.cache.get(self.otp_key) is None
