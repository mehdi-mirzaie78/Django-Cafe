from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CafeSerializer, ContactSerializer, MenuSerializer
from .models import Cafe, Contact, Menu


class CafeView(APIView):
    def get(self, request):
        cafe = Cafe.objects.last()
        serialized_data = CafeSerializer(cafe)
        return Response(serialized_data.data, status=status.HTTP_200_OK)


class ContactView(APIView):
    def get(self, request):
        contact = Contact.objects.last()
        serialized_data = ContactSerializer(contact)
        return Response(serialized_data.data, status=status.HTTP_200_OK)


class MenuView(APIView):
    def get(self, request):
        menu = Menu.objects.last()
        serialized_data = MenuSerializer(menu)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
