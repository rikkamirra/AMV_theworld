function homeConfig($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    params: { nextState: 'root', nextStateParams: {} },
    template: '<tw-login-form next-state="ctrl.nextState" next-state-params="ctrl.nextStateParams"></tw-login-form>',
    resolve: {
      nextState: ['$stateParams', function($stateParams) {
        return $stateParams.nextState;
      }],
      nextStateParams: ['$stateParams', function($stateParams) {
        return $stateParams.nextStateParams;
      }]
    },
    controller: 'LoginController as ctrl'
  })
  .state('registration', {
    url: '/registration',
    template: '<reg-form></reg-form>'
  });
}

homeConfig.$inject = ['$stateProvider'];

export default homeConfig;
