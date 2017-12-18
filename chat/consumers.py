import json
from channels import Group
from channels.sessions import channel_session
from urllib.parse import parse_qs

from user.models import Account
from .models import ChatRoom, Message
from Crypto.PublicKey import RSA

# Connected to websocket.connect
@channel_session
def ws_connect(message, room_id):
    # Accept connection
    message.reply_channel.send({"accept": True})
    # Parse the query string
    params = parse_qs(message.content["query_string"])
    if b"user" in params:
        # Set the username in the session
        message.channel_session["user"] = params[b"user"][0].decode("utf8")
        # Add the user to the room_name group
        Group(room_id).add(message.reply_channel)

        room = ChatRoom.objects.get(pk=room_id)
    else:
        # Close the connection.
        message.reply_channel.send({"close": True})

# Connected to websocket.receive
@channel_session
def ws_message(message, room_id):
    sender = Account.objects.get(pk=message.channel_session['user'])
    message_to_save = Message.objects.create(room=ChatRoom.objects.get(pk=room_id), text=message["text"], sender=sender)
    Group(room_id).send({
        "text": json.dumps({
            "text": message_to_save.text,
            "sender_name": sender.username,
            "created_at": str(message_to_save.created_at)
        })
    })

# Connected to websocket.disconnect
@channel_session
def ws_disconnect(message, room_id):
    Group("chat-%s" % room_name).discard(message.reply_channel)
