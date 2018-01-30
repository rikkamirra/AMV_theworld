const adminForm = {
  restrict: 'E',
  template: require('./adminForm.html'),
  bindings: {
    instanceName: '@',
    instanceData: '<'
  },
  controller: AdminFormController
};

function AdminFormController() {
  console.log(this);
}

AdminFormController.$inject = [];

export default adminForm;
