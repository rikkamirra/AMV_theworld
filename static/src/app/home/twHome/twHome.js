const twHome = {
  restrict: 'E',
  template: require('./twHome.html'),
  bindings: {},
  controller: TwHomeController
};

function TwHomeController(UserService, ConstructService, ChatService, ModalService, $state) {
  this.$onInit = () => {
    ConstructService.getAllWorlds().then(res => {
      this.worlds = res.data;
    });

    ChatService.getAllChats().then(res => this.chats = res.data);

    this.isOpenChat = UserService.getCurrentUser();
  };

  this.createChat = () => {
    ModalService.createChat().result.then(chat => {
      $state.go('chat', {roomName: chat.name})
    });
  }

  this.begin = () => {
    if (!UserService.user) {
      $state.go('login', {nextState: 'newConstruct'});
    } else {
      $state.go('newConstruct');
    }
  };
}

TwHomeController.$inject = ['UserService', 'ConstructService', 'ChatService', 'ModalService', '$state'];

export default twHome;
