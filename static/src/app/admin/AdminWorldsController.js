function AdminWorldsController(instanceData, instanceName) {
  this.instanceName = instanceName;
  this.instanceData = instanceData;
}

AdminWorldsController.$inject = ['instanceData', 'instanceName'];

export default AdminWorldsController;
