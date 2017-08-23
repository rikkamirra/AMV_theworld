function AppRun($rootScope, $state, $cookies, UserService, ConstructService) {
  UserService.getCurrentUser();

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.module === 'private' && !UserService.user) {
      e.preventDefault();
      $state.go('login');
    }
  });
}

AppRun.$inject = ['$rootScope', '$state', '$cookies', 'UserService', 'ConstructService'];

export default AppRun;