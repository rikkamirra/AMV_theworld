const worldManager = {
  restrict: 'E',
  template: require('./worldManager.html'),
  bindings: {
    world: '<'
  },
  controller: WorldManagerController
};

function WorldManagerController(ConstructService, UserService, $state) {
  this.$onInit = () => {
    this.user = UserService.user;
    console.log(this);
    if (this.world) {
      this.isCreated = true;
    }
  };

  this.createWorld = () => {
    ConstructService.createWorld(this.title).then((res) => {
      this.isCreated = true;
      this.world = res.data;
    });
  };

  this.showCategoryInput = () => this.isShowCategoryInput = true;

  this.addCategory = (category) => {
    ConstructService.createCategory({
      name: category.name,
      world_id: this.world.pk,
      parent_id: 0
    }).then(res => {
      this.world.categories = res.data;
    });
  };
}

WorldManagerController.$inject = ['ConstructService', 'UserService', '$state'];

export default worldManager;
