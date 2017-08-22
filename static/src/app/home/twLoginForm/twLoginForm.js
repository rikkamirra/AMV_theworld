const twLoginForm = {
  restrict: 'E',
  template: require('./twLoginForm.html'),
  bindings: {
    nextState: '<',
    nextStateParams: '<'
  },
  controller: TwLoginFormController
};

function TwLoginFormController(UserService, $state) {
  this.submit = () => {
    UserService.login(this.user).then(() => {
      if (this.nextState) {
        $state.go(this.nextState, this.nextStateParams);
      } else {
        $state.go('root');
      }
    }).catch(res => {
      this.errors = res.data;
    });
  }
}

TwLoginFormController.$inject = ['UserService', '$state'];

export default twLoginForm;
