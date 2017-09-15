import { pick } from 'underscore';

const articleManager = {
  restrict: 'E',
  template: require('./articleManager.html'),
  bindings: {
    article: '<',
    category: '<',
    world: '<',
    mode: '<'
  },
  controller: ArticleManagerController
};

function ArticleManagerController(ArticleService, UserService, $state, $rootScope, Upload, $sce, ModalService) {
  this.$onInit = () => {
    this.isEdit = false;
    if (this.article && !this.article.parsedBody) {
      this.article.parsedBody = $sce.trustAsHtml(this.article.body);
    }

    ArticleService.getArticlesByWorld(this.world.id).then(res => {
      this.allArticles = res.data;
    });

    this.accessToChange = (UserService.getCurrentUser().id === this.world.author);
  };

  this.addImage = () => {
    ModalService.addPicture().result.then(picture => {
      this.article.body = this.article.body ? this.article.body + `\n<div><img height="300" src="${picture.path}"></div>\n` : `<div><img height="300" src="${picture.path}"></div>\n`;
    });
  };

  this.addText = () => {
    this.article.body += '\n<p>\nВставьте текст сюда\n</p>\n';
  };

  this.showArticle = () => {
    this.article.parsedBody = $sce.trustAsHtml(this.article.body);
    this.isEdit = false;
  };

  this.showEditTools = () => {
    this.isEdit = true;
  };

  this.articleAction = () => {
    if (this.article.id) {
      this.editArticle();
    } else {
      this.saveArticle();
    }
  }

  this.saveArticle = () => {
    ArticleService.createArticle(
      Object.assign(pick(this.article, 'title', 'body'), { category_id: this.category.id, world_id: this.world.id })
    ).then(res => {
      $state.reload();
    });
  };

  this.editArticle = () => {
    ArticleService.updateArticle(
      this.article.id,
      Object.assign(pick(this.article, 'title', 'body', 'world_id'), { category_id: this.category.id })
    ).then(res => {
      $state.reload();
    });
  };

  this.deleteArticle = () => {
    ArticleService.deleteArticle(this.article.id).then(res => {
      $state.reload();
    });
  };

  this.addArticleToCategory = (article) => {
    ArticleService.addArticleToCategory({ article_id: article.id, category_id: this.category.id }).then(res => {
      $state.reload();
    });
  }
}

ArticleManagerController.$inject = ['ArticleService', 'UserService', '$state', '$rootScope', 'Upload', '$sce', 'ModalService'];

export default articleManager;
