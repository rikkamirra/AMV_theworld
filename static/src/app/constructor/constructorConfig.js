function constructorConfig($stateProvider) {
  $stateProvider.state('newConstruct', {
    url: '/constructor/new',
    module: 'private',
    template: '<world-manager></world-manager>'
  })
  .state('construct', {
    url: '/constructor/:worldId',
    module: 'private',
    template: '<world-manager world="ctrl.world"></world-manager>',
    resolve: {
      world: ['ConstructService', '$stateParams', function(ConstructService, $stateParams) {
        if ($stateParams.worldId) {
          return ConstructService.getWorld($stateParams.worldId).then(res => res.data);
        } else {
          return null;
        }
      }]
    },
    controller: 'ConstructController as ctrl'
  })
  .state('article', {
    parent: 'construct',
    url: '/article/:articleId',
    template: '<article-manager article="ctrl.article" category="ctrl.category" world="ctrl.world"></article-manager>',
    resolve: {
      article: ['ArticleService', '$stateParams', (ArticleService, $stateParams) => {
        return ArticleService.getArticle($stateParams.articleId).then(res => res.data);
      }]
    },
    controller: 'ShowArticleController as ctrl'
  })
  .state('newArticle', {
    parent: 'construct',
    url: '/article/new',
    params: {
      category: null,
      world: null
    },
    template: '<article-manager category="ctrl.category" world="ctrl.world"></article-manager>',
    resolve: {
      category: ['$stateParams', ($stateParams) => {
        return $stateParams.category;
      }],
      world: ['$stateParams', ($stateParams) => {
        return $stateParams.world;
      }]
    },
    controller: 'CreateArticleController as ctrl'
  })
};

constructorConfig.$inject = ['$stateProvider'];

export default constructorConfig;
