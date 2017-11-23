from django.http import HttpResponse, JsonResponse
from user.models import Account
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

from theworld.decorators import set_instance


class ChatRoomList(APIView):
    def get(self, request):
        chats_serializer = ChatRoomSerializer(ChatRoom.objects.all(), many=True)
        return Response(chats_serializer.data)

    def post(self, request):
        chat, chat_created = ChatRoom.objects.get_or_create(name=request.POST['name'])
        if chat_created:
            status=201
        else:
            status=200
        return Response(ChatRoomSerializer(chat).data, status=status)


class MessageList(APIView):
    def get(self, request, room_name):
        try:
            chat = ChatRoom.objects.get(name=room_name)
        except ChatRoom.DoesNotExist:
            return Response(status=404)
        messages = Message.objects.filter(room=chat)
        return Response(MessageSerializer(messages, many=True).data)
