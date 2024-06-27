from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views


app_name = "orders"

router = DefaultRouter()
router.register("carts", views.CartViewSet, basename="carts")
router.register("orders", views.OrderViewSet, basename="orders")
router.register("tables", views.TableViewSet, basename="tables")

# Nested routers
carts_router = routers.NestedDefaultRouter(router, "carts", lookup="cart")
carts_router.register("items", views.CartItemViewSet, basename="cart-items")

url_patterns = [
    path("order-types/", views.OrderTypeListView.as_view(), name="order-type-list"),
    path(
        "orders/<int:pk>/payment/",
        views.OrderPaymentView.as_view(),
        name="order-payment",
    ),
]
urlpatterns = router.urls + carts_router.urls + url_patterns
