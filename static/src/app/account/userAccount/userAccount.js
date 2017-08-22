const userAccount = {
  restrict: 'E',
  template: require('./userAccount.html'),
  controller: UserAccountController
};

function UserAccountController(UserService, $state) {
  this.$onInit = () => {
    this.user = UserService.user;
  }
}

UserAccountController.$inject = ['UserService', '$state'];

export default userAccount;
