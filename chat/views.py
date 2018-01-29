from django.http import HttpResponse, JsonResponse
from user.models import Account
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

from theworld.decorators import set_instance

from itertools import chain


class ChatRoomList(APIView):
    def get(self, request):
        chats_serializer = ChatRoomSerializer(list(chain(request.user.chatroom_set.all(), ChatRoom.objects.filter(is_public=True))), many=True)
        return Response(chats_serializer.data)

    def post(self, request):
        chat, chat_created = ChatRoom.objects.get_or_create(
            name=request.POST['name'],
            is_public=self.__get_bool_from_request__(request.POST.get('is_public', False)))
        if chat_created:
            chat.participants.add(request.user)
            status=201
        else:
            status=200
        return Response(ChatRoomSerializer(chat).data, status=status)

    def __get_bool_from_request__(self, value):
        return bool(value) and value.lower() not in ('false', '0')


class ChatRoomItem(APIView):
    @set_instance('ChatRoom')
    def get(self, request, chatroom):
        chat_serializer = ChatRoomSerializer(chatroom)
        return Response(chat_serializer.data)

    @set_instance('ChatRoom')
    def put(self, request, chatroom):
        if request.data.get('user_id', False) and request.data.get('action', False):
            if (request.data.get('action') == 'invite'):
                chatroom.invite(self.__get_new_user_from_request__(request))
            else:
                chatroom.participants.remove(self.__get_new_user_from_request__(request))
                if len(chatroom.participants.all()) == 0:
                    chatroom.delete()
                    return Response({})
            return Response(ChatRoomSerializer(chatroom).data)
        else:
            chat_serializer = ChatRoomSerializer(data=self.__get_chat_params__(request))
            if chat_serializer.is_valid():
                chat_serializer.save()
                return Response(chat_serializer.data)
            else:
                return Response(chat_serializer.errors, status=400)


    def __get_new_user_from_request__(self, request):
        return Account.objects.get(pk=request.data.get('user_id'))

    def __get_chat_params__(self, request):
        params = {}
        for key in self.__chat_params__:
            params[key] = request.data.get(key)
        return params

    __chat_params__ = ['name', 'is_public', 'created_at']



class MessageList(APIView):
    def get(self, request, room_name):
        try:
            chat = ChatRoom.objects.get(name=room_name)
        except ChatRoom.DoesNotExist:
            return Response(status=404)
        messages = Message.objects.filter(room=chat)
        return Response(MessageSerializer(messages, many=True).data)
