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
        data: creds
      }).then(res => {
        this.setUserData(res);
      });
    },

    updateUser(data) {
      return $http({
        method: 'PATCH',
        url: `account/${this.user.id}`,
        data
      }).then(res => {
        this.setUserData(res);
        return res;
      });
    },

    login(creds) {
      return $http({
        method: 'POST',
        url: 'login/',
        data: creds
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
        url: 'account/pictures',
        data: params
      });
    },

    getPictures() {
      return $http({
        method: 'GET',
        url: 'account/pictures'
      });
    },

    getUser() {
      return $http({
        method: 'GET',
        url: `/account/${this.user.id}`
      }).then(res => {
        this.setUserData(res);
        return res;
      });
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
      $cookies.putObject('currentUser', omit(response.data, 'pictures', 'worlds'));
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
