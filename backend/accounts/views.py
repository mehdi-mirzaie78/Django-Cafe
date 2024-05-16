from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    RefreshTokenSerializer,
    UserSerializer,
    UserSerializerWithTokens,
    VerifyRegisterSerializer,
    CompleteRegistrationSerializer,
)
from .utils import JWTHandler as JWT, OTPHandler
from .auth import JWTAuthentication


@extend_schema(auth=[{}])
class RegisterView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        phone = serialized_data.validated_data["phone"]
        OTPHandler(phone).send_otp()
        return Response(
            {"detail": _("OTP code has been sent.")}, status=status.HTTP_200_OK
        )


@extend_schema(auth=[{}])
class VerifyRegisterView(APIView):
    serializer_class = VerifyRegisterSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(
            {"detail": _("Verified successfully.")}, status=status.HTTP_200_OK
        )


@extend_schema(auth=[{}])
class CompleteRegistrationView(APIView):
    serializer_class = CompleteRegistrationSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        user = serialized_data.save()
        user_serializer = UserSerializerWithTokens(user)
        return Response(
            {
                "detail": _("Registration has completed successfully."),
                **user_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


@extend_schema(auth=[{}])
class LoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        user = authenticate(request, **serialized_data.validated_data)
        if user is not None:
            user.last_login = timezone.now()
            user.save()
            user_serializer = UserSerializerWithTokens(user)
            return Response(
                {"detail": _("Logged in successfully"), **user_serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"detail": _("Invalid credentials. Username or password is wrong")},
            status=status.HTTP_400_BAD_REQUEST,
        )


class RefreshTokenView(APIView):
    serializer_class = RefreshTokenSerializer
    authentication_classes = []

    def post(self, request):
        serialized_data = self.serializer_class(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        refresh_token = serialized_data.validated_data["refresh_token"]
        user = JWTAuthentication().get_user_by_refresh_token(refresh_token)
        access_token = JWT.generate_access_token(user)
        return Response(
            {
                "detail": _("Access token refreshed successfully"),
                "access_token": access_token,
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RefreshTokenSerializer

    def post(self, request):
        try:
            serialized_data = self.serializer_class(data=request.data)
            serialized_data.is_valid(raise_exception=True)
            refresh_token = serialized_data.validated_data["refresh_token"]
            JWTAuthentication().logout(refresh_token)
            return Response(
                {"detail": _("Logged out successfully")}, status=status.HTTP_200_OK
            )
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        user = request.user
        serialized_data = self.serializer_class(instance=user)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
