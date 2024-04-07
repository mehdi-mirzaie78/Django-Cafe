from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from .filters import ProductFilter
from .models import Product
from .serializers import ProductSerializer


class ProductViewset(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ["name", "description"]
    ordering_fields = ["price", "updated_at"]
    serializer_class = ProductSerializer
    lookup_field = "pk"
