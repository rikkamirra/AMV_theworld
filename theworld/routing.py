from channels.routing import route
from chat.consumers import ws_connect, ws_message, ws_disconnect

channel_routing = [
    route("websocket.connect", ws_connect, path=r"/ws_chat/(?P<room_id>\d+)/?$"),
    route("websocket.receive", ws_message, path=r"/ws_chat/(?P<room_id>\d+)/?$"),
    route("websocket.disconnect", ws_disconnect, path=r"/ws_chat/(?P<room_id>\d+)/?$"),
]
