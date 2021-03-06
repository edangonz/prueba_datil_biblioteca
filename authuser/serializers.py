from rest_framework import serializers

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','is_superuser', 'username', 'first_name', 'last_name', 'email')

class UserSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', "email", 'password')