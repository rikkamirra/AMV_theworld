const twHome = {
  restrict: 'E',
  template: require('./twHome.html'),
  bindings: {},
  controller: TwHomeController
};

function TwHomeController(UserService, $state) {
  this.begin = () => {
    console.log('lol');
    if (!UserService.user) {
      $state.go('login', {nextState: 'construct'});
    } else {
      $state.go('construct');
    }
  };
}

TwHomeController.$inject = ['UserService', '$state'];

export default twHome;
