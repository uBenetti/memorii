from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    NOTE_TYPES=(
        ("text", "Texto"),
        ("checklist", "Checklist"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=100)
    
    note_type = models.CharField(
        max_length=20,
        choices=NOTE_TYPES,
        default="text"
    )

    content = models.TextField(blank=True, null=True)

    pinned = models.BooleanField(default=False)

    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class ChecklistItem(models.Model):
    note = models.ForeignKey(
        Note,
        on_delete=models.CASCADE,
        related_name='items'
    )

    text = models.CharField(max_length=300, blank=True, default="")

    completed = models.BooleanField(default=False)

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.text
