from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, ChecklistItem

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = ['id', "note", 'text', 'completed', 'order']
        read_only_fields=['id', 'note']

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
    items = ChecklistItemSerializer(many=True, required=False)

    class Meta:
        model = Note
        fields = ['id', 'title', 'note_type', 'content', 'pinned', 'created_at', 'items']

        read_only_fields = ["id"]

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])

        note = Note.objects.create(**validated_data)

        for index, item_data in enumerate(items_data):
            ChecklistItem.objects.create(
                note=note,
                text=item_data['text'],
                completed=item_data.get('completed', False),
                order=index
            )
        return note