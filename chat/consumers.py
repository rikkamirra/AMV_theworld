import json
from channels import Group
from channels.sessions import channel_session
from urllib.parse import parse_qs

from user.models import Account
from .models import ChatRoom, Message


# Connected to websocket.connect
@channel_session
def ws_connect(message, room_name):
    # Accept connection
    message.reply_channel.send({"accept": True})
    # Parse the query string
    params = parse_qs(message.content["query_string"])
    if b"user" in params:
        # Set the username in the session
        message.channel_session["user"] = params[b"user"][0].decode("utf8")
        # Add the user to the room_name group
        Group(room_name).add(message.reply_channel)

        room, room_created = ChatRoom.objects.get_or_create(name=room_name)
    else:
        # Close the connection.
        message.reply_channel.send({"close": True})

# Connected to websocket.receive
@channel_session
def ws_message(message, room_name):
    sender = Account.objects.get(pk=message.channel_session['user'])
    Message.objects.create(room=ChatRoom.objects.get(name=room_name), text=message["text"], sender=sender)
    Group(room_name).send({
        "text": json.dumps({
            "text": message["text"],
            "sender_name": sender.username,
        }),
    })

# Connected to websocket.disconnect
@channel_session
def ws_disconnect(message, room_name):
    Group("chat-%s" % room_name).discard(message.reply_channel)
