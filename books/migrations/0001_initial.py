# Generated by Django 3.1 on 2021-09-04 20:27

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('code_book', models.SlugField(blank=True, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=50)),
                ('autor', models.CharField(max_length=50)),
                ('stock', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='BorrowedBook',
            fields=[
                ('id_borrowed_book', models.SlugField(blank=True, editable=False, primary_key=True, serialize=False, unique=True)),
                ('broadcast_date', models.DateField(default=datetime.date.today)),
                ('state_reservation', models.BooleanField(default=False)),
                ('state_return', models.BooleanField(default=False)),
                ('code_book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.book')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]