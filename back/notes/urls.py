from django.urls import path

from .views import (
    RegisterView,
    ProfileView,
    NoteListCreateView,
    NoteDetailView,
    ChecklistItemDetailView,
    ChecklistItemCreateView,
    NoteReorderView,
    ChecklistItemReorderView
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("profile/", ProfileView.as_view()),

    path("notes/", NoteListCreateView.as_view()),
    path("notes/<int:pk>/", NoteDetailView.as_view()),

    path(
        "notes/<int:pk>/reorder/",
        NoteReorderView.as_view(),
        name="note-reorder"
    ),

    path(
        "checklist-items/",
        ChecklistItemCreateView.as_view()
    ),

    path(
        "checklist-items/<int:pk>/",
        ChecklistItemDetailView.as_view()
    ),

    path(
        "checklist-items/<int:pk>/reorder/",
        ChecklistItemReorderView.as_view(),
        name="checklist-item-reorder"
    ),
]