function articleConfig($stateProvider) {
  $stateProvider.state('newArticle', {
    url: '/category/:categoryId/create-article',
    module: 'private',
    params: { categoryId: '0' },
    template: '<article-manager location="ctrl.location"></article-manager>',
    resolve: {
      location: ['ConstructService', '$stateParams', function(ConstructService, $stateParams) {
        return ConstructService.getLocation($stateParams.categoryId).then(res => res.data.reverse());
      }]
    },
    controller: 'CreateArticleController as ctrl'
  })
  .state('article', {
    url: '/article/:articleId',
    module: 'private',
    template: '<article-manager article="ctrl.article"></article-manager>',
    params: {articleId: '0'},
    resolve: {
      article: ['ArticleService', '$stateParams', function(ArticleService, $stateParams) {
        if ($stateParams.articleId) {
          return ArticleService.getArticle($stateParams.articleId).then(res => res.data);
        } else {
          return null;
        }
      }]
    },
    controller: 'ArticleController as ctrl'
  });
};

articleConfig.$inject = ['$stateProvider'];

export default articleConfig;
