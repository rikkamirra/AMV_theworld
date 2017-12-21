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
    this.userId = UserService.getCurrentUser().id;
    this.enableChat = false;
    this.webSocket = new WebSocket(`ws://${window.location.host}/ws_chat/${this.chat.id}?user=${this.userId}`);

    this.webSocket.onmessage = (message) => {
      var data = JSON.parse(message.data);
      if (data.text) {
        this.chat.messages.push(data);
      }
      $scope.$digest();
    }

    this.webSocket.onopen = () => {
      this.enableChat = !!this.userId;
      $scope.$digest();
    }

    UserService.getAllUsers().then(res => this.users = res.data);
    this.canInvite = false;
    this.shifr = 'visener';
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

  this.selectUserForInvite = (user) => {
    this.userToInvite = user.username;
    this.userIdToInvite = user.id;
    this.canInvite = true;
  }

  this.inviteUser = () => {
    ChatService.updateChat({user_id: this.userIdToInvite, action: 'invite'}, this.chat.id).then(res => this.chat = res.data);
  }

  this.removeUser = (user_id) => {
    ChatService.updateChat({ user_id, action: 'remove' }, this.chat.id).then(res => this.chat = res.data);
  }
}

ChatComponentController.$inject = ['$scope', 'UserService', '$cookies', 'CryptoService', 'ChatService'];

export default chatComponent;
