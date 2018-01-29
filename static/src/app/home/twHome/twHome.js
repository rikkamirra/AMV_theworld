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

    this.isAuth = UserService.isAuthenticate();

    if (this.isAuth) {
      ChatService.getAllChats().then(res => this.chats = res.data);
    }
  };

  this.createChat = () => {
    ModalService.createChat().result.then(chat => {
      $state.go('chat', {roomName: chat.id})
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
