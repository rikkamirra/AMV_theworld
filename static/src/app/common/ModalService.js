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
            return UserService.getPictures().then(res => res.data);
          }]
        }
      });
    }
  }
}

ModalService.$inject = ['$uibModal'];

export default ModalService;
