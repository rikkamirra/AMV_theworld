function adminConfig($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin'
  });
}

adminConfig.$inject = ['$stateProvider'];

export default adminConfig;
