from django.conf import settings
from rest_framework import serializers


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)
    gender = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ("phone", "email", "password", "first_name", "last_name", "image")


    def save(self, **kwargs):
        user = super().save(**kwargs)
        user.set_password(self.validated_data["password"])
        user.save()
        return user