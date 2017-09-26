const worldManager = {
  restrict: 'E',
  template: require('./worldManager.html'),
  bindings: {
    world: '<'
  },
  controller: WorldManagerController
};

function WorldManagerController(ConstructService, UserService, ModalService, $state, $rootScope, CryptoService) {
  this.$onInit = () => {
    if (this.world.is_private && !CryptoService.getKey()) {
      this.changeKey();
    }
    this.user = UserService.user;
    if (this.world) {
      this.isCreated = true;
    }

    this.showArticleListner = $rootScope.$on('showArticle', (e, data) => {
      this.showArticle(data.article, data.category);
    });
    this.isShowWorldPictureEditor = false;

    this.style = {
      'background-image': `url(${this.world.picture})`,
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-attachment': 'fixed'
    };

    this.accessToChange = (this.user && this.user.id === this.world.author);
    this.isShowKeyInput = false;
  };

  this.$onDestroy = () => {
    this.showArticleListner();
  };

  this.changeKey = () => {
    ModalService.enterKey().result.then(() => {
      $state.reload();
    })
  }

  this.createWorld = () => {
    if (this.world.is_private && this.kay) {
      CryptoService.setKey(this.key);
    }
    ConstructService.createWorld(this.world).then((res) => {
      this.isCreated = true;
      this.world = res.data;
      this.accessToChange = true;
    });
  };

  this.showCategoryInput = () => this.isShowCategoryInput = true;

  this.addCategory = (category) => {
    ConstructService.createCategory({
      name: category.name,
      world: this.world.id,
      parent_id: 0
    }).then(res => {
      this.world.categories = res.data;
    });
  };

  this.showArticle = (article, category) => {
    if (article) {
      $state.go('article', {articleId: article.id, category: category, world: this.world});
    } else {
      $state.go('newArticle', {category: category, world: this.world});
    }
  };

  this.showWorldPictureEditor = () => {
    if (!(this.world && this.world.id)) return;
    ModalService.addPicture({instance_type : 'world', instance_id : this.world.id}).result.then(picture => {
      this.world.picture = picture.path;
      ConstructService.updateWorld(this.world).then(res => {
        this.world = res.data;
        this.style['background-image'] = `url(${this.world.picture})`;
      });
    });
  };
}

WorldManagerController.$inject = ['ConstructService', 'UserService', 'ModalService', '$state', '$rootScope', 'CryptoService'];

export default worldManager;
