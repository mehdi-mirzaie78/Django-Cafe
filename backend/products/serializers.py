from rest_framework import serializers
from .models import Product, Category, Media
from core.serializers import BaseModelSerializer


class MediaSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Media
        exclude = BaseModelSerializer.Meta.exclude + ["product"]


class ProductSerializer(serializers.ModelSerializer):
    media = serializers.SerializerMethodField()
    categories = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="slug"
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "unit_price",
            "discount",
            "price",
            "media",
            "categories",
            "stock",
            "rating",
        ]

    def get_media(self, obj):
        return MediaSerializer(obj.medias.all(), many=True).data


class CategorySerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Category
        exclude = BaseModelSerializer.Meta.exclude + ["parent_category", "is_parent"]
