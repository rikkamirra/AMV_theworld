function CreateArticleController(world, category) {
  this.world = world;
  this.category = category;
}

CreateArticleController.$inject = ['world', 'category'];

export default CreateArticleController;
