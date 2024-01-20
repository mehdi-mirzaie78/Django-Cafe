from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls', namespace='home')),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('actions/', include('actions.urls', namespace='actions')),
    path('products/', include('products.urls', namespace='products')),
    path('orders/', include('orders.urls', namespace='orders'))
]
