import { map } from 'underscore';

const profileInfo = {
  restrict: 'E',
  template: require('./profileInfo.html'),
  bindings: {
    profile: '<'
  },
  controller: ProfileInfoController
};

function ProfileInfoController(UserService, $state) {
  this.$onInit = () => {

  }
}

ProfileInfoController.$inject = ['UserService', '$state', 'Carousel'];

export default profileInfo;
