import $ from 'jquery';

function AppRun($rootScope, $state, $cookies, $http, UserService, ConstructService, CryptoService) {
  $http.get('/info/').then(response => {
      $cookies.put('csrftoken', response.headers('csrftoken'));
      if (response.data) {
        UserService.setUserData(response.data);
        $rootScope.run = true;
      }
  });

  CryptoService.getKey();
}

AppRun.$inject = ['$rootScope', '$state', '$cookies', '$http', 'UserService', 'ConstructService', 'CryptoService'];

export default AppRun;
