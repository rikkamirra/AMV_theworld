const editAccount = {
  restrict: 'E',
  template: require('./editAccount.html'),
  bindings: {
    onSave: '&'
  },
  controller: EditAccountController
};

function EditAccountController(UserService) {
  this.$onInit = () => {
    this.user = angular.copy(UserService.getCurrentUser());
  }

  this.submit = () => {
    UserService.updateUser(this.user).then(res => this.onSave({newUserData: res.data}));
  }
}

export default editAccount;
