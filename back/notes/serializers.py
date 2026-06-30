from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, ChecklistItem

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = ['id', 'text', 'completed', 'order']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        return user

class NoteSerializer(serializers.ModelSerializer):
    items = ChecklistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'note_type', 'content', 'pinned', 'created_at', 'items']

        read_only_fields = ['user', 'created_at']