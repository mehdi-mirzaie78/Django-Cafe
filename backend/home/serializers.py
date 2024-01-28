from rest_framework import serializers
from .models import Cafe, Contact, Menu
from products.serializers import ProductSerializer
from core.serializers import BaseModelSerializer


class CafeSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Cafe


class ContactSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Contact
        exclude = BaseModelSerializer.Meta.exclude + ["cafe"]


class MenuSerializer(BaseModelSerializer):
    products = ProductSerializer(many=True)

    class Meta(BaseModelSerializer.Meta):
        model = Menu
