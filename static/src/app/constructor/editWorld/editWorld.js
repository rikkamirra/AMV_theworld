const editWorld = {
  restrict: 'E',
  template: require('./editWorld.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: EditWorldController
};

function EditWorldController(ConstructService, CryptoService, $rootScope) {
  this.$onInit = () => {
    this.world = this.resolve.world;
    this.cryptoKey = CryptoService.getKey();
  }

  this.submit = () => {
    if (this.cryptoKey) {
      CryptoService.setKey(this.cryptoKey);
    }
    ConstructService.updateAllArticles(this.world.id, this.world.is_private).then(() => {
      ConstructService.updateWorld(this.world, {crypt: this.world.is_private}).then(res => {
        this.close({$value: res.data});
      });
    });
  }
}

EditWorldController.$inject = ['ConstructService', 'CryptoService', '$rootScope'];

export default editWorld;
