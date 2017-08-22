import $ from 'jquery';

function UserService($http, $cookies, $rootScope, $state) {
  return {
    user: null,

    createUser(creds) {
      return $http({
        method: 'POST',
        url: 'registration/',
        data: $.param(creds)
      }).then(res => {
        this.setUserData(res);
      });
    },

    login(creds) {
      return $http({
        method: 'POST',
        url: 'login/',
        data: $.param(creds)
      }).then(res => {
        this.setUserData(res);
      });
    },

    logout() {
      return $http({
        method: 'GET',
        url: 'logout/'
      }).then(res => {
        this.clearUserData();
      });
    },

    getCurrentUser() {
      if (!$cookies.getObject('currentUser')) {
        return null;
      }
      this.user = $cookies.getObject('currentUser');
      return this.user;
    },

    setUserData(response) {
      this.user = response.data;
      $cookies.putObject('currentUser', response.data);
    },

    clearUserData() {
      this.user = null;
      $cookies.remove('currentUser');
    }
  }
}

UserService.$inject = ['$http', '$cookies', '$rootScope', '$state'];

export default UserService;
