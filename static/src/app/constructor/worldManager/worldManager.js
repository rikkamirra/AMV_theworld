const worldManager = {
  restrict: 'E',
  template: require('./worldManager.html'),
  bindings: {
    world: '<'
  },
  controller: WorldManagerController
};

function WorldManagerController(ConstructService, UserService, ModalService, $state, $rootScope) {
  this.$onInit = () => {
    this.user = UserService.user;
    if (this.world) {
      this.isCreated = true;
    }

    this.showArticleListner = $rootScope.$on('showArticle', (e, data) => {
      this.showArticle(data.article, data.category);
    });
    this.isShowWorldPictureEditor = false;

    this.style = {
      'background-image': `url(${this.world.picture.path})`,
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-attachment': 'fixed'
    };

    this.accessToChange = (this.user && this.user.id === this.world.author);
  };

  this.$onDestroy = () => {
    this.showArticleListner();
  };

  this.createWorld = () => {
    ConstructService.createWorld(this.name).then((res) => {
      this.isCreated = true;
      this.world = res.data;
      this.accessToChange = true;
    });
  };

  this.showCategoryInput = () => this.isShowCategoryInput = true;

  this.addCategory = (category) => {
    ConstructService.createCategory({
      name: category.name,
      world: this.world.id,
      parent_id: 0
    }).then(res => {
      this.world.categories = res.data;
    });
  };

  this.showArticle = (article, category) => {
    if (!article) {
      this.articleActionMode = 'create';
    } else {
      this.articleActionMode = 'edit';
    }
    this.selectedArticle = article;
    this.selectedCategory = category;
  };

  this.showWorldPictureEditor = () => {
    if (!(this.world && this.world.id)) return;
    ModalService.addPicture({instance_type : 'world', instance_id : this.world.id}).result.then(picture => {
      this.world.picture = picture.path;
      ConstructService.updateWorld(this.world).then(res => {
        this.world = res.data;
        this.style['background-image'] = `url(${this.world.picture})`;
      });
    });
  };
}

WorldManagerController.$inject = ['ConstructService', 'UserService', 'ModalService', '$state', '$rootScope'];

export default worldManager;
