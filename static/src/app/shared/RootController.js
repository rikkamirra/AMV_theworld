function RootController(UserService, $state) {
  this.$onInit = () => {
  };

  this.getUser = () => {
    this.user = UserService.user;
    return this.user;
  };

  this.logout = () => {
    UserService.logout().then(() => {
      $state.go('root');
    });
  };
}

RootController.$inject = ['UserService', '$state'];

export default RootController;
