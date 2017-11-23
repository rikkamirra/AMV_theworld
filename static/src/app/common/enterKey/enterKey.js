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

function EnterKeyController(CryptoService, $rootScope) {
  this.$onInit = () => {
    this.key = CryptoService.getKey();
  }

  this.setNewKey = () => {
    CryptoService.setKey(this.key);
    $rootScope.$broadcast('worldChanged');
    this.close();
  }
}

EnterKeyController.$inject = ['CryptoService', '$rootScope'];

export default enterKey;
