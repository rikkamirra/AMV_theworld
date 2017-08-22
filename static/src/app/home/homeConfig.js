function homeConfig($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: '<tw-login-form></tw-login-form>'
  })
  .state('registration', {
    url: '/registration',
    template: '<reg-form></reg-form>'
  });
}

homeConfig.$inject = ['$stateProvider'];

export default homeConfig;
