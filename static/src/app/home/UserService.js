import $ from 'jquery';
import { omit } from 'underscore';

function UserService($http, $cookies, $rootScope, $state) {
  return {
    user: null,
    style: null,

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

    getWorlds() {
      return $http({
        method: 'GET',
        url: 'account/worlds'
      })
    },

    logout() {
      return $http({
        method: 'GET',
        url: 'logout/'
      }).then(res => {
        this.clearUserData();
      });
    },

    saveImage({path, instance_type = 'account', instance_id = this.user.id}) {
      const params = {
        path,
        instance_type,
        instance_id,
        owner: this.user.id
      };

      return $http({
        method: 'POST',
        url: 'account/upload_image',
        data: $.param(params)
      });
    },

    getUser() {
      return $http({
        method: 'GET',
        url: '/user'
      })
    },

    getCurrentUser() {
      if (!$cookies.getObject('currentUser')) {
        return this.user;
      }
      this.user = $cookies.getObject('currentUser');
      return this.user;
    },

    setUserData(response) {
      this.user = omit(response.data, 'pictures', 'worlds');
      $cookies.putObject('currentUser', this.user);
    },

    clearUserData() {
      this.user = null;
      $cookies.remove('currentUser');
    },

    setStyle(style) {
      this.style = style;
    },

    getStyle() {
      return this.style;
    }
  }
}

UserService.$inject = ['$http', '$cookies', '$rootScope', '$state'];

export default UserService;
