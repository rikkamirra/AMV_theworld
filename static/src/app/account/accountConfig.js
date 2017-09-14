function accountConfig($stateProvider) {
  $stateProvider.state('account', {
    url: '/account',
    module: 'private',
    template: '<user-account user="ctrl.user"></user-account>',
    resolve: {
      'user': ['UserService', (UserService) => {
        return UserService.getUser().then(res => res.data);
      }]
    },
    controller: "AccountController as ctrl"
  });
}

accountConfig.$inject = ['$stateProvider'];

export default accountConfig;
