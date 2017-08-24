const categoryItem = {
  restrict: 'E',
  template: require('./categoryItem.html'),
  bindings: {
    world: '<',
    root: '<'
  },
  controller: CategoryItemController
};

function CategoryItemController(ConstructService, ArticleService, UserService, $state, $rootScope, $cookies) {
  this.$onInit = () => {
    this.config = {
      isShowInput: false,
      isShowChildren: true
    };

    this.isDeleted = false;

    ConstructService.getChildren(this.root.pk).then(res => {
      this.children = res.data;
    });
    ArticleService.getArticlesByCategory(this.root.pk).then(res => {
      this.articles = res.data;
    });
  };

  this.showInput = () => this.config.isShowInput = !this.config.isShowInput;

  this.showChildren = () => this.config.isShowChildren = !this.config.isShowChildren;

  this.showArticleBody = (article) => {
    if (article.isShowBody === undefined) {
      article.isShowBody = true;
    } else {
      article.isShowBody = !article.isShowBody;
    }
  };

  this.addCategory = () => {
    ConstructService.createCategory({
      name: this.newCategoryName,
      world_id: this.world.pk,
      parent_id: this.root.pk
    }).then(res => {
      this.children = res.data;
      this.isShowInput = false;
    });
  };

  this.deleteCategory = () => {
    ConstructService.deleteCategory(this.root.pk).then(res => {
      this.isDeleted = true;
    });
  };

  this.clickArticle = (article) => {
    $rootScope.$emit('showArticle', {article, category: this.root});
  };
}

CategoryItemController.$inject = ['ConstructService', 'ArticleService', 'UserService', '$state', '$rootScope'];

export default categoryItem;
