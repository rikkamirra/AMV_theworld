const adminInstanceView = {
  restrict: "E",
  template: require("./adminInstanceView.html"),
  bindings: {
    instance: "<",
    instanceName: "<"
  },
  controller: AdminInstanceViewController
};

function AdminInstanceViewController($sce) {
  this.$onInit = () => {
    if (Array.isArray(this.instance)) {
      this.type = "list";
    } else if (typeof this.instance === "object" && this.instance != null) {
      this.type = "obj";
      this.url = `/admin/${this.instanceName}/${this.instance.id}`;
    } else if (typeof this.instance === "string" && !isDate(this.instance)) {
      this.type = "html";
      this.instance = $sce.trustAsHtml(this.instance);
    } else if (isDate(this.instance)) {
      this.type = 'date';
    } else {
      this.type = "value";
    }
  };

  function isDate(value) {
    return !isNaN(Date.parse(value)) && !Number.isInteger(value);
  }
}

AdminInstanceViewController.$inject = ["$sce"];

export default adminInstanceView;
