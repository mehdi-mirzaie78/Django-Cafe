from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    RefreshTokenSerializer,
)
from .utils import JWTHandler as JWT
from .auth import JWTAuthentication


class RegisterView(APIView):
    parser_classes = [JSONParser, MultiPartParser]

    def post(self, request):
        serialized_data = UserRegisterSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        serialized_data = UserLoginSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        user = authenticate(request, **serialized_data.validated_data)
        if user is not None:
            data = JWT.generate_access_refresh_token(user)
            return Response(
                {"msg": _("Logged in successfully"), **data}, status=status.HTTP_200_OK
            )
        return Response(
            {"msg": _("Invalid credentials")}, status=status.HTTP_400_BAD_REQUEST
        )


class RefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        serialized_data = RefreshTokenSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        refresh_token = serialized_data.validated_data["refresh_token"]
        user = JWTAuthentication().get_user_by_refresh_token(refresh_token)
        data = JWT.generate_access_refresh_token(user)
        return Response(
            {"msg": _("Access token refreshed successfully"), **data},
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    pass
