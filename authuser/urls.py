from django.urls import path
from authuser import views

urlpatterns = [
    path('', views.ListAuthuser.as_view(), name='listUsers'),
]