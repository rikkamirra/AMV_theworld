function ModalService($uibModal) {
  return {
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
