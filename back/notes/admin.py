from django.contrib import admin
from .models import Note, ChecklistItem

admin.site.register(Note)
admin.site.register(ChecklistItem)