function ModalService($uibModal) {
  return {
    openLoginForm() {
      return $uibModal.open({
        animation: true,
        component: 'loginForm'
      })
    },

    openRegForm() {
      return $uibModal.open({
        animation: true,
        component: 'regForm'
      });
    },

    addPicture() {
      return $uibModal.open({
        animation: true,
        component: 'addPicture',
        resolve: {
          pictures: ['UserService', (UserService) => {
            return UserService.getCurrentUser().pictures;
          }]
        }
      });
    }
  }
}

ModalService.$inject = ['$uibModal'];

export default ModalService;
