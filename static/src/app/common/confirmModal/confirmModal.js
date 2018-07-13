const confirmModal = {
  restrict: 'E',
  template: require('./confirmModal.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: ConfirmModalController
};

function ConfirmModalController() {
}

ConfirmModalController.$inject = [];

export default confirmModal;
