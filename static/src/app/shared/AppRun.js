import $ from 'jquery';

function AppRun($rootScope, $state, $cookies, $http, UserService, ConstructService, CryptoService) {
  console.log(_userId);
  if (_userId) {
    UserService.getUser(_userId);
  }
  CryptoService.getKey();

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.module === 'private' && !UserService.user) {
      e.preventDefault();
      $state.go('login', { nextState: toState, nextStateParams: toParams });
    }
  });
}

AppRun.$inject = ['$rootScope', '$state', '$cookies', '$http', 'UserService', 'ConstructService', 'CryptoService'];

export default AppRun;
