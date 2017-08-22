const userAccount = {
  restrict: 'E',
  template: require('./userAccount.html'),
  controller: UserAccountController
};

function UserAccountController(UserService, $state) {
  this.$onInit = () => {
    if (UserService.user) {
      this.user = UserService.user;
    } else {
      $state.go('root');
    }
  }
}

UserAccountController.$inject = ['UserService', '$state'];

export default userAccount;
