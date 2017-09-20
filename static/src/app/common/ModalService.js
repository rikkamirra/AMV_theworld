function ModalService($uibModal) {
  return {
    openLoginForm() {
      return $uibModal.open({
        animation: true,
        component: 'loginForm',
        resolve: {

        }
      })
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
