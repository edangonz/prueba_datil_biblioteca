from rest_framework import serializers

from .models import Book
from .models import BorrowedBook

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowedBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = BorrowedBook
        fields = ('id_borrowed_book', 'broadcast_date', 'code_book', 'title')

class BorrowedBookUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowedBook
        fields = '__all__'