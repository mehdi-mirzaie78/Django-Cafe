from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.utils.translation import gettext_lazy as _

admin.site.site_header = _(settings.SITE_HEADER)
admin.site.index_title = _(settings.INDEX_TITLE)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("home.urls", namespace="home")),
    path("accounts/", include("accounts.urls", namespace="accounts")),
    path("actions/", include("actions.urls", namespace="actions")),
    path("products/", include("products.urls", namespace="products")),
    path("orders/", include("orders.urls", namespace="orders")),
]
