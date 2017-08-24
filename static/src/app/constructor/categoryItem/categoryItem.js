const categoryItem = {
  restrict: 'E',
  template: require('./categoryItem.html'),
  bindings: {
    world: '<',
    root: '<'
  },
  controller: CategoryItemController
};

function CategoryItemController(ConstructService, ArticleService, UserService, $state, $rootScope) {
  this.$onInit = () => {
    this.isShowInput = false;
    this.isDeleted = false;
    this.isShowChildren = false;
    ConstructService.getChildren(this.root.pk).then(res => {
      this.children = res.data;
    });
    ArticleService.getArticlesByCategory(this.root.pk).then(res => {
      this.articles = res.data;
    });
  };

  this.showInput = () => this.isShowInput = !this.isShowInput;

  this.showChildren = () => this.isShowChildren = !this.isShowChildren;

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
    console.log('gikhui');
    $rootScope.$emit('showArticle', {article, category: this.root});
  };
}

CategoryItemController.$inject = ['ConstructService', 'ArticleService', 'UserService', '$state', '$rootScope'];

export default categoryItem;
