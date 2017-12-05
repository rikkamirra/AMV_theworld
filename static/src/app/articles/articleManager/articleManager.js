import { pick, sortBy } from 'underscore';

const articleManager = {
  restrict: 'E',
  template: require('./articleManager.html'),
  bindings: {
    article: '<',
    category: '<',
    world: '<'
  },
  controller: ArticleManagerController
};

function ArticleManagerController(ArticleService, UserService, $state, $rootScope, Upload, $sce, ModalService, ConstructService, $interval) {
  this.$onInit = () => {
    if (!(this.world || this.category)) window.history.back();

    if (!this.article) {
      this.article = {
        body: ''
      }
    }

    this.isEdit = !(this.article && this.article.id);

    if (this.article && !this.article.parsedBody) {
      this.article.parsedBody = $sce.trustAsHtml(this.article.body);
    }


    ArticleService.getArticlesByWorld(this.world.id).then(res => {
      this.allArticles = res.data;
    });

    this.accessToChange = (UserService.getCurrentUser().id === this.world.author);

    this.cryptoStatusChangedEvent = $rootScope.$on('worldChanged', (e, newWorld) => {
      if (newWorld) {
        this.world = newWorld;
      }
      this.articleAction();
    });
  };

  this.$onDestroy = () => {
    this.cryptoStatusChangedEvent();
    if (this.authSaveStop) {
      $interval.cancel(this.authSaveStop);
    }
  }

  this.$onChanges = (obj) => {
    this.isEdit = !(this.article && this.article.id);
  };

  this.addImage = () => {
    if (!(this.article && this.article.id)) return;
    ModalService.addPicture({instance_type: 'article', instance_id: this.article.id}).result.then(picture => {
      this.article.body += `<div><img height="300" style="margin: 0.5rem;" src="${picture.path}"></div>\n`
    });
  };

  this.addText = () => {
    this.article.body = (this.article.body || '') + '\n<p>\nВставьте текст сюда\n</p>\n';
  };

  this.sortText = () => {
    this.article.body = sortBy(this.article.body.split('\n')).join('\n');
  };

  this.handleKeyPress = (e) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault();
        let position = e.srcElement.selectionStart;
        let stringToInsert = '</br>\n';
        this.article.body = ArticleService.insertString(position, this.article.body,  stringToInsert);
        break;
      default:
        break;
    }
  };

  this.showArticle = () => {
    this.article.parsedBody = $sce.trustAsHtml(this.article.body);
    this.isEdit = false;
  };

  this.showEditTools = () => {
    this.isEdit = true;
    let reload = false;
    this.authSaveStop = $interval(() => {
      this.showAuthsaveMessage = true;
      this.articleAction(reload).then(res => {
        this.showAuthsaveMessage = false;
      });
    }, 10000);
  };

  this.getArticleAction = () => {
    if (this.article.id) {
      return this.editArticle;
    } else {
      return this.saveArticle;
    }
  };

  this.articleAction = (reload = true) => {
    return this.getArticleAction().call(this).then(res => {
      if (reload) {
        $state.reload();
      }
    });
  };

  this.saveArticle = () => {
    return ArticleService.createArticle(
      Object.assign(pick(this.article, 'title', 'body'), { world: this.world.id, category: this.category.id }),
      this.world.is_private
    );
  };

  this.editArticle = () => {
    return ArticleService.updateArticle(
      this.article.id,
      pick(this.article, 'title', 'body'),
      this.world.is_private
    );
  };

  this.deleteArticle = () => {
    ArticleService.deleteArticle(this.article.id).then(res => {
      $state.go('construct', { worldId: this.article.world.id });
    });
  };

  this.addArticleToCategory = (article) => {
    ArticleService.addArticleToCategory({ article_id: article.id, category_id: this.category.id }).then(res => {
      $state.reload();
    });
  };

  this.addComment = () => {
    this.comment.article_id = this.article.id;
    ArticleService.addComment(this.comment).then(res => {
      this.article.comments.push(res.data);
      this.comment.text = '';
    })
  }
}

ArticleManagerController.$inject = ['ArticleService', 'UserService', '$state', '$rootScope', 'Upload', '$sce', 'ModalService', 'ConstructService', '$interval'];

export default articleManager;
