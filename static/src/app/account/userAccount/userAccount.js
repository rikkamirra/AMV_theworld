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
    // this.user = UserService.user;
    // UserService.getWorlds().then(res => {
    //   this.user.worlds = res.data;
    // });
  }

  this.showDeleteButton = () => this.isShowDeleteButton = true;
  this.hideDeleteButton = () => this.isShowDeleteButton = false;
}

UserAccountController.$inject = ['UserService', '$state', 'Carousel'];

export default userAccount;
