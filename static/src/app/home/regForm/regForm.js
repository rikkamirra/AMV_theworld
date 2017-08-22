const regForm = {
  restrict: 'E',
  template: require('./regForm.html'),
  bindings: {
    nextState: '@',
    nextStateParams: '<'
  },
  controller: RegFormController
};

function RegFormController(UserService, $state) {
  this.$onInit = () => {
    this.user = {
      role: ''
    };
  };
  
  this.submit = () => {
    UserService.createUser(this.user).then(() => {
      if (this.nextState) {
        $state.go(nextState, nextStateParams);
      } else {
        $state.go('root');
      }
    }).catch(res => {
      this.errors = res.data;
    });
  }
}

RegFormController.$inject = ['UserService', '$state'];

export default regForm;
