import $ from 'jquery';

function AppRun($rootScope, $state, $cookies, $http, UserService, ConstructService, CryptoService) {
  $http.get('/info/').then(response => {
      $cookies.put('csrftoken', response.headers('csrftoken'));
      if (response.data) {
        UserService.setUserData(response.data)
      }
  });

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
