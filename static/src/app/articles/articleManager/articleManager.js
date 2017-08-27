import { omit } from 'underscore';

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

function ArticleManagerController(ArticleService, UserService, $state, $rootScope, Upload, $sce) {
  this.$onInit = () => {
    // this.parsedBody = $sce.trustAsHtml(this.article.fields.body);
    this.showParsedBody = true;
    if (!this.article.parsedBody) {
      this.article.parsedBody = $sce.trustAsHtml(this.article.fields.body);
    }

    ArticleService.getAllArticles(this.world.pk).then(res => {
      this.allArticles = res.data;
    });
  };

  this.upload = function (file) {
    Upload.upload({
      url: 'https://api.cloudinary.com/v1_1/drjvh4g6x/image/upload/',
      data: { file: file, upload_preset: 'zero8500zero', api_key: '467695578193825' }
    }).then(function (resp) {
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  this.submitImage = () => {
    if (this.image) {
      this.upload(this.image);
    }
  };

  this.parseBody = () => {
    this.article.parsedBody = $sce.trustAsHtml(this.article.fields.body);
    this.showParsedBody = true;
  };

  this.showHtmlCode = () => {
    this.showParsedBody = false;
  };

  this.articleAction = () => {
    if (this.article.pk) {
      this.editArticle();
    } else {
      this.saveArticle();
    }
  }

  this.saveArticle = () => {
    ArticleService.createArticle(
      Object.assign(this.article.fields, { category_id: this.category.pk, world_id: this.world.pk })
    ).then(res => {
      $state.reload();
    });
  };

  this.editArticle = () => {
    ArticleService.updateArticle(this.article.pk, Object.assign(this.article.fields, { category_id: this.category.pk })).then(res => {
      $state.reload();
    });
  };

  this.deleteArticle = () => {
    ArticleService.deleteArticle(this.article.pk).then(res => {
      $state.reload();
    });
  };

  this.addArticleToCategory = (article) => {
    ArticleService.addArticleToCategory({ article_id: article.pk, category_id: this.category.pk }).then(res => {
      $state.reload();
    });
  }
}

ArticleManagerController.$inject = ['ArticleService', 'UserService', '$state', '$rootScope', 'Upload', '$sce'];

export default articleManager;
