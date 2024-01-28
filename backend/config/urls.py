from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.utils.translation import gettext_lazy as _

admin.site.site_header = _(settings.SITE_HEADER)
admin.site.index_title = _(settings.INDEX_TITLE)
prefix = "api/v1"
urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{prefix}/", include("home.urls", namespace="home")),
    path(f"{prefix}/accounts/", include("accounts.urls", namespace="accounts")),
    path(f"{prefix}/actions/", include("actions.urls", namespace="actions")),
    path(f"{prefix}/products/", include("products.urls", namespace="products")),
    path(f"{prefix}/orders/", include("orders.urls", namespace="orders")),
]
