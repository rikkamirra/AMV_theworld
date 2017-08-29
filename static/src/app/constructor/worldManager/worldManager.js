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
  };

  this.$onDestroy = () => {
    this.showArticleListner();
  };

  this.createWorld = () => {
    ConstructService.createWorld(this.name).then((res) => {
      this.isCreated = true;
      this.world = res.data;
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
  }
}

WorldManagerController.$inject = ['ConstructService', 'UserService', '$state', '$rootScope'];

export default worldManager;
