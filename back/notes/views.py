from rest_framework import generics, status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Note, ChecklistItem
from .serializers import (NoteSerializer, ChecklistItemSerializer)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=RegisterSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        return Response({
            'username': request.user.username
        })

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

class ChecklistItemDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = ChecklistItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChecklistItem.objects.filter(
            note__user=self.request.user
        )

class ChecklistItemCreateView(generics.CreateAPIView):
    serializer_class = ChecklistItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)   # <-- adicionamos isso
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)