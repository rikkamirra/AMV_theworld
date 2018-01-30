function AdminWorldsController(worlds) {
  console.log(worlds);
  this.worlds = worlds;
}

AdminWorldsController.$inject = ['worlds'];

export default AdminWorldsController;
