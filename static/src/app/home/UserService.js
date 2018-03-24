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
        this.setUserData(res.data);
      });
    },

    updateUser(data) {
      return $http({
        method: 'PATCH',
        url: `account/${this.user.id}`,
        data
      }).then(res => {
        this.setUserData(res.data);
        return res;
      });
    },

    login(creds) {
      return $http({
        method: 'POST',
        url: 'login/',
        data: creds
      }).then(res => {
        this.setUserData(res.data);
      });
    },

    getAllUsers() {
      return $http({
        method: 'GET',
        url: 'accounts/'
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
        method: 'DELETE',
        url: 'login/'
      }).then(res => {
        this.clearUserData();
        if ($state.current.name === 'account') {
          $state.go('root');
        } else {
          $state.reload();
        }
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

    getUser(userId) {
      if (this.user) {
        userId = this.user.id;
      }
      return $http({
        method: 'GET',
        url: `/account/${userId}`
      }).then(res => {
        this.setUserData(res.data);
        return res;
      });
    },

    getCurrentUser() {
      if (!this.user && $cookies.getObject('currentUser')) {
        this.user = $cookies.getObject('currentUser');
      }
      return this.user;
    },

    isAuthenticate() {
      return this.user && this.user.id
    },

    setUserData(data) {
      this.user = omit(data, 'pictures', 'worlds');
      $cookies.putObject('currentUser', omit(data, 'pictures', 'worlds'));
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
