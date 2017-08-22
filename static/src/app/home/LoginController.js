function LoginController(nextState, nextStateParams) {
  this.nextState = nextState;
  this.nextStateParams = nextStateParams;
};

LoginController.$inject = ['nextState', 'nextStateParams'];

export default LoginController;
