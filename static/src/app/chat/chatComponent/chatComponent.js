const chatComponent = {
  restrict: 'E',
  template: require('./chatComponent.html'),
  bindings: {
    roomName: '<',
    chat: '<'
  },
  controller: ChatComponentController
};


function ChatComponentController($scope, UserService, $cookies, CryptoService, ChatService) {
  this.$onInit = () => {
    console.log(this);
    this.userId = UserService.getCurrentUser().id;
    this.enableChat = false && this.userId;
    this.webSocket = new WebSocket(`ws://${window.location.host}/chat/${this.roomName}?user=${this.userId}`);

    this.webSocket.onmessage = (message) => {
      var data = JSON.parse(message.data);
      if (data.text) {
        this.chat.messages.push(data);
      }
      $scope.$digest();
    }

    this.webSocket.onopen = () => {
      this.enableChat = true && this.userId;
      $scope.$digest();
    }

    UserService.getAllUsers().then(res => this.users = res.data);
  }

  this.$onDestroy = () => {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.close();
   }
  }

  this.sendMessage = () => {
    if (!this.message.body) return;
    this.webSocket.send(this.message.body);
    this.message.body = '';
  }

  this.inviteUser = () => {
    ChatService.updateChat({user_id: this.userToInvite.id}, this.chat.id).then(res => this.participants = res.data.participants);
  }
}

ChatComponentController.$inject = ['$scope', 'UserService', '$cookies', 'CryptoService', 'ChatService'];

export default chatComponent;
