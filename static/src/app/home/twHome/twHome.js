const twHome = {
  restrict: 'E',
  template: require('./twHome.html'),
  bindings: {},
  controller: TwHomeController
};

function TwHomeController(UserService, ConstructService, $state) {
  this.$onInit = () => {
    ConstructService.getAllWorlds().then(res => {
      this.worlds = res.data;
    });
  };

  this.begin = () => {
    if (!UserService.user) {
      $state.go('login', {nextState: 'newConstruct'});
    } else {
      $state.go('newConstruct');
    }
  };
}

TwHomeController.$inject = ['UserService', 'ConstructService', '$state'];

export default twHome;
