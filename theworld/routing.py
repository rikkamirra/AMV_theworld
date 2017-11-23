from channels.routing import route
from chat.consumers import ws_connect, ws_message, ws_disconnect

channel_routing = [
    route("websocket.connect", ws_connect, path=r"/chat/(?P<room_name>[a-zA-Z0-9_]+)/?$"),
    route("websocket.receive", ws_message, path=r"/chat/(?P<room_name>[a-zA-Z0-9_]+)/?$"),
    route("websocket.disconnect", ws_disconnect, path=r"/chat/(?P<room_name>[a-zA-Z0-9_]+)/?$"),
]
