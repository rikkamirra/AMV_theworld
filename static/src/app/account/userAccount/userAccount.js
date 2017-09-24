import { map } from 'underscore';

const userAccount = {
  restrict: 'E',
  template: require('./userAccount.html'),
  bindings: {
    user: '<'
  },
  controller: UserAccountController
};

function UserAccountController(UserService, $state) {
  this.$onInit = () => {
    this.isShowDeleteButton = false;
  }
}

UserAccountController.$inject = ['UserService', '$state', 'Carousel'];

export default userAccount;
