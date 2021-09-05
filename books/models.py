from django.db import models
from django.contrib.auth.models import User

# Create your models here.

import string, random, datetime


class Book(models.Model):
    code_book = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    title = models.CharField(max_length=50)
    autor = models.CharField(max_length=50)
    stock = models.IntegerField(default=1)

    def __str__(self):
        return '{0}-{1}'.format(self.title, self.code_book)

class BorrowedBook(models.Model):
    id_borrowed_book = models.SlugField(primary_key=True, unique=True, editable=False, blank=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    code_book = models.ForeignKey(Book, on_delete=models.CASCADE)
    broadcast_date = models.DateField(default=datetime.date.today)
    state_reservation = models.BooleanField(default=False)
    state_return = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        while not self.id_borrowed_book:
            id_borrowed_book = ''.join([
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
                ''.join(str(v) for v in random.sample(string.digits, 2)),
                ''.join(str(v) for v in random.sample(string.ascii_letters, 2)),
            ])
            
            if not BorrowedBook.objects.filter(pk=id_borrowed_book).exists():
                self.id_borrowed_book = id_borrowed_book

        super().save(*args, **kwargs)

    def __str__(self):
        return '{0}-{1}'.format(self.id_user, self.code_book)