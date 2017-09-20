function RootController(UserService, $state, ModalService) {
  this.$onInit = () => {
  };

  this.getUser = () => {
    this.user = UserService.user;
    return this.user;
  };

  this.login = () => {
    ModalService.openLoginForm().result.then(() => {
      $state.reload();
    });
  };

  this.logout = () => {
    UserService.logout().then(() => $state.reload());
  };
}

RootController.$inject = ['UserService', '$state', 'ModalService'];

export default RootController;
