function adminConfig($stateProvider) {
  $stateProvider.state('admin', {
    url: '/myadmin',
    template: '<admin-dashboard></admin-dashboard>'
  }).state('table', {
    url: '/:instanceName',
    parent: 'admin',
    params: {instanceName: ''},
    template: '<admin-table list="ctrl.list" instance-name="ctrl.instanceName"></admin-table>',
    resolve: {
      list: ['AdminService', '$stateParams', (AdminService, $stateParams) => {
        return AdminService.getList($stateParams.instanceName).then(res => res.data);
      }],
      instanceName: ['$stateParams', ($stateParams) => {
        return $stateParams.instanceName;
      }]
    },
    controller: 'AdminController as ctrl'
  }).state('form', {
    url: '/:instanceName/:instanceId',
    parent: 'admin',
    params: {instanceName: '', instanceId: null},
    template: '<admin-form instance-name="ctrl.instanceName" instance-data="ctrl.instanceData"></admin-form>',
    resolve: {
      instanceData: ['AdminService', '$stateParams', (AdminService, $stateParams) => {
        return AdminService.getInstance($stateParams.instanceName, $stateParams.instanceId).then(res => res.data);
      }],
      instanceName: ["$stateParams", ($stateParams) => {
        return $stateParams.instanceName;
      }]
    },
    controller: "AdminWorldsController as ctrl"
  })
}

adminConfig.$inject = ['$stateProvider'];

export default adminConfig;
