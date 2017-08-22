const twHome = {
  restrict: 'E',
  template: require('./twHome.html'),
  bindings: {},
  controller: TwHomeController
};

function TwHomeController(UserService, $state) {
  this.begin = () => {
    if (!UserService.user) {
      $state.go('login', {nextState: 'account'});
    }
  };
}

TwHomeController.$inject = ['UserService', '$state'];

export default twHome;
