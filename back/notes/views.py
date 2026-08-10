from rest_framework import generics, status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Note, ChecklistItem
from .serializers import (NoteSerializer, ChecklistItemSerializer, ChecklistItemCreateSerializer)

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
        return Note.objects.filter(user=self.request.user).order_by("order")

    def perform_create(self, serializer):
        last_note=(
            Note.objects
            .filter(user=self.request.user)
            .order_by("-order")
            .first()
        )

        next_order =(
            last_note.order + 1
            if last_note
            else 0
        )

        serializer.save(
            user=self.request.user,
            order=next_order
        )

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
    serializer_class = ChecklistItemCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        note=serializer.validated_data["note"]

        if note.user != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied(
                "Você não pode adicionar itens a esta nota."
            )

        serializer.save()