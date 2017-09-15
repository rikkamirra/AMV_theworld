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
};

constructorConfig.$inject = ['$stateProvider'];

export default constructorConfig;
