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

    addPicture({ instance_type = 'account', instance_id = 1 } = {}) {
      return $uibModal.open({
        animation: true,
        component: 'addPicture',
        resolve: {
          pictures: ['UserService', (UserService) => {
            return UserService.getPictures().then(res => res.data);
          }],
          instance_id: () => instance_id,
          instance_type: () => instance_type
        }
      });
    }
  }
}

ModalService.$inject = ['$uibModal'];

export default ModalService;
