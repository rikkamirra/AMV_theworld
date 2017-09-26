const enterKey = {
  restrict: 'E',
  template: require('./enterKey.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: EnterKeyController
};

function EnterKeyController(CryptoService) {
  this.$onInit = () => {
    this.key = CryptoService.getKey();
  }

  this.setNewKey = () => {
    CryptoService.setKey(this.key);
    this.close();
  }
}

EnterKeyController.$inject = ['CryptoService'];

export default enterKey;
