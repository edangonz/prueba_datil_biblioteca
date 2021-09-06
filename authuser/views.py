from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.parsers import JSONParser
from rest_framework import status, authentication, permissions 

from .serializers import UserSerializer, UserSerializerCreate
from django.contrib.auth.models import User

# Create your views here.

class ListAuthuser(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListRegisteruser(APIView):

    def post(self, request):
        serializer = UserSerializerCreate(data=request.data)
        if serializer.is_valid():
            User.objects.create_user(
                serializer.initial_data['username'],
                serializer.initial_data['email'],
                serializer.initial_data['password']
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
