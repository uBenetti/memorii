from rest_framework import generics
from django.contrib.auth.models import User

from .serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    query=User.objects.all()
    serializer_class=RegisterSerializer