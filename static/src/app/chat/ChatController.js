function ChatController(messages, $stateParams) {
  this.$onInit = () => {
    this.messages = messages;
    this.roomName = $stateParams.roomName;
    console.log('ctrl', messages);
  }
};

ChatController.$inject = ['messages','$stateParams'];

export default ChatController;
