import { map } from 'underscore';

const userAccount = {
  restrict: 'E',
  template: require('./userAccount.html'),
  controller: UserAccountController
};

function UserAccountController(UserService, $state) {
  this.$onInit = () => {
    this.user = UserService.user;
    UserService.getWorlds().then(res => {
      this.user.worlds = res.data;
    });
  }
}

UserAccountController.$inject = ['UserService', '$state', 'Carousel'];

export default userAccount;
