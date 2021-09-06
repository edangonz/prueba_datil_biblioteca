from django.urls import path
from books import views

urlpatterns = [
    path('', views.ListBooks.as_view(), name='listBooks'),
    path('<slug:id>/', views.BookApi.as_view(), name='book'),
    path('reserva/add/', views.BookReservaApi.as_view(), name='bookreserva'),
    path('borrowed/add/', views.BookBorrowedApi.as_view(), name='bookborrowed'),
    path('borrowed/admin/', views.BookBorrowedAdminApi.as_view(), name='bookborrowed'),
]