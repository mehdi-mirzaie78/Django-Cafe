from django.db.models import F
from django.utils.translation import gettext_lazy as _
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from accounts.auth import JWTAuthentication
from core.viewsets import CreateRetrieveDestroyViewSet
from .exceptions import (
    OrderChangedException,
    OrderItemRemovedException,
    OrderNotFoundException,
)
from .serializers import (
    AddCartItemSerializer,
    CartItemSerializer,
    CartSerializer,
    CreateOrderSerializer,
    OrderPaymentSerializer,
    OrderSerializer,
    UpdateCartItemSerializer,
)
from .models import Cart, CartItem, Order, OrderItem


class CartViewSet(CreateRetrieveDestroyViewSet):
    serializer_class = CartSerializer

    def get_queryset(self):
        queryset = Cart.objects.prefetch_related("items__product").all()

        overstocked_carts = queryset.filter(
            items__quantity__gt=F("items__product__stock")
        )
        if overstocked_carts.exists():
            [cart.validate_stock_and_remove_items() for cart in overstocked_carts]

        return queryset


class CartItemViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete"]

    def get_serializer_context(self):
        return {"cart_id": self.kwargs["cart_pk"], "pk": self.kwargs.get("pk")}

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer
        if self.request.method == "PATCH":
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_queryset(self):
        queryset = CartItem.objects.select_related("product").filter(
            cart_id=self.kwargs["cart_pk"]
        )

        overstocked_items = queryset.filter(quantity__gt=F("product__stock"))
        if overstocked_items.exists():
            overstocked_items.delete()

        return queryset


class OrderViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete", "options"]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method in ["PATCH", "DELETE"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateOrderSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = (
            Order.objects.select_related("user", "status", "table")
            .prefetch_related("order_items__product")
            .all()
        )
        if user.is_staff or user.is_admin:
            return queryset
        return queryset.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data, context={"user_id": request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderPaymentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return (
            Order.objects.select_related("user", "status", "table")
            .filter(is_paid=False)
            .all()
        )

    def get_object(self, pk):
        queryset = self.get_queryset()
        if not queryset.filter(pk=pk).exists():
            raise OrderNotFoundException()
        return self.get_queryset().get(pk=pk)

    def get(self, request, pk):
        order = self.get_object(pk)

        if order.are_items_price_changed():
            raise OrderChangedException()

        if order.remove_items_with_insufficient_quantity():
            raise OrderItemRemovedException()

        if order.order_items.all().count() == 0:
            order.delete()
            raise OrderNotFoundException()

        serializer = self.serializer_class(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        order = self.get_object(pk)
        serializer = OrderPaymentSerializer(order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
