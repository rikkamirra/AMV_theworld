function AdminController(list, instanceName) {
  this.list = list;
  this.instanceName = instanceName;
}

AdminController.$inject = ['list', 'instanceName'];

export default AdminController;
