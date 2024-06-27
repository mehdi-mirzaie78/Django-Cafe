from rest_framework.routers import DefaultRouter, SimpleRouter
from . import views


router = DefaultRouter()

router.register(r"products", views.ProductViewset)
router.register(r"categories", views.CategoryViewset)

app_name = "products"

urlpatterns = router.urls
