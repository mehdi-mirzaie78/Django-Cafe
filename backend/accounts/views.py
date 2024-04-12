from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    RefreshTokenSerializer,
    UserSerializer,
    VerifyRegisterSerializer,
    CompleteRegistrationSerializer,
)
from .utils import JWTHandler as JWT, OTPHandler
from .auth import JWTAuthentication


class RegisterView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        phone = serialized_data.validated_data["phone"]
        OTPHandler(phone).send_otp()
        return Response(
            {"message": _("OTP code has been sent.")}, status=status.HTTP_200_OK
        )


class VerifyRegisterView(APIView):
    serializer_class = VerifyRegisterSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(
            {"message": _("Verified successfully.")}, status=status.HTTP_200_OK
        )


class CompleteRegistrationView(APIView):
    serializer_class = CompleteRegistrationSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(
            {"message": _("Registration has completed successfully.")},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        user = authenticate(request, **serialized_data.validated_data)
        if user is not None:
            data = JWT.generate_access_refresh_token(user)
            return Response(
                {"message": _("Logged in successfully"), **data},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": _("Invalid credentials")}, status=status.HTTP_400_BAD_REQUEST
        )


class RefreshTokenView(APIView):
    serializer_class = RefreshTokenSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        refresh_token = serialized_data.validated_data["refresh_token"]
        user = JWTAuthentication().get_user_by_refresh_token(refresh_token)
        access_token = JWT.generate_access_token(user)
        return Response(
            {
                "message": _("Access token refreshed successfully"),
                "access_token": access_token,
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            serialized_data = RefreshTokenSerializer(data=request.data)
            serialized_data.is_valid(raise_exception=True)
            refresh_token = serialized_data.validated_data["refresh_token"]
            JWTAuthentication().logout(refresh_token)
            return Response(
                {"message": _("Logged out successfully")}, status=status.HTTP_200_OK
            )
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serialized_data = UserSerializer(instance=user)
        return Response(
            {
                "message": _("Profile fetched successfully"),
                "data": serialized_data.data,
            },
            status=status.HTTP_200_OK,
        )
