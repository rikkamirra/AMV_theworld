const categoryItem = {
  restrict: 'E',
  template: require('./categoryItem.html'),
  bindings: {
    world: '<',
    root: '<'
  },
  controller: CategoryItemController
};

function CategoryItemController(ConstructService, ArticleService, UserService, $state, $rootScope, $sce) {
  this.$onInit = () => {
    this.config = {
      isShowInput: false,
      isShowChildren: true
    };

    this.isDeleted = false;

    ConstructService.getChildren(this.root.id).then(res => {
      this.children = res.data;
    });

    ArticleService.getArticlesByCategory(this.root.id).then(res => {
      this.articles = res.data;
      this.articles.forEach((item) => {
        item.parsedBody = $sce.trustAsHtml(item.body);
      });
    });

    this.accessToChange = (UserService.getCurrentUser().id === this.world.author);
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
      world: this.world.id,
      parent_id: this.root.id
    }).then(res => {
      this.children = res.data;
      this.isShowInput = false;
    });
  };

  this.deleteCategory = () => {
    ConstructService.deleteCategory(this.root.id).then(res => {
      this.isDeleted = true;
    });
  };

  this.clickArticle = (article) => {
    $rootScope.$emit('showArticle', {article, category: this.root});
  };
}

CategoryItemController.$inject = ['ConstructService', 'ArticleService', 'UserService', '$state', '$rootScope', '$sce'];

export default categoryItem;
