function ChatService($http, $state) {
  return {
    getAllChats() {
      return $http({
        method: 'GET',
        url: `chats/`
      });
    },

    getChat(room_id) {
      return $http({
        method: 'GET',
        url: `chats/${room_id}`
      });
    },

    createChat(chat) {
      return $http({
        method: 'POST',
        url: 'chats/',
        data: chat
      })
    },

    updateChat(params, chat_id) {
      return $http({
        method: 'PUT',
        url: `chats/${chat_id}`,
        data: params
      }).then(res => {
        if (Object.keys(res.data).length === 0) {
          $state.go('root');
        }
        return res;
      });
    },

    getMessages(roomName) {
      return $http({
        method: 'GET',
        url: `messages/${roomName}`
      });
    }
  }
}

ChatService.$inject = ['$http', '$state'];

export default ChatService;
