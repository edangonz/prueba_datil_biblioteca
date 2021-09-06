from books.models import Book, BorrowedBook
from books.serializers import BookSerializer, BorrowedBookSerializer, BorrowedBookUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser
from rest_framework import status, authentication, permissions 

import datetime

# Create your views here.

class ListBooks(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        book_serealizable = serializer.data
        return Response(book_serealizable, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.is_superuser:
            book = BookSerializer(data=request.data)
            if book.is_valid() and book.initial_data["code_book"]:
                new_book = Book(book.initial_data["code_book"], book.initial_data["title"], book.initial_data["autor"], book.initial_data["stock"])
                new_book.save()
                return Response(book.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"Params error"},  status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response({"Server Error"},  status=status.HTTP_403_FORBIDDEN)

class BookApi(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, id):
        try:
            return Book.objects.get(code_book=id)
        except Book.DoesNotExist:
            return None
   
    def get(self, request, id):
        book = self.get_object(id)
        if not book:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        user = request.user
        if user.is_superuser:
            book = self.get_object(id)
            if not book:
                return Response(status=status.HTTP_404_NOT_FOUND)

            new_book = BookSerializer(book, data=request.data)

            if new_book.is_valid():
                new_book.save()
                return Response(new_book.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"Params error"},  status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response({"Server Error"},  status=status.HTTP_403_FORBIDDEN)



class BookReservaApi(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object_book(self, id):
        try:
            return Book.objects.get(code_book=id)
        except Book.DoesNotExist:
            return None

    def get_object_user(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def get_object_reserva(self, code_book, id_user):
        try:
            return BorrowedBook.objects.get(code_book=code_book, id_user=id_user)
        except BorrowedBook.DoesNotExist:
            return None
    
    def get(self, request):
        books = BorrowedBook.objects.filter(id_user=request.user.id, state_reservation=True)
        serializer = BorrowedBookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)      

    def post(self, request):
        
        book = self.get_object_book(request.data["code_book"])
        user = self.get_object_user(request.user.id)
        
        if not ( book and user ):
            return Response(status=status.HTTP_404_NOT_FOUND)

        current_reserva = self.get_object_reserva(request.data["code_book"], request.user.id)
        if current_reserva:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        new_book = BookSerializer(book,
            data={
                'code_book' : book.code_book,
                'title' : book.title,
                'autor' : book.autor,
                'stock' : (book.stock - 1)
                })

        if new_book.is_valid():
            new_book.save()

            reserva = BorrowedBook()

            reserva.code_book = book
            reserva.id_user = user
            reserva.state_reservation = True
            
            reserva.save()

            return Response({'message' : "Book reserved"}, status=status.HTTP_202_ACCEPTED)
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        books = BorrowedBook.objects.filter(id_user=request.user.id, state_reservation=True)
        
        for b in books:
            b.state_reservation = False
            b.state_return = True
            b.broadcast_date = datetime.date.today()
            b.save()
   
        return Response({'Message' : "update"}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request):
        reserva = BorrowedBook.objects.get(pk=request.GET.get("id_borrowed_book"))
        if reserva and reserva.state_reservation and reserva.code_book.code_book == request.GET.get("code_book") and reserva.id_user.id == request.user.id:
            reserva.delete()

            book = self.get_object_book(request.GET.get("code_book"))
            book.stock =  book.stock + 1
            book.save()

            return Response({'message' : "Delete book"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class BookBorrowedApi(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        books = BorrowedBook.objects.filter(id_user=request.user.id, state_return=True)
        serializer = BorrowedBookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookBorrowedAdminApi(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        books = BorrowedBook.objects.filter(state_return=True)
        serializer = BorrowedBookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        reserva = BorrowedBook.objects.get(pk=request.GET.get("id_borrowed_book"))
        if reserva and reserva.state_return:
            book = Book.objects.get(code_book=reserva.code_book.code_book)
            book.stock =  book.stock + 1
            book.save()
            
            reserva.delete()

            return Response({'message' : "Delete book"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)