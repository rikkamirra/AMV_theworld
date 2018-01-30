function adminConfig($stateProvider) {
  $stateProvider.state('admin', {
    url: '/myadmin/:instanceName',
    params: {instanceName: ''},
    template: '<admin-table list="ctrl.list"></admin-table>',
    resolve: {
      list: ['AdminService', '$stateParams', (AdminService, $stateParams) => {
        return AdminService.getList($stateParams.instanceName).then(res => res.data);
      }]
    },
    controller: 'AdminController as ctrl'
  });
}

adminConfig.$inject = ['$stateProvider'];

export default adminConfig;
