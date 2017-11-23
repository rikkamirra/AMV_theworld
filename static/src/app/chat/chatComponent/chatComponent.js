const chatComponent = {
  restrict: 'E',
  template: require('./chatComponent.html'),
  bindings: {
    roomName: '<',
    messages: '<'
  },
  controller: ChatComponentController
};


function ChatComponentController($scope, UserService, $cookies) {
  this.$onInit = () => {
    this.userId = UserService.getCurrentUser().id;
    this.enableChat = false && this.userId;
    this.webSocket = new WebSocket(`ws://${window.location.host}/chat/${this.roomName}?user=${this.userId}`);

    this.webSocket.onmessage = (message) => {
      var data = JSON.parse(message.data);
      console.log(data);
      if (data.text) {
        this.messages.push(data);
      }
      $scope.$digest();
    }

    this.webSocket.onopen = () => {
      this.enableChat = true && this.userId;
      $scope.$digest();
    }
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
}

ChatComponentController.$inject = ['$scope', 'UserService', '$cookies'];

export default chatComponent;
