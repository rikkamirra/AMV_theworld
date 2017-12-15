function ChatController(chat, $stateParams) {
  this.$onInit = () => {
    this.chat = chat;
    this.roomName = $stateParams.roomName;
  }
};

ChatController.$inject = ['chat','$stateParams'];

export default ChatController;
