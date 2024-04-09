from django_filters import FilterSet, CharFilter, NumberFilter
from django_filters.rest_framework import FilterSet
from .models import Product


class ProductFilter(FilterSet):
    categories = CharFilter(field_name="categories__slug", lookup_expr="iexact")
    min_price = NumberFilter(field_name="price", lookup_expr="gt")
    max_price = NumberFilter(field_name="price", lookup_expr="lt")

    class Meta:
        model = Product
        fields = ["categories", "min_price", "max_price"]
