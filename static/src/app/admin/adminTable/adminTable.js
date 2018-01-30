const adminTable = {
  restrict: 'E',
  template: require('./adminTable.html'),
  bindings: {
    list: '<',
  },
  controller: AdminTableController
};

function AdminTableController() {
  this.$onInit = () => {
    this.tableHeads = this.list.length ? Object.keys(this.list[0]) : [];
  }
}

AdminTableController.$inject = [];

export default adminTable;
