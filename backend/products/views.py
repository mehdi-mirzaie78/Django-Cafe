from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_spectacular.utils import extend_schema
from .filters import ProductFilter
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


@extend_schema(auth=[{}])
class ProductViewset(ReadOnlyModelViewSet):
    queryset = Product.objects.prefetch_related("categories", "medias").all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ["name", "description", "categories__name"]
    ordering_fields = ["price", "updated_at"]
    serializer_class = ProductSerializer
    lookup_field = "slug"


@extend_schema(auth=[{}])
class CategoryViewset(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_fields = "slug"
