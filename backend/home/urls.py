from django.urls import path
from . import views

app_name = "home"

urlpatterns = [
    path("cafe/", views.CafeView.as_view(), name="cafe"),
    path("contact/", views.ContactView.as_view(), name="contact"),
    path("menu/", views.MenuView.as_view(), name="menu"),
]
    