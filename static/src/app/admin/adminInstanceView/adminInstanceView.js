const adminInstanceView = {
  restrict: "E",
  template: require("./adminInstanceView.html"),
  bindings: {
    instance: "<",
    instanceName: "<"
  },
  controller: AdminInstanceViewController
};

function AdminInstanceViewController($sce, AdminService) {
  this.$onInit = () => {
    this.type = AdminService.getType(this.instance);
    if (this.type === 'string' || this.type === 'long_string') {
      this.instance = $sce.trustAsHtml(this.instance);
    }
    if (this.type === 'dict') {
      this.url = `/admin/${this.instanceName}/${this.instance.id}`;
    }
  };
}

AdminInstanceViewController.$inject = ["$sce", "AdminService"];

export default adminInstanceView;
