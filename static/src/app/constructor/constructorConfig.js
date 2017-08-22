function constructorConfig($stateProvider) {
  $stateProvider.state('construct', {
    url: '/constructor',
    module: 'private',
    template: '<p>Constructor</p>',
  });
};

constructorConfig.$inject = ['$stateProvider'];

export default constructorConfig;
