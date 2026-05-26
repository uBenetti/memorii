from django.urls import path
from .views import RegisterView, ProfileView, NoteListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('notes/', NoteListCreateView.as_view()),
]