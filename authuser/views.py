from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.parsers import JSONParser
from rest_framework import status, authentication, permissions 

from .serializers import UserSerializer

# Create your views here.

class ListAuthuser(APIView):
    parser_classes = [JSONParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)