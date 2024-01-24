from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserRegisterSerializer


class RegisterView(APIView):
    def post(self, request):
        serialized_data = UserRegisterSerializer(request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()
        return Response(serialized_data, status=status.HTTP_201_CREATED)
    

class LoginView(APIView):
    def post(self, request):
        pass


class RefreshView(APIView):
    pass


class LogoutView(APIView):
    pass
