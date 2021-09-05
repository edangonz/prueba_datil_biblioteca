from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser
from rest_framework import status, authentication, permissions 

# Create your views here.

class ListBooks(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user
        if user.is_superuser:
            usernames = [user.username for user in User.objects.all()]
            return Response(usernames, status=status.HTTP_200_OK)
        else:
            return Response({"Server Error"},  status=status.HTTP_403_FORBIDDEN)