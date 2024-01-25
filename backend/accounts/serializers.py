from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from accounts.models import User
from core.validators import phone_regex_validator
from .utils import OTPHandler as OTP


class UserRegisterSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=13, validators=[phone_regex_validator])

    def validate_phone(self, value):
        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError(
                _("This phone number is already registered.")
            )
        return value


class VerifyRegisterSerializer(UserRegisterSerializer):
    otp = serializers.CharField(max_length=settings.OTP_MAX_DIGIT)

    def validate(self, data):
        phone, otp = data["phone"], data["otp"]
        if OTP.is_verified(phone):
            raise serializers.ValidationError(_("Phone is already verified."))
        if not OTP.check_otp(phone, otp):
            raise serializers.ValidationError(_("Expired or Wrong OTP code."))
        return data

    def save(self):
        phone = self.validated_data["phone"]
        OTP.save_verified_phone(phone)


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
        phone = data["phone"]
        if not OTP.is_verified(phone):
            raise serializers.ValidationError(_("Phone number is not verified"))
        OTP.clean_cache(phone)
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
