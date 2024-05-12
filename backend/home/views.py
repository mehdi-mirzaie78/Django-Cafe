from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import CafeSerializer, ContactSerializer
from .models import Cafe, Contact


@extend_schema(auth=[{}])
class CafeView(APIView):
    serializer_class = CafeSerializer

    def get(self, request):
        cafe = Cafe.objects.last()
        serialized_data = self.serializer_class(cafe)
        return Response(serialized_data.data, status=status.HTTP_200_OK)


@extend_schema(auth=[{}])
class ContactView(APIView):
    serializer_class = ContactSerializer

    def get(self, request):
        contact = Contact.objects.last()
        serialized_data = self.serializer_class(contact)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
