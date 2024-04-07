from rest_framework.viewsets import ModelViewSet

from .models import Product


class ProductViewset(ModelViewSet):
    queryset = Product.objects.all()
