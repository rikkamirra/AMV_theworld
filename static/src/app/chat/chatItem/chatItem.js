const chatItem = {
  restrict: 'E',
  template: require('./chatItem.html'),
  bindings: {
    msg: '<'
  },
  controller: ChatItemController
};

function ChatItemController(UserService) {
}

ChatItemController.$inject = ['UserService'];

export default chatItem;
