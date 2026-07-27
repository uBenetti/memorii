from django.urls import path
from .views import (RegisterView, ProfileView, NoteListCreateView, NoteDetailView, ChecklistItemDetailView)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('notes/', NoteListCreateView.as_view()),
    path('notes/<int:pk>/', NoteDetailView.as_view()),
    path('checklist-items/<int:pk>/', ChecklistItemDetailView.as_view()),
]