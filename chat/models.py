from django.db import models
from user.models import Account


class ChatRoom(models.Model):
    name = models.CharField(max_length=16)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    sender = models.ForeignKey(Account)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
