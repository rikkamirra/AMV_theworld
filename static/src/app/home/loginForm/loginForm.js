const loginForm = {
  restrict: 'E',
  template: require('./loginForm.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: LoginFormController
};

function LoginFormController(UserService, $state) {
  this.submit = () => {
    UserService.login(this.user).then(() => {
      this.close();
    }).catch(res => {
      this.errors = res.data;
    });
  }
}

LoginFormController.$inject = ['UserService', '$state'];

export default loginForm;
