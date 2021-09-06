from django.urls import path
from authuser import views

urlpatterns = [
    path('', views.ListAuthuser.as_view(), name='listUsers'),
    path('create/', views.ListRegisteruser.as_view(), name='createUser'),
]