from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

admin.site.site_header = _(settings.SITE_HEADER)
admin.site.index_title = _(settings.INDEX_TITLE)

prefix = "api/v1"

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{prefix}/", include("home.urls", namespace="home")),
    path(f"{prefix}/accounts/", include("accounts.urls", namespace="accounts")),
    path(f"{prefix}/actions/", include("actions.urls", namespace="actions")),
    path(f"{prefix}/", include("products.urls", namespace="products")),
    path(f"{prefix}/", include("orders.urls", namespace="orders")),
    path("__debug__/", include("debug_toolbar.urls")),
]

# Documentation urls
urlpatterns += [
    # YOUR PATTERNS
    path(f"{prefix}/docs/", SpectacularAPIView.as_view(), name="docs"),
    # Optional UI:
    path(
        f"{prefix}/docs/swagger/",
        SpectacularSwaggerView.as_view(url_name="docs"),
        name="swagger",
    ),
    path(
        f"{prefix}/docs/redoc/",
        SpectacularRedocView.as_view(url_name="docs"),
        name="redoc",
    ),
]
