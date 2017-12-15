from rest_framework import serializers
from user.models import Account
from user.serializers import AccountSerializer
from .models import ChatRoom, Message


class ChatRoomSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()

    def get_participants(self, obj):
        user_serializer = AccountSerializer(obj.participants.all(), many=True)
        return user_serializer.data

    def get_messages(self, obj):
        serializer = MessageSerializer(Message.objects.filter(room_id=obj.id), many=True)
        return serializer.data

    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'created_at', 'messages', 'participants']


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
