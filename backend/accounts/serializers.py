from accounts.models import User
from rest_framework import serializers


class UserRegisterSerializer(serializers.ModelSerializer):
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
