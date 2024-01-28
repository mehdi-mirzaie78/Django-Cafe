from rest_framework import serializers
from .models import Product, Category, Media
from core.serializers import BaseModelSerializer


class ProductSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Product


class CategorySerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Category
        exclude = BaseModelSerializer.Meta.exclude + ["parent_category", "is_parent"]


class MediaSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Media
