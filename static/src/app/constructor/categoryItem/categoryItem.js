const categoryItem = {
  restrict: 'E',
  template: require('./categoryItem.html'),
  bindings: {
    world: '<',
    root: '<',
  },
  controller: CategoryItemController
};

function CategoryItemController(ConstructService, UserService, $state) {
  this.$onInit = () => {
    this.isShowInput = false;
    this.isDeleted = false;
    this.isShowChildren = false;
    ConstructService.getChildren(this.root.pk).then(res => {
      this.children = res.data;
    });
  };

  this.showInput = () => this.isShowInput = !this.isShowInput;

  this.showChildren = () => this.isShowChildren = !this.isShowChildren;

  this.addCategory = () => {
    ConstructService.createCategory({
      name: this.newCategoryName,
      world_id: this.world.pk,
      parent_id: this.root.pk
    }).then(res => {
      this.children = res.data;
      this.isShowInput = false;
    });
  };

  this.deleteCategory = () => {
    ConstructService.deleteCategory(this.root.pk).then(res => {
      this.isDeleted = true;
    });
  }
}

CategoryItemController.$inject = ['ConstructService', 'UserService', '$state'];

export default categoryItem;
