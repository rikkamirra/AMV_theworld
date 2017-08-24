const articleManager = {
  restrict: 'E',
  template: require('./articleManager.html'),
  bindings: {
    article: '<',
    location: '<',
    mode: '<'
  },
  controller: ArticleManagerController
};

function ArticleManagerController(ArticleService, UserService, $state, $rootScope) {
  this.$onInit = () => {
  };

  this.articleAction = () => {
    if (this.article.pk) {
      this.editArticle();
    } else {
      this.saveArticle();
    }
  }

  this.saveArticle = () => {
    ArticleService.createArticle({
      title: this.article.fields.title,
      body: this.article.fields.body,
      category_id: this.location.pk
    }).then(res => {
      $state.reload();
    });
  };

  this.editArticle = () => {
    ArticleService.updateArticle(this.article.pk, this.article.fields).then(res => {
      $state.reload();
    });
  };

  this.deleteArticle = () => {
    ArticleService.deleteArticle(this.article.pk).then(res => {
      $state.reload();
    });
  };
}

ArticleManagerController.$inject = ['ArticleService', 'UserService', '$state', '$rootScope'];

export default articleManager;
