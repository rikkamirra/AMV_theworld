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
      })
    },

    editWorld(worldId) {
      return $uibModal.open({
        animation: true,
        component: 'editWorld',
        resolve: {
          world: ['ConstructService', (ConstructService) => {
            return ConstructService.getWorld(worldId).then(res => res.data);
          }]
        }
      })
    },

    enterKey() {
      return $uibModal.open({
        animation: true,
        component: 'enterKey'
      });
    }
  }
}

ModalService.$inject = ['$uibModal'];

export default ModalService;
