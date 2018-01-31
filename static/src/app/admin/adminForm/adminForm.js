const adminForm = {
  restrict: 'E',
  template: require('./adminForm.html'),
  bindings: {
    instanceName: '=',
    instanceData: '<'
  },
  controller: AdminFormController
};

function AdminFormController(AdminService) {
  this.$onInit = () => {
    this.newModel = angular.copy(this.instanceData);
  }
  this.getTypeOfField = AdminService.getType.bind(AdminService);

  this.update = () => {
    AdminService.update(this.instanceName, this.instanceData.id, this.newModel).then(res => {
      this.instanceData = res.data;
    });
  }
}

AdminFormController.$inject = ['AdminService'];

export default adminForm;
