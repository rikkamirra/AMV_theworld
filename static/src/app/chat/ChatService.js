function ChatService($http) {
  return {
    getAllUserChats() {
      return $http({
        method: 'GET',
        url: `chats/`
      });
    },

    createChat(chat) {
      return $http({
        method: 'POST',
        url: 'chats/',
        data: chat
      })
    },

    getMessages(roomName) {
      return $http({
        method: 'GET',
        url: `messages/${roomName}`
      });
    }
  }
}

ChatService.$inject = ['$http'];

export default ChatService;
