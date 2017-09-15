const worldManager = {
  restrict: 'E',
  template: require('./worldManager.html'),
  bindings: {
    world: '<'
  },
  controller: WorldManagerController
};

function WorldManagerController(ConstructService, UserService, $state, $rootScope) {
  this.$onInit = () => {
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

    this.accessToChange = this.user.id === this.world.author;
  };

  this.$onDestroy = () => {
    this.showArticleListner();
  };

  this.createWorld = () => {
    ConstructService.createWorld(this.name).then((res) => {
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
    if (!article) {
      this.articleActionMode = 'create';
    } else {
      this.articleActionMode = 'edit';
    }
    this.selectedArticle = article;
    this.selectedCategory = category;
  };

  this.showWorldPictureEditor = () => {
    this.isShowWorldPictureEditor = !this.isShowWorldPictureEditor;
  };

  this.updateWorldPicture = (src) => {
    this.world.picture = src
    ConstructService.updateWorld(this.world).then(res => {
      this.world = res.data;
      this.style['background-image'] = `url(${this.world.picture})`;
    });
  };
}

WorldManagerController.$inject = ['ConstructService', 'UserService', '$state', '$rootScope'];

export default worldManager;
