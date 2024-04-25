from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

app_name = "orders"

router = DefaultRouter()
router.register("carts", views.CartViewSet)
router.register("orders", views.OrderViewSet, basename="orders")

# Nested routers
carts_router = routers.NestedDefaultRouter(router, "carts", lookup="cart")
carts_router.register("items", views.CartItemViewSet, basename="cart-items")

urlpatterns = router.urls + carts_router.urls
