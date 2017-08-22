function accountConfig($stateProvider) {
  $stateProvider.state('account', {
    url: '/account',
    template: '<user-account></user-account>'
  });
}

accountConfig.$inject = ['$stateProvider'];

export default accountConfig;
