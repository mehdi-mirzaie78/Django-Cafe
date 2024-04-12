from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from accounts.models import User
from core.validators import phone_regex_validator
from .utils import JWTHandler as JWT, OTPHandler


class UserSerializerWithTokens(serializers.ModelSerializer):
    access_token = serializers.SerializerMethodField()
    refresh_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["first_name", "last_name", "access_token", "refresh_token"]

    def get_access_token(self, obj: User):
        return JWT.generate_access_token(obj)

    def get_refresh_token(self, obj: User):
        return JWT.generate_refresh_token(obj)


class UserRegisterSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=13, validators=[phone_regex_validator])

    def validate_phone(self, value):
        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                _("This phone number is already registered.")
            )
        return value

    def validate(self, data):
        if not OTPHandler(data["phone"]).is_code_available():
            raise serializers.ValidationError(
                _("We have already sent you an otp code. Try again later")
            )
        return data


class VerifyRegisterSerializer(UserRegisterSerializer):
    otp = serializers.CharField(max_length=settings.OTP_MAX_DIGIT)

    def validate(self, data):
        phone, otp = data["phone"], data["otp"]
        otp_handler = OTPHandler(phone)
        if otp_handler.is_verified():
            raise serializers.ValidationError(_("Phone is already verified."))
        if not otp_handler.check_otp(otp):
            raise serializers.ValidationError(_("Expired or Wrong OTP code."))
        return data

    def save(self):
        OTPHandler(self.validated_data["phone"]).save_verified_phone()


class CompleteRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)
    gender = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = (
            "phone",
            "email",
            "password",
            "first_name",
            "last_name",
            "gender",
            "image",
        )

    def validate(self, data):
        otp_handler = OTPHandler(data["phone"])
        if not otp_handler.is_verified():
            raise serializers.ValidationError(_("Phone number is not verified"))
        otp_handler.clean_cache()
        return data

    def save(self, **kwargs):
        user = super().save(**kwargs)
        user.set_password(self.validated_data["password"])
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=128, required=True)


class RefreshTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(max_length=255, required=True)


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(max_length=255, required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
