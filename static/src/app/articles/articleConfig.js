function articleConfig($stateProvider) {
  $stateProvider.state('showArticle', {
    url: '/article/:articleId',
    template: '<article-manager article="ctrl.article"></article-mamanger>',
    resolve: {
      article: ['ArticleService', '$stateParams', (ArticleService, $stateParams) => {
        return ArticleService.getArticle($stateParams.articleId).then(res => res.data);
      }]
    },
    controller: 'ArticleController as ctrl'
  });
};

articleConfig.$inject = ['$stateProvider'];

export default articleConfig;
