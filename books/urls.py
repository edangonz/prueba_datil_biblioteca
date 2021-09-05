from django.urls import path
from books import views

urlpatterns = [
    path('', views.ListBooks.as_view(), name='listBooks'),
]