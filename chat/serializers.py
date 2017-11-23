from rest_framework import serializers
from user.models import Account
from .models import ChatRoom, Message


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    sender_id = serializers.PrimaryKeyRelatedField(queryset=Account.objects)
    sender_name = serializers.SerializerMethodField('add_sender_name')

    def add_sender_name(self, obj):
        print(obj)
        sender = Account.objects.get(pk=obj.sender_id)
        return sender.username

    class Meta:
        model = Message
        fields = ['id', 'sender_id', 'sender_name', 'room_id', 'text', 'created_at']
